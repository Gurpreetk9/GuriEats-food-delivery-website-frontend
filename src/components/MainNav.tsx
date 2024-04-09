import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";

function MainNav() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <Link to="/order-status" className="font-bold hover:text-seeGreen">
            Order Status
          </Link>
          <UserMenu />
        </>
      ) : (
        <Button
          variant="ghost"
          className="text-lg font-bold hover:text-seeGreen hover:bg-white"
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </span>
  );
}
export default MainNav;
