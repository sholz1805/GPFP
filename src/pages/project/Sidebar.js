import React, { useState } from "react";
import {
  FaChartPie,
  FaTachometerAlt,
  FaCaretLeft,
  FaCaretRight,
} from "react-icons/fa";
import { RiGitPullRequestLine, RiFolderAddFill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav
      className={`bg-white shadow text-primary ${
        isCollapsed ? "w-20" : "w-56"
      } h-screen flex flex-col justify-between transition-width duration-300`}
    >
      <div>
        <div className="flex justify-between items-center mb-4 p-4">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="images/gpfpLogo.svg"
              alt="Logo"
              className={`h-6 ${isCollapsed ? "font-l" : "font-m"}`}
            />
            {!isCollapsed}
          </Link>
          <button onClick={toggleSidebar} className="text-primary">
            {isCollapsed ? (
              <FaCaretRight size={16} />
            ) : (
              <FaCaretLeft size={16} />
            )}
          </button>
        </div>

        <div
          className={`flex justify-center items-center w-full mb-4 ${
            isCollapsed ? "w-20" : "w-56"
          }`}
        >
          <div
            className={`rounded-full border-2 border-primary overflow-hidden relative group ${
              isCollapsed ? "w-10 h-10" : "w-40 h-40"
            }`}
          >
            <img
              src={"" || "/images/profileImg.png"}
              alt="profile"
              className={`w-full h-full object-cover`}
            />
          </div>
        </div>

        {/* <p
          className={`text-center text-primary font-medium text-sm ${
            isCollapsed ? "text-xs" : "text-base"
          }`}
        >
          {"" || "Company's Name"}
        </p> */}

        <div className="p-4 space-y-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 hover:bg-green-100 hover:text-green-800 p-2 rounded-md"
              >
                <FaTachometerAlt size={20} />
                {!isCollapsed && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/request"
                className="flex items-center space-x-2 hover:bg-green-100 hover:text-green-800 p-2 rounded-md"
              >
                <RiGitPullRequestLine size={20} />
                {!isCollapsed && <span>Request</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/investment"
                className="flex items-center space-x-2 hover:bg-green-100 hover:text-green-800 p-2 rounded-md"
              >
                <FaChartPie size={20} />
                {!isCollapsed && <span>Investment</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/project"
                className="flex items-center space-x-2 hover:bg-green-100 hover:text-green-800 p-2 rounded-md"
              >
                <RiFolderAddFill size={20} />
                {!isCollapsed && <span>Add Project</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <ul className="space-y-2">
          <li>
            <Link
              to="/logout"
              className="flex items-center space-x-2 hover:bg-green-100 hover:text-green-800 p-2 rounded-md"
            >
              <IoMdLogOut size={20} />
              {!isCollapsed && <span>Logout</span>}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
