import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LiveTracking from "../pages/LiveTracking";
import Layout from "../layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "liveTracking",
        element: (
          <Layout>
            <LiveTracking />,
          </Layout>
        ),
      },
    ],
  },
]);

export default router;
