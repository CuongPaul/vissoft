import {doc, setDoc, getDoc, getDocs, collection, limit, query, startAfter, deleteDoc} from "firebase/firestore";
import {db} from "../firebase/index";
import {CUSTOMER_COLLECTION} from "../src/const";

export const createAccount = async (data) => {
    let result = {
        success: false,
        message: 'Error when create account'
    }
    try {
        const createUser = await fetch('/api/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                active: (data.active === 'true' || data.active === true)
            })
        });
        if (createUser.redirected) {
            return createUser;
        }
        const createUserRes = await createUser.json();
        if (createUserRes.success) {
            const account = doc(db, CUSTOMER_COLLECTION, createUserRes.data);
            const accountSnap = await getDoc(account);
            if (accountSnap.exists()) {
                console.log("Document data:", accountSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                delete data.password;
                data.createdAt = new Date();
                (data.active === "true" || data.active === true) ? (data.active = true) : (data.active = false);
                await setDoc(doc(db, CUSTOMER_COLLECTION, createUserRes.data), data);
            }
            result = {
                success: true,
                message: 'Success'
            }
        } else {
            result = createUserRes
        }
    } catch (e) {
        console.log('e', e)
    }

    return result;
}
export const createCustomer = async (uid, data) => {
    const account = doc(db, CUSTOMER_COLLECTION, uid);
    const accountSnap = await getDoc(account);
    if (accountSnap.exists()) {
        console.log("Document data:", accountSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        delete data.password;
        data.createdAt = new Date()
        await setDoc(doc(db, CUSTOMER_COLLECTION, uid), data);
    }
}

export const updateCustomer = async (uid, data) => {
    let result = {
        success: false,
        message: 'Error when update customer.'
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
            await setDoc(doc(db, CUSTOMER_COLLECTION, uid), data);
            result = {
                success: true,
                message: 'Successfully saved.'
            }
        }

    } catch (e) {
        console.log('e', e)
    }
    return result;

}
export const getCustomerList = async () => {
    const list = []
    let lastVisible = null
    try {
        const customerList = await getDocs(query(collection(db, CUSTOMER_COLLECTION), limit(1)));
        if (customerList.docs && customerList.docs.length) {
            lastVisible = customerList.docs[customerList.docs.length - 1];
        }
        customerList.forEach(doc => {
            console.log(doc.id, doc.data())
            const data = doc.data();
            data.id = doc.id
            list.push(data);
        })
    } catch (e) {
        console.log('error when fetching customer list data', e)
    }

    return {list, lastVisible};
}
export const getMoreCustomer = async (lastVisible) => {
    const list = []
    let newLastVisible = null
    try {
        const moreCustomer = await getDocs(
            query(
                collection(db, CUSTOMER_COLLECTION),
                startAfter(lastVisible),
                limit(1),
            )
        );
        if (moreCustomer.docs && moreCustomer.docs.length) {
            newLastVisible = moreCustomer.docs[moreCustomer.docs.length - 1];
        }
        moreCustomer.forEach((doc) => {
            list.push({...doc.data(), id: doc.id});
        });


    } catch (error) {
        console.log('err', error)
    }
    return {
        list, lastVisible: newLastVisible
    };
};

export const getCustomerDetail = async (id) => {
    let result = {
        success: false,
        message: "Get data error",
        data: null
    }
    try {
        console.log(id)
        const customer = doc(db, CUSTOMER_COLLECTION, id);
        const customerSnap = await getDoc(customer);
        if (customerSnap.exists()) {
            result = {
                success: true,
                message: "Get data success",
                data: customerSnap.data()
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

export const deleteCustomer = async (uid) => {
    let result = {
        success: false,
        message: "Delete error",
        data: null
    }
    const deleteCustomer = await fetch('/api/user/delete', {
        method: 'POST',
        redirect: "follow",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uid: uid,
        })
    });
    if (deleteCustomer.redirected) {
        return deleteCustomer;
    }
    const deleteCustomerRes = await deleteCustomer.json();
    try {
        await deleteDoc(doc(db, CUSTOMER_COLLECTION, uid));
    } catch (e) {
        console.log('e', e)
    }

    if (deleteCustomerRes.success) {
        result = {
            success: true,
            message: "Success"
        }
    }
    return result;
};