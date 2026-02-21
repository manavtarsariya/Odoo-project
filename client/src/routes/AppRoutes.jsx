import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/Registerpage";
import Loginpage from "../pages/Loginpage";


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
])

export default AppRoutes;