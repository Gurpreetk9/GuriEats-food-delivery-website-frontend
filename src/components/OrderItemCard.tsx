import { useUpdateMyRestaurantOrder } from "@/api/myRestaurantApi";
import { ORDER_STATUS } from "@/config/order-status-config";
import { Order, OrderStatus } from "@/Types";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";

type props = {
  order: Order;
};

function OrderItemCard({ order }: props) {
  const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder();
  const [status, setStatus] = useState<OrderStatus>(order.status);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  async function handleStatusChange(newStatus: OrderStatus) {
    await updateRestaurantStatus({
      orderId: order._id as string,
      status: newStatus,
    });
    setStatus(newStatus);
  }

  function getTime() {
    const created = new Date(order.createdAt);

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3 text-lg">
          <div>
            Customer Name:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            Delivery Address:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1},{order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div>
            Total:
            <span className="ml-2 font-normal">
              ₹{(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            {order.cartItems.map((item) => {
              return (
                <span>
                  <Badge variant="outline" className="mr-2">
                    {item.quantity}
                  </Badge>
                  {item.name}
                </span>
              );
            })}
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="status">What is the status of the order</Label>
            <Select
              disabled={isLoading}
              onValueChange={(value) =>
                handleStatusChange(value as OrderStatus)
              }
              value={status}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent position="popper">
                {ORDER_STATUS.map((status) => (
                  <SelectItem value={status.value}>{status.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderItemCard;
