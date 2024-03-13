import express, {Request, Response} from "express";
import cors from 'cors';
import 'dotenv/config';
import mongoose from "mongoose";
import myUserRoute from  './routes/myUserRoute'


mongoose.connect(process.env.DB_URL as string)
.then(()=> console.log("db connected successfully"))

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/my/user", myUserRoute)
app.listen(7000, ()=> {
    console.log('server running at localhost:7000')
})

