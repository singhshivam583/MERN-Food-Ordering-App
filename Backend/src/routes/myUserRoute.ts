import express from  'express';
import myUserController from '../controllers/myUserController';

const userRouter = express.Router();

// /api/my/user
userRouter.post("/", myUserController.createCurrentUser)

export default userRouter