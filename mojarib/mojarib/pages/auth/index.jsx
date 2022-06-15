import { yupResolver } from '@hookform/resolvers/yup';
import useTrans from 'hooks/useTrans';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
    PASSWORD_REGEX,
    UPDATE_MODE,
    VERIFY_MODE,
} from '../../components/const';
import {
    applyActionCodeByFirebase,
    resetPasswordByFirebase,
} from '../../firebase/customer';
import { extractOobCode, setUser } from '../../firebase/user';
import useSendEmail from '../../hooks/useSendEmail';
import { WELCOME } from '../../templates/email';
import { reformatEmail } from '../../utils/email';
import { extractUrl } from '../../utils/url';
import styles from './Auth.module.scss';

const CustomerAuth = () => {
    const trans = useTrans();
    const router = useRouter();
    const { mode = '', oobCode = '', continueUrl = '' } = router.query;
    const [verifyEmailMessage, setVerifyEmailMessage] = useState('');
    const { sendEmail } = useSendEmail();
    const schema = yup.object().shape({
        password: yup
            .string()
            .trim()
            .required(`${trans.register.form.errorMessage.passwordRequired}`)
            .matches(
                PASSWORD_REGEX,
                `${trans.register.form.errorMessage.passwordValid}`
            ),
        confirmPassword: yup
            .string()
            .trim()
            .required(
                `${trans.register.form.errorMessage.confirmPasswordRequired}`
            )
            .oneOf(
                [yup.ref('password')],
                `${trans.register.form.errorMessage.confirmPasswordValid}`
            ),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmitPassword = (data) => {
        resetPasswordByFirebase(oobCode, data.password).then((res) =>
            alert(res.message)
        );
    };

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const actionCodeInfo = await extractOobCode(oobCode);
                await applyActionCodeByFirebase(oobCode);
                const {
                    uid,
                    role,
                    type,
                    email: updatedEmail,
                } = extractUrl(continueUrl, ['uid', 'role', 'type', 'email']);
                if (!(uid && role)) {
                    setVerifyEmailMessage('The link is invalid');
                }
                const isNew = !type;
                const email = actionCodeInfo.data.email;
                if (isNew && email) {
                    await sendEmail({
                        mailTo: email,
                        subject: 'Welcome to Mojarib',
                        templateName: WELCOME,
                        props: { name: 'Test' },
                    });
                }
                const isUpdatedMode = type === UPDATE_MODE;
                const formattedEmail = reformatEmail(updatedEmail);
                if (isUpdatedMode && formattedEmail) {
                    await setUser(uid, { formattedEmail }, role);
                }
                setVerifyEmailMessage('Account verification successful');
            } catch (e) {
                console.log(e?.message);
                setVerifyEmailMessage('The link is invalid');
            }
        };

        if (mode === VERIFY_MODE && !verifyEmailMessage) {
            verifyEmail();
        }
    });

    return mode === VERIFY_MODE ? (
        <h1 className={styles.verify_email}>
            {verifyEmailMessage || 'Verifying...'}
        </h1>
    ) : (
        <div className={styles.wrapper}>
            <div className={styles.main_content}>
                <div className={styles.top}>
                    <div className={styles.heading}>Reset password</div>
                </div>

                <div className={styles.double_field}>
                    <div className={styles.single_field}>
                        <label>New password</label>
                        <input {...register('password')} type='password' />
                        {errors.password && (
                            <span className={styles.error}>
                                {errors.password?.message}
                            </span>
                        )}
                    </div>

                    <div className={styles.single_field}>
                        <label>Confirm new password</label>
                        <input
                            {...register('confirmPassword')}
                            type='password'
                        />
                        {errors.confirmPassword && (
                            <span className={styles.error}>
                                {errors.confirmPassword?.message}
                            </span>
                        )}
                    </div>
                </div>
                <div className={styles.submit_password}>
                    <button
                        type='submit'
                        onClick={handleSubmit(onSubmitPassword)}
                    >
                        Submit
                    </button>
                </div>
            </div>
            <div className={styles.footer}>Footer</div>
        </div>
    );
};

export default CustomerAuth;
