import clsx from 'clsx';
import {
    EmailAuthProvider,
    GoogleAuthProvider,
    OAuthProvider,
    getAdditionalUserInfo,
    linkWithCredential,
    signInWithPopup,
    unlink,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { FACEBOOK_PROVIDER, GOOGLE_PROVIDER } from '../../firebase/const';
import { getMessage } from '../../firebase/error';
import { auth } from '../../firebase/index';
import socialAuth from '../../firebase/socialAuth';
import useUser from '../../hooks/useUser';
import { isEmpty } from '../../utils/object';
import {
    ACCOUNTS_LINKED,
    PARTICIPANT_DASHBOARD,
    PARTICIPANT_REGISTER,
} from '../const';
import PasswordPrompt from './PasswordPrompt';
import styles from './SocialAuth.module.scss';

const SocialAuth = ({
    onSuccess = () => {
        alert('Success');
    },
    onFail = () => {
        alert('Login fail');
    },
    labels: { google = 'Google', facebook = 'Facebook' } = {},
}) => {
    // Password prompt controller
    const [isOpen, setIsOpen] = useState(0);
    const [loginData, setLoginData] = useState('');
    const router = useRouter();
    const isRegisterPage = router.pathname.includes(PARTICIPANT_REGISTER);
    const { logOut } = useUser();

    const handleLinkAccounts = useCallback(
        async ({ methods, pendingCredential, email }) => {
            if (methods.includes(EmailAuthProvider.PROVIDER_ID)) {
                setIsOpen(true);
                setLoginData({
                    pendingCredential,
                    email,
                });
                return;
            }

            if (methods.includes(GoogleAuthProvider.PROVIDER_ID)) {
                try {
                    const result = await signInWithPopup(
                        auth,
                        new GoogleAuthProvider()
                    );
                    const { user, providerId } = result;
                    const { isNewUser = false } =
                        getAdditionalUserInfo(result) || {};
                    if (user.email !== email) {
                        await unlink(user, providerId);
                        isNewUser && (await user.delete());
                        logOut({
                            target:
                                (isRegisterPage && PARTICIPANT_REGISTER) || '',
                        });
                        alert('The linked account has not existed.');
                        return false;
                    }
                    await linkWithCredential(user, pendingCredential);
                    alert(
                        'Your account has been linked with the existing one.'
                    );
                    return true;
                } catch (e) {
                    alert(getMessage(e.code));
                    return false;
                }
            }
        },
        [isRegisterPage, logOut]
    );

    const resultHandler = (result) => {
        if (isEmpty(result)) {
            return;
        }

        if (result.isError) {
            onFail(result);
            return;
        }

        if (result.code !== ACCOUNTS_LINKED) {
            // You can use oAuthToken to access the Facebook/Google API
            const { accessToken: oAuthToken } =
                OAuthProvider.credentialFromResult(result);
            onSuccess({ ...result, oAuthToken });
            return;
        }

        handleLinkAccounts(result.data).then((res) => {
            res && router.push(PARTICIPANT_DASHBOARD);
        });
    };

    const authWithSocial = async (provider) => {
        const result = await socialAuth(provider);
        resultHandler(result);
    };

    return (
        <div className={styles['social-login-container']}>
            <button
                className={clsx(styles['social-login'], styles.google)}
                onClick={() => authWithSocial(GOOGLE_PROVIDER)}
            >
                {google}
            </button>
            <button
                className={clsx(styles['social-login'], styles.facebook)}
                onClick={() => authWithSocial(FACEBOOK_PROVIDER)}
            >
                {facebook}
            </button>
            {
                <PasswordPrompt
                    open={isOpen}
                    setOpen={setIsOpen}
                    loginData={loginData}
                />
            }
        </div>
    );
};

export default SocialAuth;
