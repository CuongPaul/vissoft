import {
    EmailAuthProvider,
    applyActionCode,
    checkActionCode,
    confirmPasswordReset,
    createUserWithEmailAndPassword,
    reauthenticateWithCredential,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updatePassword,
    updateProfile,
} from 'firebase/auth';
import {
    addDoc,
    collection,
    doc,
    documentId,
    getDoc,
    getDocs,
    limit,
    query,
    setDoc,
    startAfter,
    where,
} from 'firebase/firestore';

import { auth, db } from '../firebase/index';

export const signInByFirebase = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const querySnapshot = await getDocs(
            query(collection(db, 'customers'), where('email', '==', email))
        );

        const customer = [];
        querySnapshot.forEach((doc) => {
            customer.push(doc.data());
        });
        if (customer.length > 0) {
            return {
                data: res.user,
                status: 'succeed',
                message: 'Sign in successfully',
            };
        } else {
            await signOut(auth);
            return {
                data: '',
                status: 'fail',
                message: 'You are not customer',
            };
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const signOutByFirebase = async () => {
    return await signOut(auth);
};

export const getCustomerProfileByFirebase = async () => {
    try {
        const docRef = doc(db, 'customers', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        
        return {data: docSnap.data(), id: docSnap.id};
    } catch (error) {
        return error;
    }
};

export const setCustomerProfileByFirebase = async (profileID, profileValue) => {
    return await setDoc(
        doc(collection(db, 'customers'), profileID),
        profileValue
    );
};

export const createUserByFirebase = async (
    email,
    password,
    lastName,
    firstName,
    organizationName
) => {
    try {
        const newUser = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await updateProfile(auth.currentUser, {
            displayName: firstName + lastName,
        });

        await setDoc(doc(db, 'customers', newUser.user.uid), {
            email,
            lastName,
            firstName,
            organizationName,
            subscribeNewLetter: false,
        });

        const actionCodeSettings = {
            url: `${process.env.NEXT_PUBLIC_DOMAIN}/?uid=${newUser.user.uid}&role=customers`,
        };
        await sendEmailVerification(auth.currentUser, actionCodeSettings);

        return {
            status: 'success',
            message: 'Please check your email to verify your account!',
        };
    } catch (err) {
        return { status: 'fail', message: err };
    }
};

export const resetPasswordByFirebase = async (oobCode, newPassword) => {
    try {
        await checkActionCode(auth, oobCode);

        await confirmPasswordReset(auth, oobCode, newPassword);

        return {
            status: 'success',
            message: 'Change password successfully',
        };
    } catch (err) {
        return { status: 'fail', message: 'The link is invalid' };
    }
};

export const applyActionCodeByFirebase = async (oobCode) => {
    return await applyActionCode(auth, oobCode);
};

export const sendEmailResetPasswordByFirebase = async (email) => {
    return await sendPasswordResetEmail(auth, email);
};

export const changeEmailByFirebase = async (newEmail, password) => {
    try {
        await reauthenticateWithCredential(
            auth.currentUser,
            EmailAuthProvider.credential(auth.currentUser.email, password)
        );

        await updateEmail(auth.currentUser, newEmail);

        const docSnap = await getDoc(
            doc(db, 'customers', auth.currentUser.uid)
        );
        const data = docSnap.data();
        data.email = newEmail;
        await setDoc(doc(db, 'customers', auth.currentUser.uid), data);

        await sendEmailVerification(auth.currentUser);

        return {
            data: '',
            status: 'succeed',
            message: 'Change email successfully',
        };
    } catch (error) {
        return { data: '', status: 'fail', message: error };
    }
};

export const changePasswordByFirebase = async (
    currentPassword,
    newPassword
) => {
    try {
        await reauthenticateWithCredential(
            auth.currentUser,
            EmailAuthProvider.credential(
                auth.currentUser.email,
                currentPassword
            )
        );

        await updatePassword(auth.currentUser, newPassword);

        return {
            data: '',
            status: 'succeed',
            message: 'Change password successfully',
        };
    } catch (error) {
        return { data: '', status: 'fail', message: error };
    }
};

export const createTestByFirebase = async (data) => {
    try {
        await addDoc(collection(db, 'tests'), data);

        return {
            data: '',
            status: 'succeed',
            message: 'Create test successfully',
        };
    } catch (error) {
        return { data: '', status: 'fail', message: error };
    }
};

export const getTestListByFirebase = async () => {
    try {
        const querySnapshot = await getDocs(
            query(collection(db, 'tests'), limit(3), where('uid', '==', auth.currentUser.uid))
        );

        const testList = [];
        querySnapshot.forEach((doc) => {
            testList.push({ ...doc.data(), id: doc.id });
        });

        return {
            data: testList,
            status: 'succeed',
            message: 'Get list test successfully',
        };
    } catch (error) {
        return error;
    }
};

export const getMoreTestListByFirebase = async (lastDocID) => {
    try {
        const lastVisible = await getDoc(doc(db, 'tests', lastDocID));

        const querySnapshot = await getDocs(
            query(
                collection(db, 'tests'),
                startAfter(lastVisible),
                limit(3),
                where('uid', '==', auth.currentUser.uid)
            )
        );

        const testList = [];
        querySnapshot.forEach((doc) => {
            testList.push({ ...doc.data(), id: doc.id });
        });

        return {
            data: testList,
            status: 'succeed',
            message: 'Get more list test successfully',
        };
    } catch (error) {
        return {
            data: '',
            status: 'fail',
            message: error,
        };
    }
};

export const getTestDetailByFirebase = async (testID) => {
    try {
        const querySnapshot = await getDocs(
            query(
                collection(db, 'tests'),
                where(documentId(), '==', testID),
                where('uid', '==', auth.currentUser.uid)
            )
        );

        const testList = [];
        querySnapshot.forEach((doc) => {
            testList.push({ ...doc.data(), id: doc.id });
        });

        if (testList.length) {
            return {
                data: testList[0],
                status: 'succeed',
                message: 'Get list test successfully',
            };
        } else {
            return {
                data: '',
                status: 'fail',
                message: 'Test is not exist',
            };
        }
    } catch (error) {
        return error;
    }
};

export const setTestDetailByFirebase = async (testID, data) => {
    try {
        await setDoc(doc(db, 'tests', testID), data);

        return {
            data: '',
            status: 'success',
            message: 'Set test successfully',
        };
    } catch (error) {
        return error;
    }
};

export const setTestShareByFirebase = async (data) => {
    try {
        await setDoc(doc(db, 'tests', data.id), data);

        return {
            status: 'success',
            message: 'Set test share successfully',
        };
    } catch (error) {
        return {
            status: 'fail',
            message: error,
        };
    }
};
