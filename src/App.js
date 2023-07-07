import { RouterProvider, createMemoryRouter } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Enquiry from "./pages/Enquiry";
import TestDrive from "./pages/TestDrive";
import EnquiryStatus from "./pages/EnquiryStatus";

const router = createMemoryRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
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
    ],
  },
  {},
]);

function App() {

  return (
    <div className="container">
      <RouterProvider router={router}></RouterProvider>
      {/* <PanelList />
      <TreeGraph /> */}
    </div>
  );
}

export default App;
