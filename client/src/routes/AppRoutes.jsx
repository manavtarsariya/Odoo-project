import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "../components/layout/Mainlayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";

import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/Registerpage";
import Loginpage from "../pages/Loginpage";
import Vehiclepage from "../pages/Vehiclepage";
import Driverpage from "../pages/Driverpage";
import TripManager from "../pages/Tripdispatch";
import AnalyticsPage from "../pages/AnalyticsPage";

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
    element: <ProtectedRoute />, // Basic Auth Guard for the whole layout
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          // Role-specific guards
          {
            element: <ProtectedRoute allowedRoles={["MANAGER"]} />,
            children: [{ path: "/vehicles", element: <Vehiclepage /> }]
          },
          {
            element: <ProtectedRoute allowedRoles={["MANAGER", "SAFETY_OFFICER", "DISPATCHER"]} />,
            children: [{ path: "/drivers", element: <Driverpage /> }]
          },
          {
            element: <ProtectedRoute allowedRoles={["DISPATCHER", "MANAGER"]} />,
            children: [{ path: "/trips", element: <TripManager /> }]
          },
          {
            element: <ProtectedRoute allowedRoles={["FINANCE", "MANAGER"]} />,
            children: [{ path: "/analytics", element: <AnalyticsPage /> }]
          },
        ],
      },
    ],
  },

  // Redirect all unknown routes to /
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default AppRoutes;