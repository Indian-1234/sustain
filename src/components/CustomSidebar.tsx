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
} from "react-icons/fa";
import { Link } from "react-router-dom";

type PopupName = "alerts" | "design" | "users" | null;
type IconName = "cog" | "leaf" | "file" | "palette" | "user" | "sun" | "hand" | null;

const Sidebar: React.FC = () => {
  const [activePopup, setActivePopup] = useState<PopupName>(null);
  const [activeIcon, setActiveIcon] = useState<IconName>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [systemTemplatesOpen, setSystemTemplatesOpen] = useState(false);
  const [assetsTemplateOpen, setAssetsTemplateOpen] = useState(false);
  const [networkTemplatesOpen, setNetworkTemplatesOpen] = useState(false);
  const [clientSpecificTemplatesOpen, setClientSpecificTemplatesOpen] = useState(false);

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

    // Reset template states when closing design popup
    if (popupName !== "design") {
      resetTemplateStates();
    }
  };

  // Handle click for other icons
  const handleIconClick = (iconName: IconName) => {
    setActivePopup(null);
    setActiveIcon((prev) => (prev === iconName ? null : iconName));

    // Close template popups when a new icon is clicked
    if (iconName !== "palette") {
      resetTemplateStates();
    }
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

  return (
    <div
      ref={sidebarRef}
      className="h-screen w-24 bg-gray-900 flex flex-col justify-between py-4 relative mt-20"
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
            <Link to="/" className="block">
              <FaCog className="text-xl" />
            </Link>
            <p className="text-xs text-gray-400 mt-1">Operational</p>
          </div>

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
                  <Link to="report-list" className="hover:text-green-400 cursor-pointer">
                    Report List
                  </Link>
                </li>
                <li>
                  <Link to="report-logs" className="hover:text-green-400 cursor-pointer">
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
              <button className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                + Add New User
              </button>
            </div>
          )}

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