import {
    AuthErrorCodes,
    FacebookAuthProvider,
    GoogleAuthProvider,
    fetchSignInMethodsForEmail,
    getAdditionalUserInfo,
    sendEmailVerification,
    signInWithPopup,
    signOut,
} from 'firebase/auth';

import {ACCOUNTS_LINKED, EMPTY_EMAIL, UNAUTHORIZED, UNDEFINED} from '../components/const';
import { FACEBOOK_PROVIDER, PARTICIPANTS } from './const';
import { getMessage } from './error';
import { auth } from './index';
import { isAuthorized } from './user';

const socialAuth = async (provider) => {
    const authProvider =
        (provider === FACEBOOK_PROVIDER && new FacebookAuthProvider()) ||
        new GoogleAuthProvider();
    const { NEED_CONFIRMATION: ACCOUNT_EXISTS } = AuthErrorCodes;
    let errorData = {
        isError: true,
        code: UNDEFINED,
        message: 'Undefined error occurs.',
    };
    try {
        const result = await signInWithPopup(auth, authProvider);
        const user = result.user;
        const { email = '', emailVerified = false, uid = '' } = user || {};
        if (uid && !email) {
            await user.delete();
            return {
                ...errorData,
                code: EMPTY_EMAIL,
                message:
                    'Your Facebook account does not have an email address. Please use another account or other registration method.',
            };
        }

        const { isNewUser = false } = getAdditionalUserInfo(result) || {};
        if (isNewUser) {
            if (!emailVerified) {
                const actionCodeSettings = {
                    url: `${process.env.NEXT_PUBLIC_DOMAIN}/?uid=${uid}&role=${PARTICIPANTS}`,
                };
                await sendEmailVerification(user, actionCodeSettings);
                await signOut(auth);
            }
            return result;
        }

        // Check if current account has been existed as a participant
        const isParticipant = await isAuthorized(email, PARTICIPANTS);
        if (!isParticipant) {
            await signOut(auth);
            return {
                ...errorData,
                code: UNAUTHORIZED,
                message: 'You are not a participant.',
            };
        }

        return result;
    } catch (error) {
        const { code, customData: { email = '' } = {} } = error;
        let errorCode = code;
        if (errorCode === ACCOUNT_EXISTS && email) {
            try {
                const methods = await fetchSignInMethodsForEmail(auth, email);
                const pendingCredential =
                    FacebookAuthProvider.credentialFromError(error);
                return {
                    isError: false,
                    code: ACCOUNTS_LINKED,
                    data: {
                        methods,
                        pendingCredential,
                        email
                    }
                };
            } catch (e) {
                errorCode = e.code;
                console.log(e);
            }
        }

        return {
            ...errorData,
            errorCode,
            message: getMessage(errorCode),
        };
    }
};

export default socialAuth;
