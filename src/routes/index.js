import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LiveTracking from "../pages/LiveTracking";
import Layout from "../layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
    children: [
      {
        path: "liveTracking",
        element: <LiveTracking />,
      },
    ],
  },
]);

export default router;
