import { Request, Response } from "express";
import { User } from "../models/user";
import { Restaurant } from "../models/restaurant";
import cloudinary from 'cloudinary';
import mongoose from "mongoose";


const createMyRestaurant = async(req:Request, res:Response) => {
    try {
        const existingRestaurant = await Restaurant.findOne({user:req.userId});
        
        if(existingRestaurant){
            return res.status(409).json({message: 'User restaurant exist'})
        }

        const imageFile = req.file as Express.Multer.File;
        // console.log(imageFile)
        const base64Image = Buffer.from(imageFile.buffer).toString("base64");
        // console.log(base64Image);
        const dataURI = `data:${imageFile.mimetype};base64,${base64Image}`; 
        // console.log(dataURI);

        const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
        // console.log(uploadResponse);
        if(uploadResponse.error){
            return res.status(401).json({ message : uploadResponse.error.message })
        }

        const restaurant = new Restaurant(req.body);
        restaurant.imageUrl = uploadResponse.url;
        restaurant.user= new mongoose.Types.ObjectId(req.userId);
        restaurant.lastUpdate = new Date();
        // console.log(restaurant);
        await restaurant.save()

        return res.status(201).json({restaurant, message:"Created Successfully"})
        
    } catch (error) {
        // console.log(error);
        return res.status(500).json({message: "Something went wrong while creating restaurant"})
    }
}

export default {
    createMyRestaurant,
}