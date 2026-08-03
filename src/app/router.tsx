import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);