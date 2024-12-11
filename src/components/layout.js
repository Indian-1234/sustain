// Layout.js
import React from "react";
import Sidebar from "./CustomSidebar.tsx";

const Layout = ({ children }) => {
  return (
    <div className="relative flex min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 h-screen w-16 fixed top-0 left-0 z-50">
        <Sidebar />
      </div>
        {children} 
    </div>
  );
};

export default Layout;
