import express from  'express';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateMyRestaurantRequest } from '../middleware/validation';
import  multer  from 'multer';
import myRestaurantController from '../controllers/myRestaurantController';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,  // Max file size is 5MB
    },
});

router.post("/", jwtCheck, jwtParse, upload.single("imageFile"), myRestaurantController.createMyRestaurant);


export default router;