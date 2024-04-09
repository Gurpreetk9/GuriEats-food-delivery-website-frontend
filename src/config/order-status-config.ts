import { OrderStatus } from "@/Types";

export type OrderStatusInfo = {
  label: string;
  value: OrderStatus;
  progressValue: number;
};
export const ORDER_STATUS: OrderStatusInfo[] = [
  { label: "placed", value: "placed", progressValue: 0 },
  {
    label: "Awaiting Restaurant Conformation",
    value: "paid",
    progressValue: 25,
  },
  { label: "In Progress", value: "inProgress", progressValue: 50 },
  { label: "Out For Delivery", value: "outForDelivery", progressValue: 75 },
  { label: "Delivered", value: "delivered", progressValue: 100 },
];
