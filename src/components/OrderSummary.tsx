import { CartItem } from "@/pages/DetailPage";
import { restaurantType } from "@/Types";
import { Trash } from "lucide-react";
import { Badge } from "./ui/badge";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

type props = {
  restaurant: restaurantType;
  cartItems: CartItem[];
  removeCartItem: (cartItem: CartItem) => void;
};
function OrderSummary({ restaurant, cartItems, removeCartItem }: props) {
  function getTotalPrice() {
    const total = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalPrice = total + restaurant.deliveryPrice;

    return (totalPrice / 10).toFixed(2);
  }
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>₹{getTotalPrice()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => {
          return (
            <div className="flex justify-between">
              <span>
                <Badge variant="outline" className="mr-2">
                  {item.quantity}
                </Badge>
                {item.name}
              </span>
              <span className="flex item-center gap-1">
                <Trash
                  color="red"
                  className="cursor-pointer"
                  size={20}
                  onClick={() => removeCartItem(item)}
                />
                ₹{((item.price * item.quantity) / 10).toFixed(2)}
              </span>
            </div>
          );
        })}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery Price</span>
          <span>₹{(restaurant.deliveryPrice / 10).toFixed(2)}</span>
        </div>
      </CardContent>
    </>
  );
}

export default OrderSummary;
