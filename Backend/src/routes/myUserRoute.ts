import express from  'express';
import myUserController from '../controllers/myUserController';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateMyUserRequest } from '../middleware/validation';

const userRouter = express.Router();

userRouter.get("/",jwtCheck, jwtParse, myUserController.getCurrentUser)

// /api/my/user
userRouter.post("/",jwtCheck, myUserController.createCurrentUser)

// jwtCheck used to check the token is valid and then parse it using jwtParse middleware which returns user details and validateMyUserRequest is used to check non empty fields 
userRouter.put("/", jwtCheck, jwtParse, validateMyUserRequest, myUserController.updateCurrentUser)

export default userRouter

