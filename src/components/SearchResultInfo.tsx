import { Link } from "react-router-dom";

type props = {
  total: number;
  city: string;
};

function SearchResultInfo({ total, city }: props) {
  return (
    <div className="text-xl font-bold flex flex-col lg:flex-row gap-3 justify-between lg:item-center">
      <span>
        {total} Restaurants found in {city}
        <Link
          to="/"
          className="ml-2 text-sm font-semibold cursor-pointer underline text-blue-500"
        >
          Change Location
        </Link>
      </span>
    </div>
  );
}
export default SearchResultInfo;
