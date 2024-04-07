import { useGetMyUser } from "@/api/myUserApi";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import LoadingButton from "./LoadingButton";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

type props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};
function CheckoutButton({ onCheckout, disabled, isLoading }: props) {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  async function toLogin() {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  }

  if (!isAuthenticated) {
    return (
      <Button onClick={toLogin} className="bg-seeGreen flex-1">
        Log in to checkout
      </Button>
    );
  }

  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-seeGreen flex-1">
          Go to Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] ">
        <UserProfileForm
          currentUser={currentUser}
          isLoading={isGetUserLoading}
          onSave={onCheckout}
          title="Confirm Delivery Details"
          buttonTxt="Continue to Payment"
        />
      </DialogContent>
    </Dialog>
  );
}

export default CheckoutButton;
