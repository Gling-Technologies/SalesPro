import { RouterProvider, createMemoryRouter } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Enquiry from "./pages/Enquiry";
import TestDrive from "./pages/TestDrive";
import EnquiryStatus from "./pages/EnquiryStatus";
import Demo from "./pages/Demo";

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
        path: "/demo",
        element: <Demo />,
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
