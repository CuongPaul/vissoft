import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            isAdmin: user.isAdmin,
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: '30d',
        }
    );
};
