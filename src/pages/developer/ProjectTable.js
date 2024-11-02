import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../redux/actions/fetchAllProjectActions";
import {
  FaFilter,
  FaArrowLeft,
  FaSpinner,
  FaCaretLeft,
  FaCaretRight,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const TableComponent = ({ title, columns, data, onRowClick }) => {
  return (
    <>
      <div>
        <p className="text-l font-semibold text-primary mb-2">{title}</p>
      </div>
      <div
        className="bg-white border border-gray-300 rounded-lg p-2 overflow-y-auto scrollbar-hide"
        style={{ height: "80vh", width: "100%" }}
      >
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
                    className={`text-left text-xs py-3 px-2 border-b border-gray-300 ${
                      cellIndex === 4
                        ? cell === "Pending"
                          ? "text-yellow-500"
                          : cell === "Approved"
                          ? "text-green-500"
                          : cell === "Not Approved"
                          ? "text-red-500"
                          : "text-black"
                        : "text-black"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const ProjectTable = () => {
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const projectsState = useSelector((state) => state.projects);

  const UniqueId = localStorage.getItem("uniqueId");

  useEffect(() => {
    const fetchData = async (page) => {
      setLoading(true);
      await dispatch(fetchProjects(UniqueId, page));
      setLoading(false);
    };

    fetchData(currentPage);
  }, [dispatch, UniqueId, currentPage]);

  const filteredProjects = projectsState.projects || [];
  const totalPages = projectsState.totalPages || 0;

  const filtered = filteredProjects.filter((project) => {
    if (filter === "All") return true;
    if (filter === "Approved") return project.approved === true;
    if (filter === "Pending")
      return project.approved === false && project.uploadUrl === null;
    return true;
  });

  const projectListData = filtered.map((project) => [
    project.projectUniqueId,
    project.projectName,
    project.location,
    new Date(project.startDate).toLocaleDateString(),
    project.approved
      ? "Approved"
      : project.uploadUrl === null
      ? "Pending"
      : "Not Approved",
  ]);

  const projectListColumns = [
    "Project Id ",
    "Project Name ",
    "Project Location",
    "Start Date",
    "Status",
  ];

  const navigate = useNavigate();

  const handleRowClick = (projectId) => {
    navigate(`/project-details/${projectId}`);
  };

  const handleBack = () => {
    navigate("/developer-dashboard");
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-gray-100 p-4 h-screen">
      <div className="mb-4 flex flex-col md:flex-row items-center justify-between p-2">
        <div className="flex items-center mb-4 md:mb-0">
          <label className="mr-2 text-sm font-semibold text-primary">
            <FaFilter />
          </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md text-sm p-2 outline-transparent"
          >
            <option value="All">All</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
          </select>

          <div className="flex items-center ml-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className={`bg-primary text-white text-sm rounded-md px-4 py-2 hover:bg-secondary ${
                currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FaCaretLeft />
            </button>
            {currentPage + 1} of {totalPages}
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              className={`bg-primary text-white text-sm rounded-md px-4 py-2 hover:bg-secondary ${
                currentPage >= totalPages - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <FaCaretRight />
            </button>
          </div>
        </div>

        <button
          onClick={handleBack}
          className="flex items-center bg-primary text-white text-sm rounded-md px-4 py-2 hover:bg-secondary"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <FaSpinner className="animate-spin text-lg text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div
          className={`text-lg flex item-center justify-center font-semibold`}
        >
          No project found
        </div>
      ) : (
        <div>
          <TableComponent
            title="Project List"
            columns={projectListColumns}
            data={projectListData}
            onRowClick={handleRowClick}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectTable;
