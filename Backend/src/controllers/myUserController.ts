import { Request, Response } from "express";
import { User } from "../models/user";

const createCurrentUser = async(req:Request, res:Response) =>{
    try {
        const { auth0Id } = req.body;
        const existingUser = await User.findOne({auth0Id}); 

        if(existingUser){
            return res.status(200).json({ user : existingUser });
        }

        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json({newUser})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Error Creating User"})
    }
};

const updateCurrentUser = async(req:Request, res:Response)=>{
    try {
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Error Updating User"})
    }
}

export default {
    createCurrentUser,
    updateCurrentUser,
};
