import { restaurantType } from "@/Types";
import { Dot } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type props = {
  restaurant: restaurantType;
};
function RestaurantInfo({ restaurant }: props) {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
          {restaurant.city},{restaurant.country}
        </CardDescription>
        <CardContent className="flex p-0 pt-4">
          {restaurant.cuisines.map((item, index) => {
            return (
              <span key={index} className="flex">
                <span>{item}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            );
          })}
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export default RestaurantInfo;
