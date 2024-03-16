import { Auth0Provider, User, AppState } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
};

const AuthProvider = ({children}: Props) => {

    // const { createUser } = useCreateMyUser();
    const navigate = useNavigate()

    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const client = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    if(!domain || !client || !redirectUri || !audience) {
        throw new Error("Missing required environment variables");
    }

    const onRedirectCallback = async (appState?: AppState, user?: User) => {
        // console.log("USER", user)
        // if(user?.sub && user?.email){
        //     createUser({auth0Id: user.sub, email:user.email})
        // }
        navigate("/auth-callback");
    }

    return (
        <Auth0Provider 
            domain={domain} 
            clientId={client}
            authorizationParams={{
                redirect_uri:redirectUri, 
                audience,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    )
}

export default AuthProvider;