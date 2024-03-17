import { useGetMyUser, useUpdateMyUser } from "@/api/myUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm"

function UserProfilePage() {
    const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();
    const { currentUser, isLoading: isGetLoading } = useGetMyUser();

    if(isGetLoading){
        return <span>Loading...</span>;
    }

    if(!currentUser){
        return <span> Unable to load user profile</span>
    }
    // console.log(currentUser)
  return (
    <UserProfileForm 
        currentUser={currentUser}
        onSave={updateUser} 
        isLoading={isUpdateLoading} 
    />
  )
}
export default UserProfilePage;