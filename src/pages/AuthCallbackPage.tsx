import { useCreateMyUser } from "@/api/myUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function AuthCallbackPage() {
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();
  const navigate = useNavigate();

  const userCreated = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && !userCreated.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      userCreated.current = true;
    }

    navigate("/");
  }, [createUser, user, userCreated]);

  return <>Loading....</>;
}

export default AuthCallbackPage;
