import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoHomeOutline, IoPeopleOutline } from "react-icons/io5";
import { VscProject } from "react-icons/vsc";
import {
  AiOutlineMessage,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
// import { MdDriveFolderUpload } from "react-icons/md";
import { FiUploadCloud } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleOpeModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <nav
      className={`bg-white text-primary h-screen transition-width duration-300 fixed top-0 left-0 ${
        isOpen ? "w-64" : "w-0"
      } flex flex-col justify-between overflow-hidden`}
    >
      <div>
        <div className="flex justify-between items-center mb-4 p-6">
          <Link to="/admin-dashboard" className="flex items-center space-x-2">
            <img src="/images/gpfpLogo.svg" alt="Logo" className="h-8" />
          </Link>
          <button onClick={toggleSidebar} className="text-gray-700 md:hidden">
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        <div className="p-4 space-y-4">
          <ul className="space-y-3">
            <li>
              <Link
                to="/admin-dashboard"
                className={`flex items-center space-x-2 hover:bg-[#467D9A] hover:text-white p-2 rounded-md ${
                  location.pathname === "/admin-dashboard"
                    ? "bg-[#467D9A] text-white"
                    : ""
                }`}
              >
                <IoHomeOutline size={20} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="projects"
                className={`flex items-center space-x-2 hover:bg-[#467D9A] hover:text-white p-2 rounded-md ${
                  location.pathname === "/admin-dashboard/projects"
                    ? "bg-[#467D9A] text-white"
                    : ""
                }`}
              >
                <VscProject size={20} />
                <span>Projects</span>
              </Link>
            </li>
            <li>
              <Link
                to="messages"
                className={`flex items-center space-x-2 hover:bg-[#467D9A] hover:text-white p-2 rounded-md ${
                  location.pathname === "/admin-dashboard/messages"
                    ? "bg-[#467D9A] text-white"
                    : ""
                }`}
              >
                <AiOutlineMessage size={20} />
                <span>Messages</span>
              </Link>
            </li>
            <li>
              <Link
                to="investor"
                className={`flex items-center space-x-2 hover:bg-[#467D9A] hover:text-white p-2 rounded-md ${
                  location.pathname === "/admin-dashboard/investor"
                    ? "bg-[#467D9A] text-white"
                    : ""
                }`}
              >
                <IoPeopleOutline size={20} />
                <span>Investors</span>
              </Link>
            </li>
            <li>
              <Link
                to="developer"
                className={`flex items-center space-x-2 hover:bg-[#467D9A] hover:text-white p-2 rounded-md ${
                  location.pathname === "/admin-dashboard/developer"
                    ? "bg-[#467D9A] text-white"
                    : ""
                }`}
              >
                <AiOutlineUsergroupAdd size={20} />
                <span>Developers</span>
              </Link>
            </li>
            {/* <li>
              <Link
                to="upload"
                className={`flex items-center space-x-2 hover:bg-[#467D9A] hover:text-white p-2 rounded-md ${
                  location.pathname === "/admin-dashboard/upload" ? "bg-[#467D9A] text-white" : ""
                }`}
              >
                <MdDriveFolderUpload size={20} />
                <span>Upload Project</span>
              </Link>
            </li> */}
            <li>
              <Link
                to="report"
                className={`flex items-center space-x-2 hover:bg-[#467D9A] hover:text-white p-2 rounded-md ${
                  location.pathname === "/admin-dashboard/report"
                    ? "bg-[#467D9A] text-white"
                    : ""
                }`}
              >
                <FiUploadCloud size={20} />
                <span>Report</span>
              </Link>
            </li>
            <li>
              <div
                className={
                  "flex items-center space-x-2 hover:bg-[#467D9A] hover:text-white p-2 cursor-pointer rounded-md"
                }
                onClick={handleOpeModal}
              >
                <LuLogOut size={20} />
                <span>Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg  p-6 max-w-sm w-full">
            <p className="text-gray-500 mt-2 text-center leading-tight ">
              Are you sure you want to logout?
            </p>
            <div className="flex items-center justify-center gap-5">
              <button
                onClick={handleLogout}
                className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark mt-4"
              >
                Yes, Logout
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-primary-dark mt-4"
              >
                No, go back
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
