// Layout.js
import React from "react";
import Sidebar from "./CustomSidebar.tsx";
import Navbar from "./nav.js";

const Layout = ({ children }) => {
  return (
    <div className="">
      <div className="mb-10 shadow-gray-400">
      <Navbar/>
      </div>
    <div className=" text-white">
      <div className=" w-16 fixed top-0 left-0 z-50">
        <Sidebar />
      </div>
      <div>
        {children} 
        </div>
    </div>
    </div>
  );
};

export default Layout;
