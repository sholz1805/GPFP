import React, { useEffect, useState } from "react";
import { FaMoneyBillWave, FaPlus } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GrProjects } from "react-icons/gr";
import { TbFileReport } from "react-icons/tb";
import { MdPending } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../redux/actions/fetchAllProjectActions";
import { useLogout } from "../authentication/authUtils/logoutUtil";
import { fetchProjectsCount } from "../../redux/actions/projectsCountAction";
import { FaSpinner } from "react-icons/fa6";

const TableComponent = ({
  title,
  columns,
  data,
  loading,
  error,
  onRowClick,
}) => {

  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-l font-semibold text-primary mb-2">{title}</p>
        <p className="text-sm underline cursor-pointer text-primary" onClick={() => navigate("/all-projects")}>View all...</p>
      </div>
      <div
        className="bg-white border border-gray-300 rounded-lg p-2 overflow-y-auto scrollbar-hide"
        style={{ height: "65vh", width: "100%" }}
      >
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="loader"><FaSpinner/></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-red-500 font-semibold">{error}</p>
          </div>
        ) : data.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-black">No projects available.</p>
          </div>
        ) : (
          <table className="min-w-full bg-white ">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="text-left text-xs font-semibold text-primary py-6 px-2 border-b border-gray-300 border-b-2 border-primary"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick(row[0])}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="text-left text-xs py-3 px-2 border-b border-gray-300"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

const formatNumber = (num) => {
  const units = [
    { value: 1000000000, symbol: "b" },
    { value: 1000000, symbol: "m" },
    { value: 1000, symbol: "k" },
  ];

  let result = "";
  for (const unit of units) {
    if (num >= unit.value) {
      const value = Math.floor(num / unit.value);
      result = `${value}${unit.symbol}`;
      num %= unit.value;
      if (num > 0) {
        result += "+";
      }
      break;
    }
  }

  if (result === "") {
    result = `N${num}`;
  }

  return result;
};

const Card = ({ icon, figure, details }) => {
  return (
    <div className="flex items-center px-4 py-8 bg-white border border-gray-300 rounded-lg md:h-full lg:h-full xl:h-full">
      <div className="w-10 h-10 bg-blue-100 rounded-full flex justify-center items-center mr-4">
        {icon}
      </div>
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-[#549BC2]">{figure}</h2>
        <p className="text-s text-gray-600 leading-tight">{details}</p>
      </div>
    </div>
  );
};

const DeveloperDashboard = () => {
  const projectListColumns = [
    "Project Id",
    "Project Name",
    "Project Location",
    "Start Date",
    "Status",
  ];

  const navigate = useNavigate();
  const handleCreateProject = () => {
    navigate("/create-project");
  };

  const handleViewReport = () => {
    navigate(`/project-report`);
  }

  const handleViewAllProject = () => {
    navigate("/all-projects") };

  const handleRowClick = (projectId) => {
    navigate(`/project-details/${projectId}`);
  };

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const projectsCount = useSelector((state) => state.projectsCount);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const uniqueId = localStorage.getItem("uniqueId");
      if (!uniqueId) {
        navigate("/login");
      }
        try {
          setLoading(true);
          setError(null);
          await dispatch(fetchProjects(uniqueId));
          await dispatch(fetchProjectsCount(uniqueId));
        } catch (err) {
          setError("Failed to load projects. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    ;
  
    fetchData();
  }, [dispatch, navigate]);

  const projectListData = projects.projects.map((project) => [
    project.projectUniqueId,
    project.projectName,
    project.location,
    new Date(project.startDate).toLocaleDateString(),
    project.approved && project.reviewed && project.uploadUrl ? (
      <span className="text-green-500">Approved</span>
    ) : !project.approved && !project.reviewed && project.uploadUrl === null ? (
      <span className="text-yellow-500">Pending</span>
    ) : !project.approved && project.reviewed && project.uploadUrl === null ? (
      <span className="text-red-500">Not Approved</span>
    ) : null, 
  ]);

  const handleOpeModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const logout = useLogout();
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col justify-center p-4 md:flex-row">
        <div className="w-full md:w-1/4 bg-white border border-gray-300 rounded-lg p-4 md:mx-2">
          <div className="mb-4 flex justify-center">
            <img
              alt="img"
              className="rounded-full w-40 h-40"
              height="50"
              src={
                projectsCount.projectsCount?.data?.developerProfileData
                  ?.profilePicture
              }
              width="50"
            />
          </div>
          <div className="flex justify-center">
            <div>
              <h2 className="text-base font-semibold text-center">
                {
                  projectsCount.projectsCount?.data?.developerProfileData
                    ?.developerCompany
                }
              </h2>
              {/* <p className="text-xs text-gray-600 text-center">
                Lagos, Nigeria
              </p> */}
              <p className="text-xs text-primary text-center">
                {projectsCount.projectsCount?.data?.developerProfileData?.email}
              </p>
            </div>
          </div>
          <div className="bg-gray-100 p-2 rounded-lg my-6">
            <div className="mb-2">
              <button
                onClick={handleViewAllProject}
                className="bg-primary text-white w-full text-xs py-2 px-2 rounded-lg flex items-center  hover:bg-secondary"
              >
                <GrProjects className="mr-2" />
                View All Projects
              </button>
            </div>
            <div className="mb-2">
              <button
                onClick={handleCreateProject}
                className="bg-primary text-white w-full text-xs py-2 px-2 rounded-lg flex  hover:bg-secondary items-center"
              >
                <FaPlus className="mr-2" />
                Create Project
              </button>
            </div>
            <div className="mb-2">
              <button 
              onClick={handleViewReport}
              className="bg-primary text-white w-full text-xs py-2 px-2 rounded-lg flex items-center  hover:bg-secondary">
                <TbFileReport className="mr-2" />
                View Report
              </button>
            </div>
          </div>
          <div className="mt-auto">
            <button
              className="text-primary w-full text-sm py-2 px-2 rounded-lg flex  items-center"
              onClick={handleOpeModal}
            >
              <IoMdSettings className="mr-2" />
              Logout
            </button>
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
          </div>
        </div>
        <div className="w-full md:w-3/4 md:mx-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 h-auto">
            <Card
              icon={<GrProjects size={14} color="#467D9A" />}
              title="Projects"
              figure={projectsCount.projectsCount?.data?.approvedProjects}
              details="Approved Projects"
            />
            <Card
              icon={<FaMoneyBillWave size={14} color="#467D9A" />}
              title="TotalInvestment"
              figure={formatNumber(projectsCount.projectsCount?.data?.totalInvestmentRequired || 0)}
              details="Total Investment Requested"
            />
            <Card
              icon={<MdPending size={14} color="#467D9A" />}
              title="Pending"
              figure={projectsCount.projectsCount?.data?.unapprovedProjects}
              details="Pending Projects"
            />
          </div>
          <TableComponent
            title="Project List"
            columns={projectListColumns}
            data={projectListData}
            loading={loading}
            error={error}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;
