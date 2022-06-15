import { doc, setDoc, getDocs, deleteDoc, query, where, addDoc, updateDoc, collection, getDoc } from "firebase/firestore";

import { db } from "../firebase/index";

export const createPostByFirebase = async (
    title,
    content,
    image,
    author,
    created_at,
    updated_at
) => {
    try {
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "posts"), {
            title,
            content,
            image,
            author,
            created_at,
            updated_at
        });

        return {
            status: 'success',
            data: {
                postId: docRef.id
            }
        }
    } catch (err) {
        return { status: "fail", message: err };
    }
};

export const deletePostByFirebase = async (
    pid
) => {
    try {
        await deleteDoc(doc(db, "posts", pid));
        return {
            status: 'success'
        }
    } catch (err) {
        return { status: "fail", message: err };
    }
};

export const updatePostByFirebase = async (
    pid,
    title,
    content,
    image,
    author,
    updated_at
) => {
    try {
        const postRef = doc(db, "posts", pid);

        // Add a new document with a generated id.
        const docRef = await updateDoc(postRef, {
            title,
            content,
            image,
            author,
            updated_at
        });

        return {
            status: 'success'
        }
    } catch (err) {
        return { status: "fail", message: err };
    }
};

export const getListingPosts = async () => {
    try {
        const docRef = collection(db, "posts");
        const q = query(docRef);

        const querySnapshot = await getDocs(q);
        const listingPosts = new Array();
        querySnapshot.forEach((doc) => {
            const docData = doc.data();
            listingPosts.push({
                id: doc.id,
                title: docData.hasOwnProperty('title') ? docData.title : '',
                content: docData.hasOwnProperty('content') ? docData.content : '',
                image: docData.hasOwnProperty('image') ? docData.image : '',
                author: docData.hasOwnProperty('author') ? docData.author : '',
                created_at: docData.hasOwnProperty('created_at') ? docData.created_at.toDate().toLocaleString() : '',
                updated_at: docData.hasOwnProperty('updated_at') ? docData.updated_at.toDate().toLocaleString() : '',
            });
        });

        return {
            status: "success",
            data: listingPosts
        }
    } catch (error) {
        return error;
    }
};


export const getPostDetails = async (pid) => {
    let result = {
        success: false,
        message: "Get data error",
        data: null
    }

    try {
        const docRef = doc(db, "posts", pid);
        const docSnap = await getDoc(docRef);
        const docData = docSnap.data()
        if (docSnap.exists()) {
            result.status = 'success';
            result.data = {
                id: docSnap.id,
                title: docData.hasOwnProperty('title') ? docData.title : '',
                content: docData.hasOwnProperty('content') ? docData.content : '',
                image: docData.hasOwnProperty('image') ? docData.image : '',
                created_at: docData.hasOwnProperty('created_at') ? docData.created_at.toDate().toDateString() : '',
                updated_at: docData.hasOwnProperty('updated_at') ? docData.updated_at.toDate().toDateString() : '',
            }
        }
    } catch (error) {
        console.log(error)
        return error;
    }

    return result
};