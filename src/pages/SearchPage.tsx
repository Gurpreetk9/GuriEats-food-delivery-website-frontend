import { useSearchRestaurant } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBox, { SearchData } from "@/components/SearchBox";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCusines: string[];
  sortOption: string;
};
function Searchpage() {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCusines: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const { searchResult, isLoading } = useSearchRestaurant(searchState, city);

  function setSortOption(sortOption: string) {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  }

  function setSelectedCuisines(selectedCusines: string[]) {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCusines,
      page: 1,
    }));
  }

  function setPage(page: number) {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  }
  function setSearchQuery(searchFormData: SearchData) {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  }

  function searchReset() {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  }
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (!searchResult?.data || !city) {
    return <span>No results found</span>;
  }

  return (
    <div className="grid grid-col-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisine-list">
        <CuisineFilter
          onChange={setSelectedCuisines}
          seletedCuisines={searchState.selectedCusines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBox
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeholder="Search by cuisine or restaurant name"
          onReset={searchReset}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo city={city} total={searchResult.pagination.total} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>
        {searchResult.data.map((restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={searchResult.pagination.page}
          pages={searchResult.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
export default Searchpage;
