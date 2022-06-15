import { auth, db } from '../index';
import { setDoc, doc } from 'firebase/firestore';
import {
    sendEmailVerification,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { PARTICIPANTS } from '../const';

export const saveToDB = async (data) => {
    await setDoc(
        doc(db, PARTICIPANTS, data.uid),
        { ...data, role: PARTICIPANTS },
        { merge: true }
    );
};

export const createParticipantByFirebase = async ({
    email = '',
    password = '',
    lastName = '',
    firstName,
    source = '',
}) => {
    const {
        user: { uid },
    } = await createUserWithEmailAndPassword(auth, email, password);
    if (uid) {
        const actionCodeSettings = {
            url: `${process.env.NEXT_PUBLIC_DOMAIN}/?uid=${uid}&role=${PARTICIPANTS}`,
        };
        await saveToDB({
            uid,
            email,
            firstName,
            lastName,
            source,
            provider: 'password',
        });
        await sendEmailVerification(auth.currentUser, actionCodeSettings);
    }
};
