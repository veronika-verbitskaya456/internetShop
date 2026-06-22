import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isAuthenticated = !!accessToken;

  if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};

export default PublicRoute;