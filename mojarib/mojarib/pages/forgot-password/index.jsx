import * as yup from 'yup';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useTrans from '../../hooks/useTrans';
import styles from './ForgotPassword.module.scss';
import { customer_forgot_password_background } from '../../public/images';
import { sendEmailResetPasswordByFirebase } from '../../firebase/customer';

const ForgotPassword = () => {
    const trans = useTrans();
    const router = useRouter();
    const schema = yup.object().shape({
        email: yup
            .string()
            .email(`${trans.register.form.errorMessage.emailValid}`)
            .required(`${trans.register.form.errorMessage.emailRequired}`),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmitEmail = (data) => {
        sendEmailResetPasswordByFirebase(data.email)
            .then(() => router.push('/customer/login'))
            .catch(() => alert(`If there is an account associated with ${data.email} you will receive an email with a link to reset your password.`));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.main_content}>
                <div className={styles.heading}>
                    {trans.forgot_password.heading}
                </div>
                <form className={styles.form}>
                    <div className={styles.single_field}>
                        <label>{trans.forgot_password.label_input}</label>
                        <input {...register('email')} />
                        {errors.email && (
                            <span className={styles.error}>
                                {errors.email?.message}
                            </span>
                        )}
                    </div>

                    <div className={styles.submit_email}>
                        <button
                            type='submit'
                            onClick={handleSubmit(onSubmitEmail)}
                        >
                            {trans.forgot_password.submit_button}
                        </button>
                    </div>
                </form>
            </div>
            <Image
                src={customer_forgot_password_background}
                alt='Customer forgot password'
            />
        </div>
    );
};

export default ForgotPassword;
