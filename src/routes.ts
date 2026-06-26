import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const Page404 = lazy(() => import("./pages/404Page/Page404"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage/RegistrationPage"));
const PrivateRoute = lazy(() => import("./components/Routes/PrivateRoute"));
const PublicRoute = lazy(() => import("./components/Routes/PublicRoute"));
const FavoriteProductsPage = lazy(() => import("./pages/FavoriteProductsPage/FavoriteProductsPage"));
const MainLayout = lazy(() => import("./layouts/MainLayout"));

export enum Routes {
  MAIN = "/",
  SIGN_IN = "/signin",
  SIGN_UP = "/signup",
  PROFILE = "/profile",
  FAVORITES = "/favorites",
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
        children: [
          {
            path: Routes.FAVORITES,
            Component: FavoriteProductsPage,
          },
        ],
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
