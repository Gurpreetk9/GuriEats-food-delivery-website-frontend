import {
  useCreateMyRestaurant,
  useGetMyReataurant,
  useUpdateMyRestaurant,
} from "@/api/myRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

function ManageRestaurantPage() {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyReataurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  const isExist = !!restaurant;
  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={isExist ? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
    />
  );
}

export default ManageRestaurantPage;
