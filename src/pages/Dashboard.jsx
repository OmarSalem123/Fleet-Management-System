import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Dashboard;
