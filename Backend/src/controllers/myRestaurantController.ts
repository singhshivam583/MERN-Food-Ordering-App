import { Request, Response } from "express";
import { User } from "../models/user";
import { Restaurant } from "../models/restaurant";
import cloudinary from 'cloudinary';
import mongoose from "mongoose";

const uploadImage = async(file:Express.Multer.File) => {

    const imageFile = file;
    const base64Image = Buffer.from(imageFile.buffer).toString("base64");
    const dataURI = `data:${imageFile.mimetype};base64,${base64Image}`; 
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    return uploadResponse;
}

const getMyResutaurant = async(req:Request , res :Response) =>{
    try {
        const restaurant = await Restaurant.findOne({user: req.userId});
        if(!restaurant){
            return res.status(401).json({msg:"There is no restaurant for this user"})
        }

        return res.status(201).json(restaurant);

    } catch (error) {
        console.log('error', error)
        return res.status(500).json({message:"Error while fetching data"})
    }
}

const createMyRestaurant = async(req:Request, res:Response) => {
    try {
        const existingRestaurant = await Restaurant.findOne({user:req.userId});
        
        if(existingRestaurant){
            return res.status(409).json({message: 'User restaurant exist'})
        }

        // const imageFile = req.file as Express.Multer.File;
        // const base64Image = Buffer.from(imageFile.buffer).toString("base64");
        // const dataURI = `data:${imageFile.mimetype};base64,${base64Image}`; 
        // const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

        const uploadResponse = await uploadImage(req.file as Express.Multer.File);
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

const updateMyRestaurant = async(req: Request, res: Response) =>{
    try {
        const restaurant = await Restaurant.findOne({user:req.userId})

        if(!restaurant){
            return res.status(404).json({message:'No such restaurant found!'})
        }

        restaurant.restaurantName = req.body.restaurantName;
        restaurant.city = req.body.city;
        restaurant.country = req.body.country;
        restaurant.deliveryPrice = req.body.deliveryPrice;
        restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
        restaurant.cuisines = req.body.cuisines;
        restaurant.menuItems = req.body.menuItems;
        restaurant.lastUpdate = new Date();

        if(req.file){
            const uploadResponse = await uploadImage(req.file);
            if(uploadResponse.error){
                return res.status(401).json({ message : uploadResponse.error.message })
            }
            restaurant.imageUrl = uploadResponse.url;
        }
        await restaurant.save();

        return res.status(200).json(restaurant);

    } catch (error: any) {
        return res.status(500).json({message: "Error while updating restaurant", error: error.message})
    }
}

export default {
    createMyRestaurant,
    getMyResutaurant,
    updateMyRestaurant,

}