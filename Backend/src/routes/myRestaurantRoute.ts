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

router.post("/", upload.single("imageFile"), jwtCheck, jwtParse, validateMyRestaurantRequest, myRestaurantController.createMyRestaurant);

router.get("/", jwtCheck, jwtParse, myRestaurantController.getMyResutaurant)


export default router;