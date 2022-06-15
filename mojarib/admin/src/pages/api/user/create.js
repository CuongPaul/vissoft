// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {auth} from "../../../../firebase/firebaseAdmin";

export default async function handler(req, res) {
    let result = {
        success: false,
        message: 'Error when update analyst email',
        data: null
    }
    await auth
        .createUser({
            email: req.body.email,
            emailVerified: true,
            password: req.body.password,
            displayName: req.body.firstName + ' ' + req.body.lastName,
            disabled: !req.body.active
        })
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log(`Successfully fetched user data: ${userRecord.uid}`);
            result = {
                success: true,
                message: 'Email updated',
                data: userRecord.uid
            }
        })
        .catch((error) => {
            console.log('Error fetching user data:', error.errorInfo);
            if (error.errorInfo && error.errorInfo.code === 'auth/email-already-exists') {
                result = {
                    success: false,
                    message: error.errorInfo.message,
                    data: null
                }
            }

        });

    return res.status(200).json(result)
}

