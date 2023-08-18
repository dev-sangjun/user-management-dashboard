import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import SignIn from "./SignIn";

const BASE_CONTAINER_CLASSES =
  "flex justify-center h-screen max-w-[1440px] mx-auto bg-base-100 md:min-w-[1080px]";

export const privateRouter = createBrowserRouter([
  {
    element: (
      <div className={BASE_CONTAINER_CLASSES}>
        <Outlet />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <div>private router</div>,
      },
    ],
  },
  
]);

export const publicRouter = createBrowserRouter([
  {
    element: (
      <div className={BASE_CONTAINER_CLASSES}>
        <Outlet />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <SignIn />,
      },
      {
        path: "*",
        element: <Navigate replace to="/" />,
      },
    ],
  },
]);
