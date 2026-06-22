import { useSelector } from "react-redux"
import type { RootState } from "../../store/store"
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isAuth = !!accessToken;

  if (!isAuth) {
    return <Navigate to='/signin' replace />
  };

  return <Outlet />
};

export default PrivateRoute;