const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('./model/user');
const auth = require('./middleware/auth');
const database = require('./config/database');

dotenv.config();
database.connect();
const app = express();

app.use(express.json({ limit: '50mb' }));

app.post('/register', async (req, res) => {
    try {
        const { email, password, last_name, first_name } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(409).send('User already exist');
        }

        encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email,
            token: '',
            last_name,
            first_name,
            password: encryptedPassword,
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, first_name: user.first_name, last_name: user.last_name },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '1h',
                }
            );
            user.token = token;

            res.status(200).json(user);
        }

        res.status(400).send('Invalid credentials');
    } catch (error) {
        console.error(error);
    }
});

app.get('/welcome', auth, (req, res) => {
    res.status(200).send(`Welcome ${req.user.first_name} ${req.user.last_name}`);
});

app.use('*', (req, res) => {
    res.status(404).json({
        success: 'false',
        message: 'Page not found',
        error: {
            statusCode: 404,
            message: 'You reached a route that is not defined on this server',
        },
    });
});

module.exports = app;
