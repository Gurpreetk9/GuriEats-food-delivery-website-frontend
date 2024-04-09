import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { Order } from "@/Types";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

export function useGetMyOrders() {
  const { getAccessTokenSilently } = useAuth0();

  async function getMyOrdersRequest(): Promise<Order[]> {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get orders");
    }

    return response.json();
  }

  const { data: orders, isLoading } = useQuery(
    "fetchMyOrder",
    getMyOrdersRequest,
    {
      refetchInterval: 5000,
    }
  );

  return { orders, isLoading };
}

export function useCreateCheckoutSession() {
  const { getAccessTokenSilently } = useAuth0();

  async function createCheckoutSessionRequest(
    checkoutSessionRequest: CheckoutSessionRequest
  ) {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response) {
      throw new Error("Unable to create checkout session");
    }

    return response.json();
  }

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest);

  if (error) {
    toast.error(error);
    reset();
  }

  return { createCheckoutSession, isLoading };
}
