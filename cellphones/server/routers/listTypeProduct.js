import express from 'express';

import {
    deleteTypeProduct,
    getAllTypeProduct,
    createNewTypeProduct,
} from '../controllers/listTypeProduct.js';
import { upload } from 'untils';

const ListTypeProductRouter = express.Router();

ListTypeProductRouter.get('/', getAllTypeProduct);
ListTypeProductRouter.delete('/delete/:id', deleteTypeProduct);
ListTypeProductRouter.post('/create', upload.single('image'), createNewTypeProduct);

export default ListTypeProductRouter;
