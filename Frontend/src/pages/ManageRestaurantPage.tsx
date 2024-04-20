import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/myRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

function ManageRestaurantPage() {
  const { createRestaurant, isLoading: isCreateLoading} = useCreateMyRestaurant();
  const { restaurant, isLoading: isGetLoading} = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();

  const isEditing = !!restaurant;  // checking the restaurant is already created or not 

  if(isGetLoading) return <div>loading...</div>;

  return (
    <ManageRestaurantForm 
      onSave={isEditing ? updateRestaurant : createRestaurant}  // if already restaurant is created then updateRestaurant is passed otherwise createRestaurant
      isLoading={isCreateLoading || isUpdateLoading} 
      restaurant={restaurant} 
    />
  )
}

export default ManageRestaurantPage;