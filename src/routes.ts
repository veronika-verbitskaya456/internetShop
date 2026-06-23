// routes.tsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
// import ProfilePage from './pages/ProfilePage/ProfilePage';

import { lazy } from "react";
import PrivateRoute from "./components/Routes/PrivateRoute";
import PublicRoute from "./components/Routes/PublicRoute";

const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const Page404 = lazy(() => import("./pages/404Page/Page404"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage/RegistrationPage"));

export enum Routes {
  MAIN = "/",
  SIGN_IN = "/signin",
  SIGN_UP = "/signup",
  PROFILE = "/profile",
  NOT_FOUND = "*",
  REGISTRATION = "/registration",
}

export const router = createBrowserRouter([
  {
    path: Routes.MAIN,
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: MainPage,
      },
      {
        Component: PrivateRoute,
        // children: [
        //   {
        //     path: Routes.PROFILE,
        //     Component: ProfilePage,
        //   },
        // ],
      },
      {
        Component: PublicRoute,
        children: [
          {
            path: Routes.SIGN_IN,
            Component: SignInPage,
          },
          {
            path: Routes.REGISTRATION,
            Component: RegistrationPage,
          },
        ],
      },
      {
        path: Routes.NOT_FOUND,
        Component: Page404,
      },
    ],
  },
]);

export default router;
