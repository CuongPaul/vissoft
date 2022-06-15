import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { LeftMenu } from '../../../../components';
import { useAuth } from '../../../../contexts/AuthContext';
import {
    changeEmailByFirebase,
    changePasswordByFirebase,
    getCustomerProfileByFirebase,
    setCustomerProfileByFirebase,
} from '../../../../firebase/customer';
import styles from './AccountSetting.module.scss';

const AccountSetting = () => {
    const { currentUser } = useAuth();
    const schemaEmail = yup.object().shape({
        newEmail: yup
            .string()
            .required('This is a required field.')
            .email(
                'Please enter a valid email address (Ex: email@domain.com).'
            ),
        password: yup.string().required('This is a required field.'),
    });
    const schemaPassword = yup.object().shape({
        currentPassword: yup.string().required('This is a required field.'),
        newPassword: yup
            .string()
            .required('This is a required field.')
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])\S{8,}$/,
                'Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.'
            ),
        confirmPassword: yup
            .string()
            .required('This is a required field.')
            .oneOf(
                [yup.ref('newPassword')],
                'Please enter the same value again.'
            ),
    });
    const {
        register: registerEmail,
        handleSubmit: handleSubmitEmail,
        formState: { errors: errorsEmail },
    } = useForm({ resolver: yupResolver(schemaEmail) });
    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: errorsPassword },
    } = useForm({ resolver: yupResolver(schemaPassword) });

    const handleClickSaveEmail = async (data) => {
        changeEmailByFirebase(data.newEmail, data.password)
            .then((res) => alert(res.message))
            .catch((err) => console.error(err));
    };
    const handleClickSavePassword = async (data) => {
        changePasswordByFirebase(data.currentPassword, data.newPassword)
            .then((res) => alert(res.message))
            .catch((err) => console.error(err));
    };
    const [customerProfile, setCustomerProfile] = useState();
    const [customerProfileID, setCustomerProfileID] = useState();
    const [changeEmail, setChangeEmail] = useState(false);
    const [isSubscribe, setIsSubscribe] = useState(false);
    const [isSubscribeButton, setIsSubscribeButton] = useState(true);

    const handleClickChangeEmail = () => {
        setChangeEmail(!changeEmail);
    };
    const handleClickSubscribe = useCallback(async () => {
        console.log('isSub', isSubscribe);
        console.log('isSubBtn', isSubscribeButton);

        if (!isSubscribe) {
            if (isSubscribeButton) {
                await setCustomerProfileByFirebase(customerProfileID, {
                    ...customerProfile,
                    subscribeNewLetter: !isSubscribe,
                })
                    .then(() => {
                        alert('You are subscribed to our newsletter.');
                        setIsSubscribe(!isSubscribe);
                    })
                    .catch((err) => console.error(err));
            } else {
                alert('Confirm checkbox to subscribe');
            }
        } else {
            await setCustomerProfileByFirebase(customerProfileID, {
                ...customerProfile,
                subscribeNewLetter: !isSubscribe,
            })
                .then(() => {
                    alert('You are not subscribing to our newsletter.');
                    setIsSubscribe(!isSubscribe);
                    setIsSubscribeButton(false);
                })
                .catch((err) => console.error(err));
        }
    }, [isSubscribe, isSubscribeButton]);

    useEffect(() => {
        const getCustomerProfile = async () => {
            const res = await getCustomerProfileByFirebase();

            if (res.data) {
                setCustomerProfile(res.data);
                setCustomerProfileID(res.id);
                setIsSubscribe(res.data.subscribeNewLetter);
                setIsSubscribeButton(res.data.subscribeNewLetter);
            }
        };

        getCustomerProfile();
    }, [currentUser]);

    return !currentUser || !currentUser.emailVerified ? (
        <h1>Loading ...</h1>
    ) : (
        <div className={styles.wrapper}>
            <div className={styles.heading}>
                <h1>Account Settings</h1>
            </div>
            <div className={styles.bottom_heading}>
                <div className={styles.left_menu}>
                    <LeftMenu itemSelected={'settings'} />
                </div>
                <div className={styles.content}>
                    <div className={styles.form}>
                        <div className={styles.title}>
                            <p>Edit email</p>
                        </div>
                        {changeEmail ? (
                            <div>
                                <div className={styles.field}>
                                    <label className={styles.required}>
                                        New email address
                                    </label>
                                    <div className={styles.input}>
                                        <input {...registerEmail('newEmail')} />
                                        {errorsEmail.newEmail && (
                                            <span className={styles.error}>
                                                {errorsEmail.newEmail?.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.required}>
                                        Password
                                    </label>
                                    <div className={styles.input}>
                                        <input {...registerEmail('password')} />
                                        {errorsEmail.password && (
                                            <span className={styles.error}>
                                                {errorsEmail.password?.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button onClick={handleClickChangeEmail}>
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmitEmail(
                                        handleClickSaveEmail
                                    )}
                                >
                                    Update
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p>Current email: {currentUser.email}</p>
                                <button onClick={handleClickChangeEmail}>
                                    Change
                                </button>
                            </div>
                        )}
                    </div>
                    <div className={styles.form}>
                        <div className={styles.title}>
                            <p>Edit password</p>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.required}>
                                Current password
                            </label>
                            <div className={styles.input}>
                                <input
                                    {...registerPassword('currentPassword')}
                                />
                                {errorsPassword.currentPassword && (
                                    <span className={styles.error}>
                                        {
                                            errorsPassword.currentPassword
                                                ?.message
                                        }
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.required}>
                                New password
                            </label>
                            <div className={styles.input}>
                                <input {...registerPassword('newPassword')} />
                                {errorsPassword.newPassword && (
                                    <span className={styles.error}>
                                        {errorsPassword.newPassword?.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.required}>
                                Confirm password
                            </label>
                            <div className={styles.input}>
                                <input
                                    {...registerPassword('confirmPassword')}
                                />
                                {errorsPassword.confirmPassword && (
                                    <span className={styles.error}>
                                        {
                                            errorsPassword.confirmPassword
                                                ?.message
                                        }
                                    </span>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={handleSubmitPassword(
                                handleClickSavePassword
                            )}
                        >
                            Update
                        </button>
                    </div>
                    <div className={styles.subscribe}>
                        <h3>Subscribe to our newsletter</h3>
                        {!isSubscribe ? (
                            <div>
                                <input
                                    type={'checkbox'}
                                    className={styles.checkbox}
                                    checked={isSubscribeButton}
                                    onChange={(event) => {
                                        setIsSubscribeButton(
                                            event.target.checked
                                        );
                                    }}
                                />
                                <label>
                                    Yes, share with me latest reports, news,
                                    exclusive offers
                                </label>
                            </div>
                        ) : (
                            <p>You are subscribed to our newsletter.</p>
                        )}
                        <button onClick={handleClickSubscribe}>
                            {isSubscribe ? 'Unsubscribe' : 'Subscribe'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSetting;
