import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
        <main
          className={`flex w-full flex-col bg-gray-50 transition-all duration-300 ${
            sidebarCollapsed ? "md:pl-16" : "md:pl-64"
          }`}
        >
          <Navbar />
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
