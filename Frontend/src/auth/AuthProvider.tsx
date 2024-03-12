import { Auth0Provider, User, AppState } from "@auth0/auth0-react";

type Props = {
    children: React.ReactNode;
};

const AuthProvider = ({children}: Props) => {
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const client = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

    if(!domain || !client || !redirectUri) {
        throw new Error("Missing required environment variables");
    }

    const onRedirectCallback = (appState?: AppState, user?: User) => {
        console.log("USER", user)
    }

    return (
        <Auth0Provider 
            domain={domain} 
            clientId={client}
            authorizationParams={{redirect_uri:redirectUri,}}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    )
}

export default AuthProvider;