import admin from 'firebase-admin'

var serviceAccount = require("serviceAccountKey.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://mojarib-bss-default-rtdb.asia-southeast1.firebasedatabase.app"
    });
}

const db = admin.firestore();
const auth = admin.auth();


export { db, auth };