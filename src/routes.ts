import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const RegistrationPage = lazy(
  () => import("./pages/RegistrationPage/RegistrationPage"),
);
const CartProductsPage = lazy(
  () => import("./pages/CartProductsPage/CartProductsPage"),
);

const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const Page404 = lazy(() => import("./pages/404Page/Page404"));

const PrivateRoute = lazy(() => import("./components/Routes/PrivateRoute"));
const PublicRoute = lazy(() => import("./components/Routes/PublicRoute"));
const FavoriteProductsPage = lazy(
  () => import("./pages/FavoriteProductsPage/FavoriteProductsPage"),
);
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const OrdersPage = lazy(() => import("./pages/OrdersPage/OrdersPage"));
const ProductPage = lazy(() => import("./pages/ProductPage/ProductPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage/CategoryPage"));


export enum Routes {
  MAIN = "/",
  SIGN_IN = "/signin",
  SIGN_UP = "/signup",
  PROFILE = "/profile",
  FAVORITES = "/favorites",
  NOT_FOUND = "*",
  REGISTRATION = "/registration",
  CART = "/cart",
  ORDERS = "/orders",
  PRODUCT = "products/:id",
  CATEGORY = "categories/:slug",
}

export const getProductPath = (id: number) => `/products/${id}`;
export const getCategoryPath = (slug: string) => `/categories/${slug}`;

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

export const router = createBrowserRouter(
[
  {
    path: Routes.MAIN,
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: MainPage,
      },
      {
        path: Routes.PRODUCT,
        Component: ProductPage,
      },
      {
        path: Routes.CATEGORY,
        Component: CategoryPage,
      },
      {
        Component: PrivateRoute,
        children: [
          {
            path: Routes.FAVORITES,
            Component: FavoriteProductsPage,
          },
          {
            path: Routes.CART,
            Component: CartProductsPage,
          },
          {
            path: Routes.ORDERS,
            Component: OrdersPage,
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
],
{ basename: basename || undefined },
);

export default router;
