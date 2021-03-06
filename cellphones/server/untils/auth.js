import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (authorization) {
        const token = authorization.slice(7, authorization.length);

        jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
            if (err) {
                res.status.send({ message: 'Invalid token' });
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({ message: 'No token' });
    }
};
