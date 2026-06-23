import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { authApi } from "./authApi";
import { AppDispatch } from "../store/store";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const refreshToken = Cookies.get("refreshToken");

      if (refreshToken) {
        try {
          await dispatch(authApi.endpoints.getUserProfile.initiate(undefined)).unwrap();
        } catch (error) {
          console.warn("Автоматический вход не удался:", error);
        }
      }
      setIsReady(true);
    };

    checkAuth();
  }, [dispatch]);

  if (isReady) {
      return <>{children}</>;
  }


};

export default AuthInitializer;