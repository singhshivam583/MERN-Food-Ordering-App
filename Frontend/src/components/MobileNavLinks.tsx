import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react";

function MobileNavLinks() {
    const { logout } = useAuth0();

  return (
    <>
        <Link 
            className="flex items-center font-bold bg-white hover:text-orange-500"
            to={"/user-profile"}
        >
            User Profile
        </Link>
        <Button 
            className="flex flex-1 font-bold bg-orange-500"
            onClick={async() => await logout()}
        >
            Log Out
        </Button>
    </>
  )
}

export default MobileNavLinks;