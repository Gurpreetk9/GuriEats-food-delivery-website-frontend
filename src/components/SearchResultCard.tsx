import { restaurantType } from "@/Types";
import { Banknote, Clock, Dot } from "lucide-react";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";

type props = {
  restaurant: restaurantType;
};
function SearchResultCard({ restaurant }: props) {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          className="rounded-md h-full w-full object-cover"
          src={restaurant.imageUrl}
        />
      </AspectRatio>
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>
        <div id="card-content" className="grid lg:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisines.map((cuisine, index) => (
              <span key={index} className="flex">
                <span>{cuisine}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="text-green-600" />
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-1">
              <Banknote />
              Delivery from ₹ {restaurant.deliveryPrice.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SearchResultCard;
