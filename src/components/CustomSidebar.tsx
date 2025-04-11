import React, { useState, useEffect, useRef } from "react";
import {
  FaCog,
  FaExclamationTriangle,
  FaFileAlt,
  FaPalette,
  FaUser,
  FaSun,
  FaHandPointer,
  FaLeaf,
  FaEllipsisV,
  FaTimes,
} from "react-icons/fa";
import { FaPlus, FaSort } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {  FaTint } from "react-icons/fa";
import { GiWaterRecycling } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

type PopupName = "alerts" | "design" | "users" | null;
type IconName = "cog" | "leaf" | "file" | "palette" | "user" | "sun" | "hand" | null;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const [activePopup, setActivePopup] = useState<PopupName>(null);
  const [activeIcon, setActiveIcon] = useState<IconName>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [systemTemplatesOpen, setSystemTemplatesOpen] = useState(false);
  const [assetsTemplateOpen, setAssetsTemplateOpen] = useState(false);
  const [networkTemplatesOpen, setNetworkTemplatesOpen] = useState(false);
  const [clientSpecificTemplatesOpen, setClientSpecificTemplatesOpen] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false); // Track visibility of the sidebar
  const location = useLocation(); // Get current route path
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null); // Track the selected plant

  // Reset all template states
  const resetTemplateStates = () => {
    setSystemTemplatesOpen(false);
    setAssetsTemplateOpen(false);
    setNetworkTemplatesOpen(false);
    setClientSpecificTemplatesOpen(false);
  };

  // Toggle popup visibility
  const togglePopup = (popupName: PopupName) => {
    setActivePopup((prev) => (prev === popupName ? null : popupName));
    setActiveIcon(null);
    setSidebarVisible(false)
    // Reset template states when closing design popup
    if (popupName !== "design") {
      resetTemplateStates();
    }
  };

  // Handle click for other icons
  const handleIconClick = (iconName: IconName) => {
    setActivePopup(null);
    setActiveIcon((prev) => (prev === iconName ? null : iconName));
    setSidebarVisible(false)
    // Close template popups when a new icon is clicked
    if (iconName !== "palette") {
      resetTemplateStates();
    }
    if ((location.pathname === "/" || location.pathname.startsWith("plant/")) && iconName === "cog") {
      setSidebarVisible((prev) => !prev);
    }

  };
  const handlePlantSelect = (plant: string) => {
    setSelectedPlant(plant);
    console.log(`Selected Plant: ${plant}`); // Log the selected plant to the console
  };
  // Handle template toggle logic
  const handleTemplateToggle = (templateName: string) => {
    switch (templateName) {
      case "systemTemplates":
        setSystemTemplatesOpen((prev) => !prev);
        setAssetsTemplateOpen(false);
        setNetworkTemplatesOpen(false);
        setClientSpecificTemplatesOpen(false);
        break;
      case "assetsTemplate":
        setAssetsTemplateOpen((prev) => !prev);
        setSystemTemplatesOpen(false);
        setNetworkTemplatesOpen(false);
        setClientSpecificTemplatesOpen(false);
        break;
      case "networkTemplates":
        setNetworkTemplatesOpen((prev) => !prev);
        setSystemTemplatesOpen(false);
        setAssetsTemplateOpen(false);
        setClientSpecificTemplatesOpen(false);
        break;
      case "clientSpecificTemplates":
        setClientSpecificTemplatesOpen((prev) => !prev);
        setSystemTemplatesOpen(false);
        setAssetsTemplateOpen(false);
        setNetworkTemplatesOpen(false);
        break;
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Check if the click is outside the sidebar
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        // Close all popups and reset active states
        setActivePopup(null);
        setActiveIcon(null);
        setSidebarVisible(false);

        // Reset all template states
        resetTemplateStates();
      }
    };

    // Add event listener to the document
    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const handleSidebarToggle = () => {
    setSidebarVisible((prev) => !prev);
  };
  const isNonNavigable =
    location.pathname === "/" || location.pathname.startsWith("/plant/");
  return (
    <div
      ref={sidebarRef}
      className="h-screen w-24 bg-gray-900 flex flex-col justify-between py-4 relative mt-10 border-t border-r border-gray-500 rounded-tr-3xl p-4"
    >
      {/* Top Section */}
      <div>
        {/* Header */}
        <div className="text-center mb-6">
          <div
            className={`flex flex-col items-center mb-4 ${activeIcon === "cog" ? "text-green-500" : "text-gray-500"
              } cursor-pointer`}
            onClick={() => handleIconClick("cog")}
          >
            <Link to="/" className="block"
            >
              <FaCog className="text-xl" />
            </Link>
            <p className="text-xs text-gray-400 mt-1">Operational</p>
          </div>
          {isSidebarVisible && (
            <div className="bg-[#081B33] text-white w-64 h-screen p-4 fixed top-0 right-0">
              {/* Title Section */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-lg font-semibold">Dashboard</h1>
                <FaSort className="text-gray-400 cursor-pointer mr-10" />
              </div>
              {/* Cancel Icon - Red color */}
              <div
                className="absolute top-4 right-4 text-red-500 cursor-pointer"
                onClick={handleSidebarToggle}
              >
                <FaTimes className="text-2xl" />
              </div>
              {/* Dashboard List */}
              <div className="space-y-4">
                {[
                  "Portfolio Summary",
                  "Mumbai Location",
                  "Banglore Location",
                  "London Location",
                  "Asset Insights",
                ].map((item, index) => (
                  <Link
                    to={
                      item === "Portfolio Summary"
                        ? "/": item === "Asset Insights"?"/plant/assets" // Redirect to specific path for Portfolio Summary
                        : `/plant/${item}` // Default path for other items
                    }
                    state={{ name: item }} // Pass the state separately
                    key={index}
                  >
                    <div
                      className={`flex items-center justify-between px-4 py-2 rounded-md mt-4 ${item === selectedPlant ? "bg-green-700" : "bg-blue-900"
                        } cursor-pointer hover:bg-green-400`}
                      onClick={() => handlePlantSelect(item)} // Handle item click
                    >
                      <span className="text-sm text-white">{item}</span>
                      {item === "Mumbai Location" && <FaEllipsisV className="text-gray-400" />}
                    </div>
                  </Link>
                ))}
              </div>


              {/* Add Dashboard Section */}
              <div className="mt-6">
                <button className="flex items-center justify-center gap-2 bg-blue-900 px-4 py-2 rounded-md hover:bg-blue-700 w-full">
                  <FaPlus />
                  <span className="text-sm">Add Dashboard</span>
                </button>
                <p className="text-xs text-center text-gray-400 mt-2">1 of 1</p>
              </div>
            </div>
          )}
          <div
            className={`flex flex-col items-center mb-4 ${activeIcon === "leaf" ? "text-green-500" : "text-gray-500"
              } cursor-pointer`}
            onClick={() => handleIconClick("leaf")}
          >
            <FaLeaf className="text-xl" />
            <p className="text-xs text-gray-400 mt-1">Sustainability</p>
          </div>

          <hr className="mt-4" />
        </div>

        {/* Menu Icons */}
        <div className="flex flex-col items-center gap-6 relative">
          {/* Alerts Icon with Popup */}
          <div className="relative">
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => togglePopup("alerts")}
            >
              <FaExclamationTriangle
                className={`text-xl ${activePopup === "alerts" ? "text-green-500" : "text-gray-500"
                  } hover:text-green-400`}
              />
              <p className="text-xs text-gray-400 mt-1">Alerts</p>
            </div>

            {activePopup === "alerts" && (
              <div
                className="absolute left-full top-0 bg-gray-800 text-white p-4 rounded shadow-lg w-56"
                style={{
                  transform: "translateX(10px)",
                  zIndex: 9999,
                  position: "absolute",
                }}
              >
                <h3 className="text-lg font-bold mb-2">Alerts</h3>
                <ul className="space-y-2">
                  <li className="hover:text-green-400 cursor-pointer">Summary</li>
                  <li className="hover:text-green-400 cursor-pointer">List</li>
                  <li className="hover:text-green-400 cursor-pointer">Trigger Logs</li>
                </ul>
                <button className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                  + Add New Alert
                </button>
              </div>
            )}
          </div>

          {/* Files Icon */}
          <div
            className={`flex flex-col items-center cursor-pointer ${activeIcon === "file" ? "text-green-500" : "text-gray-500"
              }`}
            onClick={() => handleIconClick("file")}
          >
            <FaFileAlt className="text-xl" />
            <p className="text-xs text-gray-400 mt-1">Report</p>
          </div>
          {activeIcon === "file" && (
            <div
              className="absolute left-full top-0 bg-gray-800 text-white p-4 rounded shadow-lg w-56"
              style={{
                transform: "translateX(10px)",
                zIndex: 9999,
                position: "absolute",
              }}
            >
              <h3 className="text-lg font-bold mb-2">Report</h3>
              <hr className="mb-2" />
              <ul className="space-y-2">
                <li>
                  <Link to="/report-list" className="hover:text-green-400 cursor-pointer">
                    Report List
                  </Link>
                </li>
                <li>
                  <Link to="/report-logs" className="hover:text-green-400 cursor-pointer">
                    Report Logs
                  </Link>
                </li>
              </ul>
              <button className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                + Add New Alert
              </button>
            </div>
          )}
          {/* Design Icon with Popup */}
          <div
            className={`flex flex-col items-center cursor-pointer ${activeIcon === "palette" ? "text-green-500" : "text-gray-500"
              }`}
            onClick={() => handleIconClick("palette")}
          >
            <FaPalette className="text-xl" />
            <p className="text-xs text-gray-400 mt-1">Design</p>
          </div>
          {activeIcon === "palette" && (
            <div
              className="absolute left-full top-0 bg-gray-800 text-white p-4 rounded shadow-lg w-56"
              style={{
                transform: "translateX(10px)",
                zIndex: 9999,
                position: "absolute",
              }}
            >
              <h3 className="text-lg font-bold mb-2">Design</h3>
              <ul className="space-y-2">
                <li>
                  <div
                    className="flex justify-between items-center hover:text-green-400 cursor-pointer"
                    onClick={() => handleTemplateToggle("systemTemplates")}
                  >
                    <span>System Templates</span>
                    <span>{systemTemplatesOpen ? "-" : "+"}</span>
                  </div>
                  {systemTemplatesOpen && (
                    <ul className="mt-2 ml-4 space-y-1">
                      <li className="hover:text-blue-400 cursor-pointer">Dashboard</li>
                      <li className="hover:text-blue-400 cursor-pointer">Calculated</li>
                      <li className="hover:text-blue-400 cursor-pointer">Demo</li>
                    </ul>
                  )}
                </li>
                <li>
                  <div
                    className="flex justify-between items-center hover:text-green-400 cursor-pointer"
                    onClick={() => handleTemplateToggle("assetsTemplate")}
                  >
                    <span>Assets Template</span>
                    <span>{assetsTemplateOpen ? "-" : "+"}</span>
                  </div>
                  {assetsTemplateOpen && (
                    <ul className="mt-2 ml-4 space-y-1">
                      <li className="hover:text-blue-400 cursor-pointer">Demo</li>
                    </ul>
                  )}
                </li>
                <li>
                  <div
                    className="flex justify-between items-center hover:text-green-400 cursor-pointer"
                    onClick={() => handleTemplateToggle("networkTemplates")}
                  >
                    <span>Network Templates</span>
                    <span>{networkTemplatesOpen ? "-" : "+"}</span>
                  </div>
                  {networkTemplatesOpen && (
                    <ul className="mt-2 ml-4 space-y-1">
                      <li className="hover:text-blue-400 cursor-pointer">Demo</li>
                    </ul>
                  )}
                </li>
                <li>
                  <div
                    className="flex justify-between items-center hover:text-green-400 cursor-pointer"
                    onClick={() => handleTemplateToggle("clientSpecificTemplates")}
                  >
                    <span>Client-specific Templates</span>
                    <span>{clientSpecificTemplatesOpen ? "-" : "+"}</span>
                  </div>
                  {clientSpecificTemplatesOpen && (
                    <ul className="mt-2 ml-4 space-y-1">
                      <li className="hover:text-blue-400 cursor-pointer">Demo</li>
                    </ul>
                  )}
                </li>
              </ul>
              <button className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                + Add New Template
              </button>
            </div>
          )}

          {/* Users Icon with Popup */}
          <div
            className={`flex flex-col items-center cursor-pointer ${activeIcon === "user" ? "text-green-500" : "text-gray-500"
              }`}
            onClick={() => handleIconClick("user")}
          >
            <FaUser className="text-xl" />
            <p className="text-xs text-gray-400 mt-1">Users</p>
          </div>
          {activeIcon === "user" && (
            <div
              className="absolute left-full top-0 bg-gray-800 text-white p-4 rounded shadow-lg w-56"
              style={{
                transform: "translateX(10px)",
                zIndex: 9999,
                position: "absolute",
              }}
            >
              <h3 className="text-lg font-bold mb-2">Users</h3>
              <ul className="space-y-2">
                {/* Wrap the <li> with the <Link> */}
                <Link to="/user-profile">
                  <li className="hover:text-green-400 cursor-pointer">List</li>
                </Link>
              </ul>
              <Link to={'/adduser'}>
              <button className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                + Add New User
              </button>
              </Link>
            </div>
          )}

  {/* WTP Icon */}
  <div
    className={`flex flex-col items-center cursor-pointer "text-gray-500"}`}
    onClick={() => navigate("/wtp")}
    >
    <FaTint className="text-xl text-gray-500" />
    <p className="text-xs mt-1 text-gray-500">WTP</p>
  </div>

  {/* STP Icon */}
  <div
    className={`flex flex-col items-center cursor-pointer "text-gray-500"}`}
    onClick={() => navigate("/stp")}
    >
    <GiWaterRecycling className="text-xl text-gray-500" />
    <p className="text-xs mt-1 text-gray-500">STP</p>
</div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center gap-6 mb-20">
        <div
          className={`flex flex-col items-center cursor-pointer ${activeIcon === "sun" ? "text-blue-500" : "text-gray-500"
            }`}
          onClick={() => handleIconClick("sun")}
        >
          <FaSun className="text-xl" />
          <p className="text-xs text-gray-400 mt-1">Day</p>
        </div>

        <div
          className={`flex flex-col items-center cursor-pointer ${activeIcon === "hand" ? "text-green-500" : "text-gray-500"
            }`}
          onClick={() => handleIconClick("hand")}
        >
          <FaHandPointer className="text-xl" />
          <p className="text-xs text-gray-400 mt-1">Pointer</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;