import { doc, setDoc, getDocs, query, where, getDoc, collection } from "firebase/firestore";
import {
    signOut,
    applyActionCode,
    checkActionCode,
    confirmPasswordReset,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";

import { db, auth } from "../firebase/index";

export const signInByFirebase = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutByFirebase = async () => {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
    document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
    return await signOut(auth);
};

export const isAdminExist = async (uid) => {
    try {
        const docRef = doc(db, "admin", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap.data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            return false;
        }
    } catch (error) {
        console.log('err', error)
        return error;
    }
};

export const setCustomerProfile = async (profileID, profileValue) => {
    return await setDoc(
        doc(collection(db, "customers"), profileID),
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

        await setDoc(doc(db, "customers", newUser.user.uid), {
            email,
            lastName,
            firstName,
            organizationName,
        });

        await sendEmailVerification(auth.currentUser);

        return {
            status: "success",
            message: "Please check your email to verify your account!",
        };
    } catch (err) {
        console.log(err);
        return { status: "fail", message: err };
    }
};

export const resetPasswordByFirebase = async (oobCode, newPassword) => {
    try {
        await checkActionCode(auth, oobCode);

        await confirmPasswordReset(auth, oobCode, newPassword);

        return {
            status: "success",
            message: "Change password successfully",
        };
    } catch (err) {
        return { status: "fail", message: err };
    }
};

export const applyActionCodeByFirebase = async (oobCode) => {
    return await applyActionCode(auth, oobCode);
};

export const sendEmailResetPasswordByFirebase = async (email) => {
    return await sendPasswordResetEmail(auth, email);
};
