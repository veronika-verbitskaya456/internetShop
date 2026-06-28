import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Navigate, Outlet } from "react-router-dom";
import { Routes } from "../../routes";

const PublicRoute = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isAuthenticated = !!accessToken;

  if (isAuthenticated) {
    return <Navigate to={Routes.MAIN} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;