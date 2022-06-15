import { yupResolver } from '@hookform/resolvers/yup';
import { AuthErrorCodes } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ANALYST, CUSTOMER, PARTICIPANTS } from '../../firebase/const';
import { isAuthorized, signIn } from '../../firebase/user';
import { useRecaptchaConfig } from '../../hooks/useRecaptchaConfig';
import useTrans from '../../hooks/useTrans';
import useUser from '../../hooks/useUser';
import { ANALYST_LOGIN, CUSTOMER_LOGIN, PASSWORD_REGEX } from '../const';
import Button from '../modules/Button';
import ErrorMessage from '../modules/ErrorMessage';
import styles from './LoginForm.module.scss';

const LoginForm = ({
    children,
    onSuccessCallback = () => {},
    onFailCallback = () => {},
}) => {
    const trans = useTrans();
    const recaptchaRef = useRef();
    const router = useRouter();
    const { logOut } = useUser();
    const { USER_DELETED, INVALID_PASSWORD } = AuthErrorCodes;
    const { type, client_key: clientKey } = useRecaptchaConfig();
    const {
        login: { email, password, loginButton },
        errors: { invalidEmail, invalidPassword, required },
    } = trans;

    const schema = yup.object().shape({
        email: yup.string().email(invalidEmail).required(required),
        password: yup
            .string()
            .required(required)
            .matches(PASSWORD_REGEX, invalidPassword),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

    const getRole = () => {
        const { pathname } = router;
        let role = PARTICIPANTS;
        switch (pathname) {
            case ANALYST_LOGIN:
                role = ANALYST;
                break;
            case CUSTOMER_LOGIN:
                role = CUSTOMER;
                break;
            default:
                break;
        }
        return role;
    };

    const onLoginFail = (res) => {
        const { code } = res;
        let message = 'An undefined error occurs';
        switch (code) {
            case USER_DELETED:
                message = 'User is not found';
                break;
            case INVALID_PASSWORD:
                message =
                    'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.';
                break;
            default:
                if (res.message) message = res.message;
                break;
        }
        console.log(res);
        alert(message);
    };

    const onLoginSubmit = (data) => {
        recaptchaRef.current
            .executeAsync()
            .then(() => {
                const { email, password } = data;
                const role = getRole();
                signIn(email, password)
                    .then((userCredential) => {
                        isAuthorized(email, role).then((isAuth) => {
                            if (!isAuth) {
                                logOut();
                                return Promise.reject({
                                    code: 'unauthorized',
                                    message: 'You are not authorized.',
                                });
                            }
                            onSuccessCallback({ ...data, ...userCredential });
                        });
                    })
                    .catch((e) => {
                        const returnData = { ...e, ...data };
                        onLoginFail(returnData);
                        onFailCallback(returnData);
                    });
            })
            .catch((err) => {
                console.log('Captcha fail: ', err);
            })
            .finally(() => {
                recaptchaRef.current.reset();
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.field}>
                <label>{email}</label>
                <input {...register('email')} />
                <ErrorMessage name='email' error={errors} />
            </div>
            <div className={styles.field}>
                <label>{password}</label>
                <input {...register('password')} type='password' />
                <ErrorMessage name='password' error={errors} />
            </div>
            {children}
            <div className={styles.action}>
                <Button onClickCallback={handleSubmit(onLoginSubmit)}>
                    {loginButton}
                </Button>
            </div>

            <ReCAPTCHA size={type} ref={recaptchaRef} sitekey={clientKey} />
        </div>
    );
};

export default LoginForm;
