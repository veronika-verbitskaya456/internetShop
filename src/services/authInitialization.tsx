import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { AppDispatch, RootState } from "../store/store";
import { authApi } from "./authApi";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const refreshToken = Cookies.get("refreshToken");

    if (!refreshToken?.trim()) {
      return;
    }

    dispatch(authApi.endpoints.getUserProfile.initiate(undefined));
  }, [dispatch, accessToken]);

  return <>{children}</>;
};

export default AuthInitializer;
