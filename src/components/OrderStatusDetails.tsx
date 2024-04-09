import { Order } from "@/Types";
import { Separator } from "./ui/separator";

type props = {
  order: Order;
};

function OrderStatusDetails({ order }: props) {
  return (
    <div className="space-y-2">
      <div className="flex flex-col">
        <span className="font-bold">Delivered to:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>
          {order.deliveryDetails.addressLine1},{order.deliveryDetails.city}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Your Order</span>
        <ul>
          {order.cartItems.map((item) => {
            return (
              <li>
                {item.quantity} x {item.name}
              </li>
            );
          })}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold">Total</span>
        <span>₹{(order.totalAmount / 100).toFixed(2)}</span>
      </div>
    </div>
  );
}
export default OrderStatusDetails;
