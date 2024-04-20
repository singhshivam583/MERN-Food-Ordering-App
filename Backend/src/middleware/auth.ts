import { NextFunction, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

declare global{
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_USER_BASE_URL,
  tokenSigningAlg: process.env.AUTH0_TOKEN_ALGO,
});

export const jwtParse = async(
  req:Request, 
  res:Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if(!authorization || !authorization.startsWith("Bearer")){
    return res.sendStatus(401);
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedUser = jwt.decode(token) as jwt.JwtPayload;
    // console.log(decodedUser)
    const auth0Id = decodedUser.sub

    const user = await User.findOne({auth0Id})

    if(!user){
      return res.sendStatus(401)
    }

    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();
    next();

  } catch (error) {
    return res.sendStatus(401);
  }

}