import * as yup from 'yup';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './Register.module.scss';
import useTrans from '../../../hooks/useTrans';
import { customer_register_background } from '../../../public/images';
import {
    signOutByFirebase,
    createUserByFirebase,
} from '../../../firebase/customer';
import {
    CUSTOMER_DASHBOARD,
    CUSTOMER_LOGIN,
    PASSWORD_REGEX,
} from '../../../components/const';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRecaptchaConfig } from '../../../hooks/useRecaptchaConfig';
import Modal from '../../../components/modules/Modal';
import useCmsContent from '../../../hooks/useCmsContent';

const CustomerRegister = () => {
    const trans = useTrans();
    const router = useRouter();
    const recaptchaRef = useRef();
    const { type, client_key: clientKey } = useRecaptchaConfig();
    const { currentUser } = useAuth();
    const [isReady, setIsReady] = useState(false);
    const { termsAndConditions, privacyPolicy } = useCmsContent();
    const schema = yup.object().shape({
        organizationName: yup.string(),
        firstName: yup
            .string()
            .required(`${trans.register.form.errorMessage.firstName}`),
        lastName: yup
            .string()
            .required(`${trans.register.form.errorMessage.lastName}`),
        email: yup
            .string()
            .email(`${trans.register.form.errorMessage.emailValid}`)
            .required(`${trans.register.form.errorMessage.emailRequired}`),
        password: yup
            .string()
            .required(`${trans.register.form.errorMessage.passwordRequired}`)
            .matches(
                PASSWORD_REGEX,
                `${trans.register.form.errorMessage.passwordValid}`
            ),
        confirmPassword: yup
            .string()
            .required(
                `${trans.register.form.errorMessage.confirmPasswordRequired}`
            )
            .oneOf(
                [yup.ref('password')],
                `${trans.register.form.errorMessage.confirmPasswordValid}`
            ),
        confirmAge: yup
            .boolean()
            .oneOf([true], `${trans.register.form.errorMessage.confirmAge}`),
        confirmTerm: yup
            .boolean()
            .oneOf([true], `${trans.register.form.errorMessage.confirmTerm}`),
    });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema), mode: 'all' });

    useEffect(() => {
        if (currentUser && isReady) {
            const target = currentUser.emailVerified
                ? CUSTOMER_DASHBOARD
                : CUSTOMER_LOGIN;
            router.push(target);
        }
        reset();
    }, [currentUser, isReady, reset, router]);

    const onRegisterSubmit = async (data) => {
        const token = await recaptchaRef.current.executeAsync();
        if (token) {
            const res = await createUserByFirebase(
                data.email,
                data.password,
                data.lastName,
                data.firstName,
                data.organizationName
            );

            if (res.status === 'success') {
                alert(trans.register.success);
                signOutByFirebase();
                setIsReady(true);
            } else {
                alert(trans.register.accountExist);
            }
        } else {
            alert(trans.invalidRecaptcha);
        }

        recaptchaRef.current.reset();
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <Image
                    src={customer_register_background}
                    alt="Customer register"
                />
                <div className={styles.content}>
                    <ul className={styles.first}>
                        <li>{trans.register.left.line_1}</li>
                        <li>{trans.register.left.line_2}</li>
                        <li>{trans.register.left.line_3}</li>
                        <li>{trans.register.left.line_4}</li>
                        <li>{trans.register.left.line_5}</li>
                    </ul>
                    <ul className={styles.second}>
                        <li>{trans.register.left.line_6}</li>
                        <li>{trans.register.left.line_7}</li>
                    </ul>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.single_field}>
                    <label>{trans.register.form.organizationName}</label>
                    <input {...register('organizationName')} />
                    {errors.organizationName && (
                        <span className={styles.error}>
                            {errors.organizationName?.message}
                        </span>
                    )}
                </div>

                <div className={styles.double_field}>
                    <div className={styles.single_field}>
                        <label className={styles.required}>
                            {trans.register.form.firstName}
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
                            {trans.register.form.lastName}
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
                    <label className={styles.required}>
                        {trans.register.form.email}
                    </label>
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
                            {trans.register.form.password}
                        </label>
                        <input {...register('password')} type="password" />
                        {errors.password && (
                            <span className={styles.error}>
                                {errors.password?.message}
                            </span>
                        )}
                    </div>

                    <div className={styles.single_field}>
                        <label className={styles.required}>
                            {trans.register.form.confirmPassword}
                        </label>
                        <input
                            {...register('confirmPassword')}
                            type="password"
                        />
                        {errors.confirmPassword && (
                            <span className={styles.error}>
                                {errors.confirmPassword?.message}
                            </span>
                        )}
                    </div>
                </div>

                <div className={styles.checkbox_field}>
                    <div className={styles.checkboxArea}>
                        <input {...register('confirmAge')} type="checkbox" />
                        <label>{trans.register.form.confirmAge}</label>
                    </div>
                    {errors.confirmAge && (
                        <span className={styles.error}>
                            {errors.confirmAge?.message}
                        </span>
                    )}
                </div>

                <div className={styles.checkbox_field}>
                    <div className={styles.checkboxArea}>
                        <input {...register('confirmTerm')} type="checkbox" />
                        <label>
                            I agree of the{' '}
                            {
                                <Modal isManual={{openLabel: 'terms & conditions'}}>
                                    {termsAndConditions}
                                </Modal>
                            }{' '}
                            and{' '}
                            {
                                <Modal isManual={{openLabel: 'privacy policy'}}>
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
                        type="submit"
                        onClick={handleSubmit(onRegisterSubmit)}
                    >
                        Sign Up
                    </button>
                </div>

                <div className={styles.sign_in}>
                    <p>
                        Already have an account?
                        <Link href="/customer/login"> Sign in here</Link>
                    </p>
                </div>

                <ReCAPTCHA size={type} ref={recaptchaRef} sitekey={clientKey} />
            </div>
        </div>
    );
};

export default CustomerRegister;
