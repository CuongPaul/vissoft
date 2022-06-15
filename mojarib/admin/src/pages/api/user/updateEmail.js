// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {auth} from "../../../../firebase/firebaseAdmin";

export default async function handler(req, res) {
    let result = {
        success: false,
        message: 'Error when update analyst email',
        data: null
    }
    await auth
        .updateUser(req.body.uid, {email: req.body.email, emailVerified: true, disabled: (req.body.active === "false" || req.body.active === false)})
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
            result = {
                success: true,
                message: 'Email updated',
                data: userRecord.toJSON()
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

