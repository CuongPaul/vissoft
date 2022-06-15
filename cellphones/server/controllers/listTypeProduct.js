import cloudinary from 'cloudinary';
import expressAsyncHandler from 'express-async-handler';

import { ListTypeProduct } from '../models';

export const getAllTypeProduct = expressAsyncHandler(async (req, res) => {
    try {
        const listTypeProducts = await ListTypeProduct.find();

        res.send(listTypeProducts);
    } catch (error) {
        console.error(error);
    }
});

export const createNewTypeProduct = expressAsyncHandler(async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'dev_setups' });

        const listTypeProduct = new ListTypeProduct({
            name: req.body.name,
            image: result.secure_url,
            cloudinary_id: result.public_id,
        });

        const newListTypeProduct = await listTypeProduct.save();

        res.send(newListTypeProduct);
    } catch (error) {
        console.error(error);
    }
});

export const deleteTypeProduct = expressAsyncHandler(async (req, res) => {
    try {
        const listTypeProduct = await ListTypeProduct.findById({ _id: req.params.id });

        await cloudinary.uploader.destroy(listTypeProduct.cloudinary_id);

        if (listTypeProduct) {
            await listTypeProduct.remove();
            res.send({ message: 'Type product is deleted ' });
        } else {
            res.send({ message: 'Product is not found' });
        }
    } catch (error) {
        console.error(error);
    }
});
