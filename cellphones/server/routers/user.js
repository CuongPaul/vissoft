import express from 'express';

import { getAllUser, registerUser, loginUser, deleteUser } from '../controllers/user.js';

const UserRouter = express.Router();

UserRouter.get('/', getAllUser);
UserRouter.post('/login', loginUser);
UserRouter.post('/register', registerUser);
UserRouter.delete('/delete/:id', deleteUser);

export default UserRouter;
