import cloudinary from 'cloudinary';
import expressAsyncHandler from 'express-async-handler';

import { Product } from '../models';
import { PinComment } from '../untils';

export const getAllProduct = expressAsyncHandler(async (req, res) => {
    try {
        const products = await Product.find();

        res.send(products);
    } catch (error) {
        console.error(error);
    }
});

export const findProductById = expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.findById({ _id: req.params.id });

        if (product) {
            res.send(product);
        } else {
            res.send({ message: 'Product is not found' });
        }
    } catch (error) {
        console.error(error);
    }
});

export const filterProductByType = expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.find({ type: req.params.type }).limit(5);

        res.send(product);
    } catch (error) {
        console.error(error);
    }
});

export const filterProductByRandomField = expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.find(req.body);

        if (product) {
            res.send(product);
        } else {
            res.send({ message: 'Product is not found' });
        }
    } catch (error) {
        console.error(error);
    }
});
export const AddProduct = expressAsyncHandler(async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'dev_setups' });

        const product = new Product({
            rating: 0,
            type: req.body.type,
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            image: result.secure_url,
            salePrice: req.body.salePrice,
            cloudinary_id: result.public_id,
        });
        const newProduct = await product.save();

        if (newProduct) {
            res.status(201).send({ message: 'Product is created', data: newProduct });
        } else {
            res.send('Something was wrong');
        }
    } catch (error) {
        console.error(error);
    }
});

export const UpdateProduct = expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.body._id);
        await cloudinary.uploader.destroy(product.cloudinary_id);

        let result;
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }

        if (product) {
            product.rating = 0;
            product.name = req.body.name;
            product.type = req.body.type;
            product.price = req.body.price;
            product.amount = req.body.amount;
            product.salePrice = req.body.salePrice;
            product.image = result?.secure_url || product.image;
            product.cloulinary_id = result?.public_id || product.cloudinary_id;

            const newroduct = await product.save();

            if (newroduct) {
                res.send('Update successful');
            }
        }

        return res.send('Update fail');
    } catch (error) {
        console.error(error);
    }
});

export const DeleteProduct = expressAsyncHandler(async (req, res) => {
    const deleteProduct = await Product.findById(req.params.id);

    await cloudinary.uploader.destroy(deleteProduct.cloudinary_id);

    if (deleteProduct) {
        await deleteProduct.remove();
        console.log('delete');
        res.send({ message: 'product deleted' });
    } else {
        console.log('error delete product');
        res.send('error in deletetion');
    }
});

export const SearchProduct = expressAsyncHandler(async (req, res) => {
    const name = req.query.name;
    const product = await Product.find({ name: { $regex: name, $options: '$i' } });

    product.length > 0 ? res.send(product) : res.send({ message: ' khong tim thay sp' });
});

export const paginationProduct = expressAsyncHandler(async (req, res) => {
    var perPage = 4;
    var page = req.params.page || 1;
    Product.find({})
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(function (err, products) {
            Product.countDocuments().exec(function (err, count) {
                if (err) return next(err);
                res.send({
                    products: products,
                    current: page,
                    pages: Math.ceil(count / perPage),
                });
            });
        });
});

export const RateProduct = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        const existsUser = product.reviews.find((x) => x.name === req.body.name);
        console.log(existsUser);
        if (existsUser) {
            res.send({ message: 'ban da danh gia san pham nay' });
        } else {
            product.reviews.push(req.body);
            const updateProduct = await product.save();
            res.send(updateProduct);
        }
    } else {
        res.status(400).send({ message: 'product not found' });
    }
});

export const CommentProduct = expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const product = await Product.findById(req.params.id);
    if (product) {
        product.comments.push(req.body);
        const updateCommentProduct = await product.save();
        res.send(updateCommentProduct);
    } else {
        res.status(400).send({ message: 'product not found' });
    }
});

export const RepCommentProduct = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        const indexComment = product.comments.findIndex((item) => item._id == req.body.idComment);
        product.comments[indexComment].replies.push(req.body);

        await product.save();
        res.send(product);
    } else {
        res.status(400).send({ message: 'product not found' });
    }
});

export const PinCommentProduct = expressAsyncHandler(async (req, res) => {
    console.log(req.body, req.params.id);
    const product = await Product.findById(req.params.id);
    if (product) {
        const indexComment = product.comments.findIndex((item) => item._id == req.body.idComment);
        product.comments[indexComment] = req.body;
        PinComment(product.comments, indexComment, 0);

        await product.save();
        res.send(product);
    } else {
        res.status(400).send({ message: 'product not found' });
    }
});

export const BlogProduct = expressAsyncHandler(async (req, res) => {
    console.log(req.body.blogContent);
    const product = await Product.findById({ _id: req.params.id });

    if (product) {
        product.blog = req.body.blogContent;
        await product.save();
        res.send(product);
    } else {
        res.send({ message: 'product not found' });
    }
});
