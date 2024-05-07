import { Router } from 'express';
import usersController from '../controllers/users.controller.js';

const userRouter = Router();

userRouter.get('/', usersController.getAllUsers);

userRouter.get('/:uid', usersController.getUser);
userRouter.put('/:uid', usersController.updateUser);
userRouter.delete('/:uid', usersController.deleteUser);


export default userRouter;