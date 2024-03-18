import express, {Request, Response} from "express";
import cors from 'cors';
import 'dotenv/config';
import mongoose from "mongoose";
import myUserRoute from  './routes/myUserRoute';
import { v2 as cloudinary } from  'cloudinary';
import myRestaurantRoute from "./routes/myRestaurantRoute";


mongoose
    .connect(process.env.DB_URL as string)
    .then(()=> console.log("db connected successfully"))

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});



const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request , res :Response)=>{
    res.send({message:"Everything is Ok!"})
});

app.use("/api/my/user", myUserRoute)
app.use("/api/my/restaurant", myRestaurantRoute)
app.listen(7000, ()=> {
    console.log('server running at localhost:7000')
})

