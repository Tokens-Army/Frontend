import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home, { serviceLoader } from "../pages/home/Home";
import Notfound from "../pages/Notfound/Notfound";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Cart from "../pages/Cart/Cart";
import Accessories, {
  accessoriesLoader,
} from "../pages/Accessories/Accessories";
import ScheduleOrder from "../pages/ScheduleOrder/ScheduleOrder";
import About from "../pages/About/About";
import ContactUs from "../pages/ContactUs/Contactus";
import Adminhome from "../pages/Admin/Adminhome/Adminhome";
import Addadmins from "../pages/Admin/Addadmins/Addadmins";
import Deleteadmins from "../pages/Admin/Deleteadmins/Deleteadmins";
import Addaccessories from "../pages/Admin/Addaccessories/Addaccessories";
import Addservices from "../pages/Admin/Addservices/Addservices";
import Orders from "../pages/Admin/Orders/Orders";
import Addemployeestoorders from "../pages/Admin/Addemployeestoorders/Addemployeestoorders";
import Mainadmincomponent from "../pages/Admin/Mainadmincomponent/Mainadmincomponent";
import AdminMessage from "../pages/Admin/Customer_service/AdminMessage";
import AboutAdmin from "../pages/Admin/Aboutadmin/AboutAdmin";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: serviceLoader,
      },
      {
        path: "accessories",
        element: <Accessories />,
        loader: accessoriesLoader,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "scheduleorder",
        element: <ScheduleOrder />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: <Adminhome />,
    children: [
      {
        path: "addadmins",
        element: <Addadmins />,
      },
      {
        path: "deleteadmins",
        element: <Deleteadmins />,
      },
      {
        path: "addservices",
        element: <Addservices />,
      },
      {
        path: "addaccessories",
        element: <Addaccessories />,
      },
      {
        path: "ordersAdmin",
        element: <Orders />,
      },
      {
        path: "employeesadmin",
        element: <Addemployeestoorders />,
      },
      {
        path: "main",
        element: <Mainadmincomponent />,
      },
      {
        path: "customer_service",
        element: <AdminMessage />,
      },
      {
        path: "about",
        element: <AboutAdmin />,
      },
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);
