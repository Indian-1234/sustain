import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-green-700 via-teal-600 to-blue-800 h-14 flex items-center justify-between px-4 shadow-gray-400 fixed top-0 left-0 w-full z-50">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <div className="bg-white rounded-full h-9 w-9 flex items-center justify-center">
          <img
            src="https://via.placeholder.com/36"
            alt="Sustaiabyte Logo"
            className="h-7 w-7 object-contain"
          />
        </div>
        <div>
          <span className="text-white font-semibold text-lg">Sustaiabyte</span>
          <span className="text-gray-200 text-sm block leading-none">
            Resource Management
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-8">
        {/* Notification Icon */}
        <div className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 7.165 7 8.97 7 11v3.159c0 .538-.214 1.055-.595 1.436L5 17h5m5 0a3 3 0 11-6 0m6 0H9"
            />
          </svg>
        </div>

        {/* Dropdown Section */}
        <div className="text-white text-sm">
          <select
            className="bg-transparent text-white outline-none cursor-pointer"
            defaultValue="Dashboard"
          >
            <option className="bg-green-700 text-white" value="Dashboard">
              Dashboard
            </option>
            <option className="bg-green-700 text-white" value="Reports">
              Reports
            </option>
            <option className="bg-green-700 text-white" value="Settings">
              Settings
            </option>
          </select>
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-2">
          <div className="bg-gray-300 rounded-full h-8 w-8"></div>
          <span className="text-white text-sm">My Profile</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
