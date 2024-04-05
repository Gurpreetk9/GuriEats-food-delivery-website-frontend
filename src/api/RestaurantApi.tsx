import { SearchState } from "@/pages/SearchPage";
import { RestaurantResultType } from "@/Types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

export function useSearchRestaurant(searchState: SearchState, city?: string) {
  async function createSearchRequest(): Promise<RestaurantResultType> {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCusines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response) {
      throw new Error("Failed to load restaurand!");
    }

    return response.json();
  }

  const { data: searchResult, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return { searchResult, isLoading };
}
