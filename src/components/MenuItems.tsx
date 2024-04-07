import { menuItem } from "@/Types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type props = {
  menuItem: menuItem;
  addToCart: () => void;
};
function MenuItems({ menuItem, addToCart }: props) {
  return (
    <Card onClick={addToCart} className="cursor-pointer">
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        ₹{(menuItem.price / 10).toFixed(2)}
      </CardContent>
    </Card>
  );
}

export default MenuItems;
