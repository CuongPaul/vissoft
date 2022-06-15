import {auth} from "../../../../firebase/firebaseAdmin";

export default async function handler(req, res) {
    let result = {
        success: false,
        message: 'Error when delete analyst',
        data: null
    }
    await auth
        .deleteUser(req.body.uid)
        .then(async (userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log(`Successfully delete user data`);
            result = {
                success: true,
                message: 'Deleted'
            }
        })
        .catch((error) => {
            console.log('Error fetching user data:', error);
        });

    return res.status(200).json(result)
}

