import { RouterProvider, createMemoryRouter, createHashRouter } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Enquiry from "./pages/Enquiry";
import EnquiryStatus from "./pages/EnquiryStatus";
import TestDrive from "./pages/TestDrive";
import Booking from "./pages/Booking";
import BillingRequest from "./pages/BillingRequest";
import Demo from "./pages/Demo";
import CustomerInfo from "./pages/CustomerInfo";

const router = createMemoryRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Home />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/enquiry",
        element: <Enquiry />,
        children: [],
      },
      {
        path: "/enquiry-status",
        element: <EnquiryStatus />,
        children: [],
      },
      {
        path: "/test-drive",
        element: <TestDrive />,
        children: [],
      },
      {
        path: "/booking",
        element: <Booking />,
        children: [],
      },
      {
        path: "/billing-request",
        element: <BillingRequest />,
      },
      {
        path: "/customer-info",
        element: <CustomerInfo />,
        children: [],
      },
    ],
  },
  {},
]);

function App() {

  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
