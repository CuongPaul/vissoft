import cloudinary from 'config/cloudinary';

export const uploadImage = async (req, res) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(req.body.data, {
            upload_preset: 'dev_setups',
        });

        if (uploadResponse) {
            res.json({ message: 'Upload successful' });
        } else {
            res.status(500).json({ error: 'Something went wrong' });
        }
    } catch (error) {
        console.error(error);
    }
};
