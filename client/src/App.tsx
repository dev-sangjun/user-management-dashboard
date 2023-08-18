import { RouterProvider } from "react-router-dom";
import "./App.css";
import useFetchUser from "./hooks/useFetchUser";
import { privateRouter, publicRouter } from "./pages";

function App() {
  const { isFetched, isSignedIn } = useFetchUser();
  if (!isFetched) {
    return null;
  }
  return <RouterProvider router={isSignedIn ? privateRouter : publicRouter} />;
}

export default App;
