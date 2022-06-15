import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAuth } from '../../../contexts/AuthContext';
import { PARTICIPANTS } from '../../../firebase/const';
import {
    changeEmail,
    changePassword,
    getUser,
    subscribeNewsletter,
} from '../../../firebase/user';
import useSendEmail from '../../../hooks/useSendEmail';
import useTrans from '../../../hooks/useTrans';
import useUser from '../../../hooks/useUser';
import {
    SUBSCRIBE as SUBSCRIBE_TEMPLATE,
    UNSUBSCRIBE as UNSUBSCRIBE_TEMPLATE,
} from '../../../templates/email';
import {
    PARTICIPANT_LOGIN,
    PASSWORD_REGEX,
    SECONDARY,
    SUBSCRIBE, SUCCESS,
} from '../../const';
import Button from '../../modules/Button';
import Heading from '../../modules/Heading';
import Input from '../../modules/Input';
import styles from './Settings.module.scss';

const Settings = () => {
    const trans = useTrans();
    const { currentUser } = useAuth();
    const router = useRouter();
    const { sendEmail } = useSendEmail();
    const { logOut } = useUser();
    const {
        uid = '',
        email: userEmail = '',
        displayName = '',
        reloadUserInfo = null,
    } = currentUser || {};
    const { passwordHash: hasPasswordHash = '' } = reloadUserInfo || {};
    const [editEmail, setEditEmail] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSubscribe, setIsSubscribe] = useState(false);

    useEffect(() => {
        if (loading && uid) {
            getUser(uid, PARTICIPANTS).then(({ subscribe = false } = {}) => {
                setIsSubscribe(subscribe);
            });
            setLoading(false);
        }
    }, [uid, currentUser, router, loading]);

    const {
        updateEmail,
        updatePassword,
        cancel,
        change,
        subscribeLabel,
        verifyNewEmail,
        errors: {
            invalidEmail,
            invalidPassword,
            required,
            notMatchPassword,
            duplicatePassword,
        },
    } = trans;
    const {
        emailLabel,
        currentPasswordLabel,
        passwordLabel,
        confirmPasswordLabel,
        saved,
    } = trans.participant.settings;
    const EMAIL = 'email';
    const PASSWORD = 'password';
    const CURRENT_PASSWORD = 'currentPassword';
    const CONFIRM_PASSWORD = 'confirmPassword';

    // Email form
    const {
        register: emailRegister,
        handleSubmit: emailSubmit,
        formState: { errors: emailErrors },
    } = useForm({ mode: 'onChange' });
    const email = emailRegister(EMAIL, {
        required: required,
        pattern: {
            value: /\S+@\S+\.\S+/,
            message: invalidEmail,
        },
    });
    const emailCurrentPassword = emailRegister(CURRENT_PASSWORD, {
        required: required,
        pattern: {
            value: PASSWORD_REGEX,
            message: invalidPassword,
        },
    });

    // Password form register
    const {
        register: passwordRegister,
        handleSubmit: passwordSubmit,
        getValues,
        formState: { errors: passwordErrors },
    } = useForm({ mode: 'onChange' });
    let currentPassword;
    if (hasPasswordHash) {
        currentPassword = passwordRegister(CURRENT_PASSWORD, {
            required: required,
            pattern: {
                value: PASSWORD_REGEX,
                message: invalidPassword,
            },
        });
    }
    const password = passwordRegister(PASSWORD, {
        required: required,
        validate: (value) =>
            value !== getValues('currentPassword') || duplicatePassword,
        pattern: {
            value: PASSWORD_REGEX,
            message: invalidPassword,
        },
    });
    const confirmPassword = passwordRegister(CONFIRM_PASSWORD, {
        required: required,
        validate: (value) =>
            value === getValues('password') || notMatchPassword,
    });

    // Subscribe register
    const { register: subscribeRegister, handleSubmit: subscribeSubmit } =
        useForm();
    const subscribe = subscribeRegister(SUBSCRIBE);

    // Handlers
    const onUpdate = async (data) => {
        const { email = '', password = '', currentPassword = '' } = data;
        if (!hasPasswordHash && password) {
            await changePassword(currentUser, {
                password: '',
                newPassword: password,
                message: {
                    success: saved,
                },
            });
            return;
        }

        if (!currentPassword) {
            return;
        }
        if (email) {
            const updateData = {
                password: currentPassword,
                email,
                role: PARTICIPANTS,
                message: {
                    success: verifyNewEmail,
                },
            };
            const result = await changeEmail(currentUser, updateData);
            if (result.code === SUCCESS) {
                logOut({target: PARTICIPANT_LOGIN});
            }
        }
        if (password) {
            await changePassword(currentUser, {
                password: currentPassword,
                newPassword: password,
                message: {
                    success: saved,
                },
            });
        }
    };

    const onSubscribe = async ({ subscribe }) => {
        const response = await subscribeNewsletter(uid, PARTICIPANTS, {
            subscribe,
        });
        if (!response || !response.error) {
            await sendEmail({
                mailTo: userEmail,
                subject: 'Mojarib: Newsletter status update',
                successMessage: 'A confirmation email has been sent',
                templateName:
                    (subscribe && SUBSCRIBE_TEMPLATE) || UNSUBSCRIBE_TEMPLATE,
                props: { name: displayName },
            });
        }
    };

    return (
        <>
            {hasPasswordHash && (
                <div className={styles.email}>
                    <Heading
                        type='h2'
                        elementProps={{ className: styles.heading }}
                    >
                        Edit email
                    </Heading>
                    {(editEmail && (
                        <>
                            <Input
                                label={emailLabel}
                                value={{ ...email }}
                                customClass={styles.input}
                                isRequired={true}
                            />
                            <p className={styles.error}>
                                {emailErrors.email?.message}
                            </p>
                            <Input
                                label={currentPasswordLabel}
                                isRequired={true}
                                value={{ ...emailCurrentPassword }}
                                type='password'
                                customClass={styles.input}
                            />
                            <p className={styles.error}>
                                {emailErrors.currentPassword?.message}
                            </p>
                            <div className={styles.actions}>
                                <Button
                                    type={SECONDARY}
                                    onClickCallback={() => setEditEmail(false)}
                                >
                                    {cancel}
                                </Button>
                                <Button
                                    onClickCallback={emailSubmit(onUpdate)}
                                    customClass={clsx(
                                        Object.keys(emailErrors).length &&
                                            styles.blur,
                                        styles.update
                                    )}
                                >
                                    {updateEmail}
                                </Button>
                            </div>
                        </>
                    )) || (
                        <>
                            <p
                                className={styles['current-email']}
                            >{`Current email: ${userEmail}`}</p>
                            <Button
                                type={SECONDARY}
                                onClickCallback={() => setEditEmail(true)}
                                customClass={styles.change}
                            >
                                {change}
                            </Button>
                        </>
                    )}
                </div>
            )}

            <div className={styles.password}>
                <Heading type='h2' elementProps={{ className: styles.heading }}>
                    Edit password
                </Heading>
                {hasPasswordHash && (
                    <>
                        <div className={styles.row}>
                            <Input
                                label={currentPasswordLabel}
                                isRequired={true}
                                value={{ ...currentPassword }}
                                type='password'
                                customClass={styles.input}
                            />
                            <p className={styles.notice}>
                                We need your current password to confirm changes
                            </p>
                        </div>
                        <p className={styles.error}>
                            {passwordErrors.currentPassword?.message}
                        </p>
                    </>
                )}
                <div className={styles.row}>
                    <Input
                        label={passwordLabel}
                        isRequired={true}
                        value={{ ...password }}
                        type='password'
                        customClass={styles.input}
                    />
                </div>
                <p className={styles.error}>
                    {passwordErrors.password?.message}
                </p>
                <div className={styles.row}>
                    <Input
                        label={confirmPasswordLabel}
                        isRequired={true}
                        value={{ ...confirmPassword }}
                        type='password'
                        customClass={styles.input}
                    />
                    <p className={styles.notice}>
                        Confirm password needs to match new password.
                    </p>
                </div>
                <p className={styles.error}>
                    {passwordErrors.confirmPassword?.message}
                </p>
                <div className={styles.actions}>
                    <Button
                        onClickCallback={passwordSubmit(onUpdate)}
                        customClass={clsx(
                            Object.keys(passwordErrors).length && styles.blur,
                            styles.update
                        )}
                    >
                        {updatePassword}
                    </Button>
                </div>
            </div>

            <div className={styles.subscribe}>
                <Heading type='h2' elementProps={{ className: styles.heading }}>
                    Subscribe to our newsletter
                </Heading>
                <div className={styles.control}>
                    <input
                        id={SUBSCRIBE}
                        {...subscribe}
                        checked={isSubscribe}
                        type='checkbox'
                        className={styles.checkbox}
                        onChange={() => setIsSubscribe(!isSubscribe)}
                    />
                    <label htmlFor={SUBSCRIBE} className={styles.label}>
                        {subscribeLabel}
                    </label>
                </div>
                <Button onClickCallback={subscribeSubmit(onSubscribe)}>
                    Subscribe
                </Button>
            </div>
        </>
    );
};

export default Settings;
