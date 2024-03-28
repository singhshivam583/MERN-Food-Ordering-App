import { NextFunction, Response, Request } from "express"
import { body, validationResult } from "express-validator"


const handleValidationErrors = async (
    req:Request,
    res:Response, 
    next: NextFunction
) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({validationErrors: errors.array()});
    }
    next();
}


export const validateMyUserRequest = [
    body("name")
        .isString()
        .notEmpty()
        .withMessage("Name must be a String"),
    body("addressLine1")
        .isString()
        .notEmpty()
        .withMessage("AddressLine1 must be a String"),
    body("city")
        .isString()
        .notEmpty()
        .withMessage("City must be a String"),
    body("country")
        .isString()
        .notEmpty()
        .withMessage("Country must be a String"),
    handleValidationErrors,
    
]

export const validateMyRestaurantRequest = [
    body("restaurantName")
        .isString()
        .notEmpty()
        .withMessage("Name is required"),
    body("city")
        .isString()
        .notEmpty()
        .withMessage("City is required"),
    body("country")
        .isString()
        .notEmpty()
        .withMessage("Country is required"),
    body("deliveryPrice")
        .isFloat({min: 0})
        .withMessage("Delivery Price must be positive"),
    body("estimatedDeliveryTime")
        .isInt({min:0})
        .withMessage("Delivery time must be positive"),
    body("cuisines")
        .isArray()
        .withMessage("Cuisine must be array")
        .not()
        .isEmpty()
        .withMessage("Cuisines array can't be empty"),
    body("menuItems")
        .isArray()
        .withMessage("Menu items must be an array"),
    body("menuItems.*.name")
        .notEmpty()
        .withMessage("Menu item name is required"),
    body("menuItems.*.price")
        .isFloat({ min: 0 })
        .withMessage("Menu item price is required and must be a postive number"),
    handleValidationErrors,
]