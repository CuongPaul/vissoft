import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { CUSTOMER_PROFILE } from '../../../components/const';
import {
    signInByFirebase,
    signOutByFirebase,
} from '../../../firebase/customer';
import useTrans from '../../../hooks/useTrans';
import useUser from '../../../hooks/useUser';
import { customer_login_background } from '../../../public/images';
import styles from './Login.module.scss';

const CustomerLogin = () => {
    const trans = useTrans();
    const router = useRouter();
    const recaptchaRef = useRef();
    const { isLogIn } = useUser();
    const schema = yup.object().shape({
        email: yup
            .string()
            .email(`${trans.login.errorMessage.emailValid}`)
            .required(`${trans.login.errorMessage.emailRequired}`),
        password: yup
            .string()
            .required(`${trans.login.errorMessage.passwordRequired}`),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    useEffect(() => {
        if (isLogIn) {
            router.push(CUSTOMER_PROFILE);
        } else {
            signOutByFirebase().catch((error) => {
                console.log(error.message);
            });
        }
    }, [isLogIn, router]);

    // const resetRecaptcha = _.debounce(() => {
    //     recaptchaRef.current.reset();
    // }, 1000);

    const onLoginSubmit = async (data) => {
        try {
            await recaptchaRef.current.executeAsync();

            await signInByFirebase(data.email, data.password).then((res) => {
                if (res.status == 'fail') {
                    alert(res.message);
                    recaptchaRef.current.reset();
                }
            });
        } catch (error) {
            alert(
                'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.'
            );
        }
    };

    const handleRedirectToForgotPassword = () => {
        router.push('/forgot-password');
    };
    const handleRedirectToCreateAccount = () => {
        router.push('/customer/register');
    };
    const handleRedirectToParticipantLogin = () => {
        router.push('/participant/login');
    };
    const handleRedirectToParticipantCreate = () => {
        router.push('/participant/register');
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.main_content}>
                <Image src={customer_login_background} alt='Customer login' />
                <form className={styles.form}>
                    <div className={styles.heading}>Customer login</div>

                    <div className={styles.log_in_form}>
                        <div className={styles.single_field}>
                            <label>{trans.login.email}</label>
                            <input {...register('email')} />
                            {errors.email && (
                                <span className={styles.error}>
                                    {errors.email?.message}
                                </span>
                            )}
                        </div>

                        <div className={styles.single_field}>
                            <label>{trans.login.password}</label>
                            <input type='password' {...register('password')} />
                            {errors.password && (
                                <span className={styles.error}>
                                    {errors.password?.message}
                                </span>
                            )}
                        </div>

                        <div className={styles.link_to_page}>
                            <a onClick={handleRedirectToForgotPassword}>
                                {trans.login.forgotPassword}
                            </a>
                            <p>
                                Test your products.
                                <a onClick={handleRedirectToCreateAccount}>
                                    {trans.login.createAccount}
                                </a>
                            </p>
                        </div>

                        <div className={styles.login}>
                            <button
                                type='submit'
                                onClick={handleSubmit(onLoginSubmit)}
                            >
                                {trans.login.loginButton}
                            </button>
                        </div>

                        <div className={styles.participant}>
                            <button onClick={handleRedirectToParticipantLogin}>
                                {trans.login.participantLogin}
                            </button>
                            <button onClick={handleRedirectToParticipantCreate}>
                                {trans.login.createParticipant}
                            </button>
                        </div>
                    </div>
                </form>

                <ReCAPTCHA
                    size='invisible'
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                />
            </div>
        </div>
    );
};

export default CustomerLogin;
