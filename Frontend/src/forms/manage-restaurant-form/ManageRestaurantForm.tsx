import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import CuisineSection from "./CuisineSection";
import { Separator } from "@/components/ui/separator";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
    restaurantName: z.string({
        required_error: 'restaurant name is required'
    }),
    city: z.string({
        required_error: 'city is required'
    }),
    country: z.string({
        required_error: 'country is required'
    }),
    deliveryPrice: z.coerce.number({
        required_error: 'delivery price is requiered',
        invalid_type_error: 'must be a valid number'
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: 'delivery time is requiered',
        invalid_type_error: 'must be a valid number'
    }),
    cuisines: z.array(z.string()).nonempty({
        message: 'please select at least one item'
    }),
    menuItems: z.array(z.object({
            name: z.string().min(1, 'menuItem name is required'),
            price: z.coerce.number().min(1, 'menuItem price is required')
        })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, {message: 'image file is required'}).optional(),

}).refine((data) => data.imageUrl || data.imageFile , {
    message: "Either image Url or image File must be Provided",
    path:['imageFile'],
    });

type restaurantFormData = z.infer<typeof formSchema>

type Props = {
    restaurant?: Restaurant;
    onSave: (restaurantFormData:FormData) => void;
    isLoading: boolean;
}

function ManageRestaurantForm({ restaurant, onSave, isLoading }: Props) {
    const form = useForm<restaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            cuisines: [],
            menuItems: [{name:"", price: 0}]
        },
    });

    const onSubmit = (FormDataJson:restaurantFormData) => {
        // convert formdatajson to a new FormData object
        const formData = new FormData();

        formData.append("restaurantName", FormDataJson.restaurantName);
        formData.append("city", FormDataJson.city);
        formData.append("country", FormDataJson.country);
        formData.append("deliveryPrice", FormDataJson.deliveryPrice.toString());
        formData.append("estimatedDeliveryTime", FormDataJson.estimatedDeliveryTime.toString());
        FormDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine);
        });
        FormDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name);
            formData.append(`menuItems[${index}][price]`, menuItem.price.toString());
        });
        formData.append('imageFile',FormDataJson.imageFile);

        onSave(formData);
    } ;

    useEffect(() => {

        if(!restaurant){
            return;
        }

        const deliveryPriceFormatted = parseInt(restaurant.deliveryPrice);
        const menuItemsFormatted = restaurant.menuItems;

        const updatedRestaurant = {
            ...restaurant,
            deliveryPrice : deliveryPriceFormatted,
            menuItems: menuItemsFormatted, 
        };

        form.reset(updatedRestaurant);

    },[form, restaurant])

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-10 space-y-8 rounded-lg bg-gray-50">
            <DetailsSection/>
            <Separator />
            <CuisineSection/>
            <Separator/>
            <MenuSection/>
            <Separator/>
            <ImageSection/>
            {isLoading ? <LoadingButton/> : <Button type="submit">Submit</Button>}
        </form>
    </Form>
  )
}

export default ManageRestaurantForm;