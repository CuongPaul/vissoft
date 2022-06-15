import { yupResolver } from '@hookform/resolvers/yup';
import { Language } from 'components';
import { AuthErrorCodes } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import SocialAuth from '../../../components/SocialAuth';
import {
    FORGOT_PASSWORD,
    PARTICIPANT_LOGIN,
    PASSWORD_REGEX,
} from '../../../components/const';
import Modal from '../../../components/modules/Modal';
import Select from '../../../components/modules/Select';
import { PARTICIPANTS } from '../../../firebase/const';
import { createParticipantByFirebase } from '../../../firebase/participant/create';
import useCmsContent from '../../../hooks/useCmsContent';
import useParticipantSocialAuth from '../../../hooks/useParticipantSocialAuth';
import { useRecaptchaConfig } from '../../../hooks/useRecaptchaConfig';
import useTrans, { useFormatMessage } from '../../../hooks/useTrans';
import useUser from '../../../hooks/useUser';
import styles from './Register.module.scss';

const ParticipantRegister = () => {
    const trans = useTrans();
    const formatMessage = useFormatMessage();
    const router = useRouter();
    const recaptchaRef = useRef();
    const { type, client_key: clientKey } = useRecaptchaConfig();
    const { socialAuthSuccess, socialAuthFail } = useParticipantSocialAuth();
    const { locale } = router;
    const { logOut } = useUser();
    const [temp, setTemp] = useState(''); // @todo: For testing purposes only
    const sourceOptions = [
        { value: '', label: 'Please select one' },
        { value: 'friend', label: 'Friend' },
        { value: 'customer', label: 'Customer' },
        { value: 'search_engine', label: 'Search Engine' },
        { value: 'twitter', label: 'Twitter' },
        { value: 'other', label: 'Other' },
    ];
    const { termsAndConditions, privacyPolicy } = useCmsContent(PARTICIPANTS);

    const { EMAIL_EXISTS } = AuthErrorCodes;
    const {
        invalidRecaptcha,
        errors: { required },
    } = trans;
    const {
        signUp,
        signIn,
        confirmAge,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        success,
        accountExist,
    } = trans.register;
    const {
        firstName: firstNameRequired,
        lastName: lastnameRequired,
        emailValid: emailInvalid,
        emailRequired,
        passwordRequired,
        passwordValid: passwordInvalid,
        confirmPasswordRequired,
        confirmPasswordValid: confirmPasswordInvalid,
        confirmAge: confirmAgeRequired,
        confirmTerm: confirmTermRequired,
    } = trans.register.form.errorMessage;
    const {
        heading,
        content: {
            top: topContent,
            bottom: bottomContent,
            center: { first, second, third },
        },
    } = trans.register.participant;
    const schema = yup.object().shape({
        firstName: yup.string().required(firstNameRequired),
        lastName: yup.string().required(lastnameRequired),
        email: yup.string().email(emailInvalid).required(emailRequired),
        password: yup
            .string()
            .required(passwordRequired)
            .matches(PASSWORD_REGEX, passwordInvalid),
        confirmPassword: yup
            .string()
            .required(confirmPasswordRequired)
            .oneOf([yup.ref('password')], confirmPasswordInvalid),
        source: yup.string().required(required),
        confirmAge: yup.boolean().oneOf([true], confirmAgeRequired),
        confirmTerm: yup.boolean().oneOf([true], confirmTermRequired),
    });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema), mode: 'all' });

    useEffect(() => {
        reset();
    }, [reset]);

    const onRegisterSubmit = async (data) => {
        const token = await recaptchaRef.current.executeAsync();
        if (token) {
            try {
                await createParticipantByFirebase(data);
                alert(success);
                logOut({ target: PARTICIPANT_LOGIN });
            } catch ({ code, message }) {
                let errorMessage = message;
                if (code === EMAIL_EXISTS) {
                    const forgotPasswordLink = `<a href=${FORGOT_PASSWORD}>click here</a>`;
                    errorMessage = formatMessage(accountExist, {
                        'click here': forgotPasswordLink,
                    });
                    setTemp(errorMessage);
                } else {
                    alert(errorMessage);
                }
                recaptchaRef.current.reset();
            }
        } else {
            alert(invalidRecaptcha);
        }
    };

    const redirectToLogin = () => {
        router.push(PARTICIPANT_LOGIN);
    };

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.main_content}
                dir={(locale === 'ar' && 'rtl') || 'ltr'}
            >
                <div className={styles.top}>
                    <div className={styles.heading}>
                        <h2>{heading}</h2>
                        {temp && (
                            <p>
                                Error:{' '}
                                <span style={{ color: 'red' }}>{temp}</span>
                            </p>
                        )}
                    </div>
                    <div className={styles.language}>
                        <Language lang={locale} />
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <ul>
                            <p>{topContent}</p>
                        </ul>
                        <ul>
                            <li>{first}</li>
                            <li>{second}</li>
                            <li>{third}</li>
                        </ul>
                        <ul>
                            <p>{bottomContent}</p>
                        </ul>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.double_field}>
                            <div className={styles.single_field}>
                                <label className={styles.required}>
                                    {firstName}
                                </label>
                                <input {...register('firstName')} />
                                {errors.firstName && (
                                    <span className={styles.error}>
                                        {errors.firstName?.message}
                                    </span>
                                )}
                            </div>

                            <div className={styles.single_field}>
                                <label className={styles.required}>
                                    {lastName}
                                </label>
                                <input {...register('lastName')} />
                                {errors.lastName && (
                                    <span className={styles.error}>
                                        {errors.lastName?.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className={styles.single_field}>
                            <label className={styles.required}>{email}</label>
                            <input {...register('email')} />
                            {errors.email && (
                                <span className={styles.error}>
                                    {errors.email?.message}
                                </span>
                            )}
                        </div>

                        <div className={styles.double_field}>
                            <div className={styles.single_field}>
                                <label className={styles.required}>
                                    {password}
                                </label>
                                <input
                                    {...register('password')}
                                    type='password'
                                />
                                {errors.password && (
                                    <span className={styles.error}>
                                        {errors.password?.message}
                                    </span>
                                )}
                            </div>

                            <div className={styles.single_field}>
                                <label className={styles.required}>
                                    {confirmPassword}
                                </label>
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

                        <div className={styles.double_field}>
                            <div className={styles.single_field}>
                                <Select
                                    label='Where you heard about us?'
                                    name='source'
                                    options={sourceOptions}
                                    customClass={styles.source}
                                    value={register('source')}
                                    isRequired
                                />
                                {errors.source && (
                                    <p className={styles.error}>
                                        {errors.source?.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className={styles.checkbox_field}>
                            <div className={styles.checkboxArea}>
                                <input
                                    {...register('confirmAge')}
                                    type='checkbox'
                                />
                                <label className={styles.required}>
                                    {confirmAge}
                                </label>
                            </div>
                            {errors.confirmAge && (
                                <span className={styles.error}>
                                    {errors.confirmAge?.message}
                                </span>
                            )}
                        </div>

                        <div className={styles.checkbox_field}>
                            <div className={styles.checkboxArea}>
                                <input
                                    {...register('confirmTerm')}
                                    type='checkbox'
                                />
                                <label className={styles.required}>
                                    I agree of the{' '}
                                    {
                                        <Modal
                                            isManual={{
                                                openLabel: 'terms & conditions',
                                            }}
                                        >
                                            {termsAndConditions}
                                        </Modal>
                                    }{' '}
                                    and{' '}
                                    {
                                        <Modal
                                            isManual={{
                                                openLabel: 'privacy policy',
                                            }}
                                        >
                                            {privacyPolicy}
                                        </Modal>
                                    }
                                </label>
                            </div>
                            {errors.confirmTerm && (
                                <span className={styles.error}>
                                    {errors.confirmTerm?.message}
                                </span>
                            )}
                        </div>

                        <div className={styles.sign_up}>
                            <button
                                type='submit'
                                onClick={handleSubmit(onRegisterSubmit)}
                            >
                                {signUp}
                            </button>
                        </div>

                        <SocialAuth
                            onSuccess={socialAuthSuccess}
                            onFail={socialAuthFail}
                        />

                        <div className={styles.sign_in}>
                            <button onClick={redirectToLogin}>{signIn}</button>
                        </div>

                        <ReCAPTCHA
                            size={type}
                            ref={recaptchaRef}
                            sitekey={clientKey}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParticipantRegister;
