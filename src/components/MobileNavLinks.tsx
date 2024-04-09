import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function MobileNavLinks() {
  const { logout } = useAuth0();
  return (
    <>
      <Link
        to="/order-status"
        className="flex bg-white items-center text-lg font-bold hover:text-seeGreen"
      >
        Order Status
      </Link>
      <Link
        to="/manage-restaurant"
        className="flex bg-white items-center text-lg font-bold hover:text-seeGreen"
      >
        Manage-Reataurant
      </Link>
      <Link
        to="/user-profile"
        className="flex bg-white items-center text-lg font-bold hover:text-seeGreen"
      >
        User-Profile
      </Link>

      <Button
        onClick={() => logout()}
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Log Out
      </Button>
    </>
  );
}
export default MobileNavLinks;
