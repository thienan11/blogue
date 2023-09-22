import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const customRedirectUri = "http://localhost:3000/"

  return (
    !isAuthenticated && (
      <button className="button-4" onClick={() => loginWithRedirect()}>
        Log In
      </button>
    )
  )
  
};

export default LoginButton;