import UsernameMenu from '../UsernameMenu';
import { Button } from '../ui/button'
import { useAuth0 } from '@auth0/auth0-react'

function MainNav() {

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span className='flex items-center space-x-2'>
      {
        isAuthenticated ? ( 
          <UsernameMenu/> 
        ) : (
          <Button 
            variant={"ghost"}
            className="font-bold hover:text-orange-500 hover:bg-white"
            onClick={async() => await loginWithRedirect()}
          >
            Log In
          </Button>
        )
      }
    </span>
  )
}

export default MainNav;