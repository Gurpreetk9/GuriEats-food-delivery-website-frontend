import { cuisineList } from "@/config/restaurant-options-config";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

type props = {
  seletedCuisines: string[];
  onChange: (cuisines: string[]) => void;
  isExpanded: boolean;
  onExpandedClick: () => void;
};
function CuisineFilter({
  seletedCuisines,
  onChange,
  isExpanded,
  onExpandedClick,
}: props) {
  function handleCuisineChange(event: ChangeEvent<HTMLInputElement>) {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;

    const newCuisineList = isChecked
      ? [...seletedCuisines, clickedCuisine]
      : seletedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisineList);
  }
  function handleCuisineReset() {
    onChange([]);
  }
  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Cuisine</div>
        <div
          onClick={handleCuisineReset}
          className="text-sm font-semibold mb-2 unserline cursor-pointer text-blue-500"
        >
          Reset Filter
        </div>
      </div>
      <div className="space-y-2 flex flex-col">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            const isSelected = seletedCuisines.includes(cuisine);
            return (
              <div className="flex">
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  value={cuisine}
                  checked={isSelected}
                  className="hidden"
                  onChange={handleCuisineChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}

        <Button
          variant="link"
          className="mt-4 flex-1"
          onClick={onExpandedClick}
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
}

export default CuisineFilter;
