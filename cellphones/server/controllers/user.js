import expressAsyncHandler from 'express-async-handler';

import { User } from '../models';
import { generateToken } from 'untils';

export const getAllUser = expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.find();

        res.send(user);
    } catch (error) {
        console.error(error);
    }
});

export const registerUser = expressAsyncHandler(async (req, res) => {
    const user = new User({
        phone: '',
        address: '',
        isAdmin: false,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    const newUser = user.save();

    res.send(newUser);
});

export const loginUser = expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email, password: req.body.password });

        if (user) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                isAdmin: user.isAdmin,
                password: user.password,
                token: generateToken(user),
            });
        } else {
            res.status(401).send({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
    }
});

export const deleteUser = expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id });

        if (user) {
            await user.remove();
            res.send({ message: 'User is deleted' });
        } else {
            res.send({ message: 'User is not exists' });
        }
    } catch (error) {
        console.error(error);
    }
});
