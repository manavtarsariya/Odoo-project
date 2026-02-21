import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/layout/Mainlayout";

import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/Registerpage";
import Loginpage from "../pages/Loginpage";
import Vehiclepage from "../pages/Vehiclepage";
import Driverpage from "../pages/Driverpage";

const AppRoutes = createBrowserRouter([
  
  // Public Routes (No Sidebar)
  {
    path: "/login",
    element: <Loginpage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

  // Layout Routes (With Sidebar + Footer)
  {
    element: <MainLayout />, // Wrapper
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/vehicles",
        element: <Vehiclepage />,
      },
        {
        path: "/drivers",
        element: <Driverpage />,
      },
    ],
  },
]);

export default AppRoutes;