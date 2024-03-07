import { userType } from "@/Types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

type createUserRequest = {
  auth0Id: string;
  email: string;
};

export function useGetMyUser() {
  const { getAccessTokenSilently } = useAuth0();

  async function getMyUserRequest(): Promise<userType> {
    const token = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/type",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user");
    }
    return response.json();
  }

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest);

  if (error) {
    toast.error(error.toString());
  }
  return { currentUser, isLoading };
}
export function useCreateMyUser() {
  const { getAccessTokenSilently } = useAuth0();

  async function createMyUserRequest(user: createUserRequest) {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create User");
    }
  }

  const {
    mutateAsync: createUser,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return { createUser, isError, isLoading, isSuccess };
}

type updateUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};
export function useUpdateMyUser() {
  const { getAccessTokenSilently } = useAuth0();

  async function updateMyUserRequest(formData: updateUserRequest) {
    const token = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  }

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  if (isSuccess) {
    toast.success("User profile updated!");
  }
  if (error) {
    toast.error(error);
    reset();
  }

  return { updateUser, isLoading };
}
