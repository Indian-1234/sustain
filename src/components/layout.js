// Layout.js
import React from "react";
import Sidebar from "./CustomSidebar.tsx";
import Navbar from "./nav.js";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="mb-10 shadow-gray-400">
      <Navbar/>
      </div>
    <div className="relative flex min-h-screen bg-gray-900 text-white">
      <div className=" w-16 fixed top-0 left-0 z-50">
        <Sidebar />
      </div>
        {children} 
    </div>
    </div>
  );
};

export default Layout;
