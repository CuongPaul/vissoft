import {doc, setDoc, getDoc, getDocs, collection, limit, query, startAfter, deleteDoc} from "firebase/firestore";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../firebase/index";

export const createAccount = async (data) => {
    let result = {
        status: false,
        message: 'Error when create account'
    }
    try {
        await createUserWithEmailAndPassword(auth, data.email, data.password)
        result = {
            status: true,
            message: 'Success'
        }
    } catch (e) {
        if (e.code === 'auth/login-blocked') {
            result = {
                status: true,
                message: 'Success'
            }
        } else if (e.code === 'auth/email-already-in-use') {
            result = {
                status: false,
                message: 'This email is already in use.'
            }
        } else {
            result = {
                status: false,
                message: e.message
            }
        }
    }

    return result;
}
export const createAnalyst = async (uid, data) => {
    const account = doc(db, "analysts", uid);
    const accountSnap = await getDoc(account);
    if (accountSnap.exists()) {
        console.log("Document data:", accountSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        delete data.password;
        data.createdAt = new Date()
        (data.active === "true" || data.active === true) ? (data.active = true) : (data.active = false);
        await setDoc(doc(db, "analysts", uid), data);
    }
}

export const updateAnalyst = async (uid, data) => {
    let result = {
        success: false,
        message: 'Error when update analyst.'
    }
    try {
        const updateEmail = await fetch('/api/user/updateEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: uid,
                email: data.email,
                active: data.active
            })
        });
        if (updateEmail.redirected) {
            return updateEmail;
        }
        const updateEmailRes = await updateEmail.json()
        if (updateEmailRes.success) {
            (data.active === "true" || data.active === true) ? (data.active = true) : (data.active = false);
            await setDoc(doc(db, "analysts", uid), data);
            result = {
                success: true,
                message: 'Successfully saved.'
            }
        }
        else {
            result = updateEmailRes
        }

    } catch (e) {
        console.log('e', e)
    }
    return result;

}
export const getAnalystList = async () => {
    const list = []
    let lastVisible = null
    try {
        const analystList = await getDocs(query(collection(db, "analysts"), limit(1)));
        if (analystList.docs && analystList.docs.length) {
            lastVisible = analystList.docs[analystList.docs.length - 1];
        }
        analystList.forEach(doc => {
            console.log(doc.id, doc.data())
            const data = doc.data();
            data.id = doc.id
            list.push(data);
        })
    } catch (e) {
        console.log('error when fetching analyst list data', e)
    }

    return {list, lastVisible};
}
export const getMoreAnalyst = async (lastVisible) => {
    const list = []
    let newLastVisible = null
    try {
        const moreAnalyst = await getDocs(
            query(
                collection(db, "analysts"),
                startAfter(lastVisible),
                limit(1),
            )
        );
        if (moreAnalyst.docs && moreAnalyst.docs.length) {
            newLastVisible = moreAnalyst.docs[moreAnalyst.docs.length - 1];
        }
        moreAnalyst.forEach((doc) => {
            list.push({...doc.data(), id: doc.id});
        });


    } catch (error) {
        console.log('err', error)
    }
    return {
        list, lastVisible: newLastVisible
    };
};

export const getAnalystDetail = async (id) => {
    let result = {
        success: false,
        message: "Get data error",
        data: null
    }
    try {
        console.log(id)
        const analyst = doc(db, "analysts", id);
        const analystSnap = await getDoc(analyst);
        if (analystSnap.exists()) {
            result = {
                success: true,
                message: "Get data success",
                data: analystSnap.data()
            }
        }

    } catch (error) {
        console.log('err', error.toString())
    }
    return result;
};

export const resetPassword = async (uid, data) => {
    let result = {
        success: false,
        message: "Get data error",
        data: null
    }
    const resetPass = await fetch('/api/user/updatePassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uid: uid,
            password: data.password
        })
    });
    if (resetPass.redirected) {
        return resetPass;
    }
    const resetPasswordRes = await resetPass.json();
    if (resetPasswordRes) {
        result = {
            success: true,
            message: "Success"
        }
    }
    return result;
};

export const deleteAnalyst = async (uid) => {
    let result = {
        success: false,
        message: "Delete error",
        data: null
    }
    const deleteAnalyst = await fetch('/api/user/delete', {
        method: 'POST',
        redirect: "follow",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uid: uid,
        })
    });
    if (deleteAnalyst.redirected) {
        return deleteAnalyst;
    }
    const deleteAnalystRes = await deleteAnalyst.json();
    await deleteDoc(doc(db, "analysts", uid));
    if (deleteAnalystRes) {
        result = {
            success: true,
            message: "Success"
        }
    }
    return result;
};