import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import Layout from "./Layouts/Layout";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import HomePage from "./pages/HomePage";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import UserProfilePage from "./pages/UserProfilePage";
function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout ishero>
            <HomePage />
          </Layout>
        }
      ></Route>
      <Route path="/auth-callback" element={<AuthCallbackPage />}></Route>
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        ></Route>
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        ></Route>
      </Route>

      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
}

export default AppRoutes;
