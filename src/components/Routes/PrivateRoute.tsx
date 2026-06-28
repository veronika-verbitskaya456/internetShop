import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import { Navigate, Outlet } from "react-router-dom";
import { Routes } from "../../routes";

const PrivateRoute = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isAuth = !!accessToken;

  if (!isAuth) {
    return <Navigate to={Routes.SIGN_IN} replace />
  };

  return <Outlet />
};

export default PrivateRoute;