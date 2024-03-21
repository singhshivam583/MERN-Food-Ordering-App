import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import CuisineSection from "./CuisineSection";
import { Separator } from "@/components/ui/separator";

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
    imagefile: z.instanceof(File, {
        message: 'image file is required'
    }),
});

type restaurantFormData = z.infer<typeof formSchema>

type Props = {
    onSave: (restaurantFormData:FormData) => void;
    isLoading: boolean;
}

function ManageRestaurantForm({onSave, isLoading}: Props) {
    const form = useForm<restaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            cuisines: [],
            menuItems: [{name:"", price: 0}]
        },
    });

    const onSubmit = (FormDataJson:restaurantFormData) => {
        // convert formdatajson to a new FormData object

    } 

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-10 space-y-8 rounded-lg bg-gray-50">
            <DetailsSection/>
            <Separator />
            <CuisineSection/>
        </form>
    </Form>
  )
}

export default ManageRestaurantForm;