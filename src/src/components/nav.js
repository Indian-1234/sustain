// Navbar.js
import React, { useState } from 'react';
import { FaArrowRightToBracket } from 'react-icons/fa6';
import icon from '../assets/submark.webp'; // Replace with the actual image path in your React setup

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Manage dropdown toggle state

  const handleLogout = () => {
    // Clear user-related data from localStorage
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('empId');

    // Optionally, remove cookies if you're using them
    // Cookies.remove("auth");
    // Cookies.remove("token");
    // Cookies.remove("role");
    // Cookies.remove("empId");

    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <nav className="bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#374151] h-20 py-4 flex items-center justify-between px-6 shadow-lg fixed top-0 left-0 w-full z-50 border-b border-gray-500">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <div className=" rounded-full h-12 w-12 flex items-center justify-center">
          <img
            src={icon}
            alt="Sustaiabyte Logo"
            className="h-10 w-10 object-contain"
          />
        </div>
        <div>
          <span className="text-white font-semibold text-xl">OPTIBYTE</span>
          <span className="text-gray-200 text-sm block leading-none">
            Energy Management
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
        <div className="relative text-white text-sm">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-transparent text-white outline-none cursor-pointer"
          >
            My Profile
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-40">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
