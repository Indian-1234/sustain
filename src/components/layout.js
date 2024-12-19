import React from 'react';
import Sidebar from './CustomSidebar.tsx';
import Navbar from './nav.js';

const Layout = ({ children }) => {
  return (
    <div className="h-screen overflow-hidden"> {/* Prevent overall page overflow */}
      {/* Navbar Section */}
      <div className="mb-10 shadow-gray-400">
        <Navbar />
      </div>

      <div className="flex h-full"> {/* Use flex layout for sidebar and content */}
        {/* Sidebar */}
        <div className="w-16 fixed  z-50"> {/* Adjusted margin-top to account for navbar */}
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="mt-10 mb-10  w-full  overflow-auto"> {/* Adjust margin-left to create space for the sidebar */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
