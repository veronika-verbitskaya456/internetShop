import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Routes } from "../routes";
import type { RootState } from "../store/store";

export const useRequireAuth = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const isAuth = !!accessToken;
  const navigate = useNavigate();

  const requireAuth = useCallback(
    (action: () => void) => {
      if (!isAuth) {
        navigate(Routes.SIGN_IN);
        return;
      }

      action();
    },
    [isAuth, navigate],
  );

  return { isAuth, requireAuth };
};
