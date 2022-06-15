
import { auth} from "../../../../firebase/firebaseAdmin";

export default async function handler(req, res) {
    let result = {
        success: false,
        message: 'Error when update analyst password',
        data: null
    }
    await auth
        .updateUser(req.body.uid, {password: req.body.password})
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log(`Successfully update user data: ${userRecord.toJSON()}`);
            result = {
                success: true,
                message: 'Password updated',
                data: userRecord.toJSON()
            }
        })
        .catch((error) => {
            console.log('Error fetching user data:', error);
        });

    return res.status(200).json(result)
}

