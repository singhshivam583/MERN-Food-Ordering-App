import { CircleUserRound } from "lucide-react";
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

function UsernameMenu() {
  const { user, logout } = useAuth0();
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 px-3 font-bold hover:text-orange-500">
            <CircleUserRound className="text-orange-500"/>
            {user?.email}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem className="m-2">
                <Link to={'/user-profile'} className="font-bold hover:text-orange-500">
                    User Profile
                </Link>
            </DropdownMenuItem>
            <Separator/>
            <DropdownMenuItem>
                <Button
                    // variant={} 
                    className="flex flex-1 font-bold bg-orange-500" 
                    onClick={() => logout()} 
                >
                    Log Out
                </Button>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UsernameMenu;