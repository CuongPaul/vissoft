import {
    EmailAuthProvider,
    checkActionCode,
    reauthenticateWithCredential,
    sendEmailVerification,
    signInWithEmailAndPassword,
    updateEmail,
    updatePassword,
} from 'firebase/auth';
import {
    // eslint-disable-next-line no-unused-vars
    WhereFilterOp,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
} from 'firebase/firestore';

import {FAIL, SUCCESS, UPDATE_MODE} from '../components/const';
import { isEmpty } from '../utils/object';
import { auth, db } from './index';

const errorData = {
    error: true,
    message: 'An error occurs.',
};

const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

const getUser = async (uid = '', role = '') => {
    if (uid && role) {
        try {
            const docRef = doc(db, role, uid);
            const docSnap = await getDoc(docRef);
            return docSnap.data();
        } catch (error) {
            return error;
        }
    }
    return {
        ...errorData,
        message: 'User is null.',
    };
};

const setUser = async (uid = '', userData = {}, role = '') => {
    if (uid && role) {
        try {
            const userInfo = await getUser(uid, role);
            await setDoc(doc(collection(db, role), uid), {
                ...userInfo,
                ...userData,
            });
            return {
                error: false,
                message: 'User data is saved.',
            };
        } catch ({ message }) {
            return {
                ...errorData,
                message,
            };
        }
    }
    return {
        ...errorData,
        message: 'Uid or role name is missed.',
    };
};

const changeEmail = async (user, data) => {
    const { uid = '', email: userEmail } = user || {};
    const {
        password = '',
        email = '',
        role = '',
        message: { success = '', error = '' } = {},
    } = data;
    const params = `uid=${uid}&role=${role}&type=${UPDATE_MODE}&email=${email}`;
    const actionCodeSettings = {
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/?${params}`,
    };
    try {
        await Promise.all([
            reauthenticateWithCredential(
                user,
                EmailAuthProvider.credential(userEmail, password)
            ),
            updateEmail(user, email),
        ]);
        await sendEmailVerification(user, actionCodeSettings);
        alert(success || 'You need to verify your new email.');
        return {
            code: SUCCESS
        };
    } catch (e) {
        console.log(error || e.message);
        return {
            code: FAIL,
            message: error || e.message
        };
    }
};

const changePassword = async (user, data) => {
    const { email: userEmail } = user;
    const {
        password,
        newPassword,
        message: { success = '', error = '' } = {},
    } = data;
    try {
        if (!password) {
            // Set a new password
            await updatePassword(user, newPassword);
        } else {
            await Promise.all([
                reauthenticateWithCredential(
                    user,
                    EmailAuthProvider.credential(userEmail, password)
                ),
                updatePassword(user, newPassword),
            ]);
        }
        alert(success || 'Your password is changed.');
    } catch (e) {
        console.log(error || e.message);
    }
};

const subscribeNewsletter = async (
    uid = '',
    role = '',
    { subscribe = false, message: { error = '', success = '' } = {} }
) => {
    if (uid && role) {
        try {
            await setUser(uid, { subscribe }, role);
            const message =
                (subscribe && 'Thank you for subscribing our newsletter.') ||
                'You have been unsubscribed from the newsletter.';
            alert(success || message);
            return;
        } catch (e) {
            console.log(error || e.message);
        }
    }

    return errorData;
};

const extractOobCode = async (OobCode) => {
    return await checkActionCode(auth, OobCode);
};

/**
 * Query user by a field
 *
 * @param table - string. A firestore collection
 * @param field - string
 * @param value - string
 * @param condition - string. Type of {@link WhereFilterOp}
 */
const queryUser = async (
    table = '',
    { field = 'email', value = '' },
    condition = '=='
) => {
    if (!table) {
        return errorData;
    }
    const q = query(collection(db, table), where(field, condition, value));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        return {
            ...errorData,
            message: 'There are no documents with given field.',
        };
    }
    let result = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        result.push({ uid: doc.id, user: doc.data() });
    });
    return { ...result };
};

const isAuthorized = async (email = '', role = '') => {
    let result = await queryUser(role, { value: email });
    console.log('isAuthorized', result);
    if (result.error) {
        return false;
    }
    return !isEmpty(result);
};

export {
    getUser,
    setUser,
    changeEmail,
    changePassword,
    subscribeNewsletter,
    isAuthorized,
    extractOobCode,
    signIn,
    queryUser,
};
