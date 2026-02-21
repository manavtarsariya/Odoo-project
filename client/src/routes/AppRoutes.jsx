import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/Registerpage";
import Loginpage from "../pages/Loginpage";
import Vehiclepage from "../pages/Vehiclepage";


const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <Loginpage />,
  },
   {
    path: "/vehicles",
    element: <Vehiclepage />,
  },
  
])

export default AppRoutes;