import express from 'express';

import { uploadImage } from '../controllers/upload.js';

const uploadRouter = express.Router();

uploadRouter.post('/upload', uploadImage);

export default uploadRouter;
