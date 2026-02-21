import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";


const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
])

export default AppRoutes;