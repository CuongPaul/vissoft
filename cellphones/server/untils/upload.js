import path from 'path';
import multer from 'multer';

export const uploadImage = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            cb(new Error('File type is not supported'), false);
            return;
        } else {
            cb(null, true);
        }
    },
});
