import express from  'express';
import myUserController from '../controllers/myUserController';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateMyUserRequest } from '../middleware/validation';

const userRouter = express.Router();

// /api/my/user
userRouter.post("/",jwtCheck, myUserController.createCurrentUser)
userRouter.put("/", jwtCheck, jwtParse, validateMyUserRequest, myUserController.updateCurrentUser)

export default userRouter
