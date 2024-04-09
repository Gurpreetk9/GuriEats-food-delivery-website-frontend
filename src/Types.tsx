export type userType = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type menuItem = {
  _id: string;
  name: string;
  price: number;
};
export type restaurantType = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: menuItem[];
  imageUrl: string;
  lastUpdated: string;
};
export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type Order = {
  _id: string;
  restaurant: restaurantType;
  user: userType;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    name: string;
    addressLine1: string;
    city: string;
    email: string;
  };
  totalAmount: number;
  createdAt: string;
  restaurantId: string;
  status: OrderStatus;
};
export type RestaurantResultType = {
  data: restaurantType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
