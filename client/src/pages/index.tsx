import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import Modal from "../components/Modal";
import { BASE_CONTAINER_CLASSES } from "../global/constants";

export const privateRouter = createBrowserRouter([
  {
    element: (
      <div className={BASE_CONTAINER_CLASSES}>
        <Outlet />
        <Modal />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
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
