import { Request, Response } from "express";
import { User } from "../models/user";


const getCurrentUser = async(req:Request, res:Response) =>{
    try{
        const userId = req.userId;
        if(!userId){
            return res.status(401).json({msg:"You are not logged in"});
        }
        
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({msg:"User not found"})
        }

        return res.json(user);

    }catch(error){
        console.error(error);
        return res.status(500).send("Something went wrong");
    }
}
const createCurrentUser = async(req:Request, res:Response) =>{
    try {
        const { auth0Id } = req.body;
        const existingUser = await User.findOne({auth0Id}); 

        if(existingUser){
            return res.status(200).json({ user : existingUser });
        }

        const newUser = new User(req.body);
        await newUser.save();

        return res.status(201).json({newUser})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Error Creating User"})
    }
};

const updateCurrentUser = async(req:Request, res:Response)=>{
    try {
        const { name, addressLine1, country, city } = req.body;
        const user = await User.findById(req.userId);

        if(!user){
            return res.status(404).json({ message: 'User not found.' })
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.country = country;

        await user.save()

        return res.status(201).send(user)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Error Updating User"})
    }
}

export default {
    createCurrentUser,
    updateCurrentUser,
    getCurrentUser,
};
