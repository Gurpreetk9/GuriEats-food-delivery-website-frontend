export type userType = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

type menuItem = {
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

export type RestaurantResultType = {
  data: restaurantType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
