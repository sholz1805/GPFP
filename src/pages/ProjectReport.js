import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import {
  fetchInvestedProjects,
  fetchReports,
} from "../redux/actions/investorActions";

const TableComponent = ({ title, columns, data, onRowClick, openModal }) => {
  return (
    <>
      <div>
        <p className="text-l font-semibold text-primary mb-2">{title}</p>
      </div>
      <div
        className="bg-white border border-gray-300 rounded-lg p-2 overflow-y-auto scrollbar-hide"
        style={{ height: "75vh", width: "100%" }}
      >
        <table className="min-w-full bg-white ">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="text-left text-xs font-semibold text-primary py-6 px-2 border-b-2 border-primary"
                >
                  {column}
                </th>
              ))}
              <th className="text-left text-xs font-semibold text-primary py-6 px-2 border-b-2 border-primary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                onClick={() => onRowClick(row[0])}
                className="cursor-pointer hover:bg-gray-100"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="text-left text-xs py-3 px-2 border-b border-gray-300"
                  >
                    {cellIndex === 4
                      ? `N${parseFloat(cell).toLocaleString()}`
                      : cell}
                  </td>
                ))}
                <td className="text-left py-3 px-2 border-b border-gray-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(row);
                    }}
                  >
                    <HiOutlineDotsVertical className="text-gray-500 hover:text-gray-700" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const Modal = ({ isOpen, onClose, onRequest }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-lg font-semibold mb-4">Request Report</h2>
        <p className="mb-4">Do you want to request report for this project?</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onRequest}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            Request
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const investedProjects = useSelector(
    (state) => state.investedProjects.investedProjects
  );
  const reports = useSelector((state) => state.investedProjects.getReport);
  const loading = useSelector((state) => state.investedProjects.loading);
  const error = useSelector((state) => state.investedProjects.error);
  const uniqueId = localStorage.getItem("uniqueId");

  const [isViewingReports, setIsViewingReports] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (uniqueId) {
      dispatch(fetchInvestedProjects(uniqueId));
      dispatch(fetchReports(0, uniqueId));
    }
  }, [dispatch, uniqueId]);

  const allProjects = investedProjects?.data?.investmentList?.content || [];

  const toggleView = () => {
    setIsViewingReports((prev) => !prev);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRequestReport = () => {
    console.log(`Requesting report for project ID: ${selectedProject[0]}`);
    closeModal();
  };

  return (
    <main className="bg-white min-h-screen p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-primary">Reports</h2>
        <div className="gap-4 flex items-center">
          <button
            onClick={toggleView}
            className="bg-primary text-white text-xs px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:bg-secondary hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-secondary"
          >
            {isViewingReports ? "Request Report" : "View Reports"}
          </button>
          <button
            onClick={handleBack}
            className="bg-primary text-white text-xs px-4 py-2 rounded-md"
          >
            Back
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <FaSpinner className="animate-spin text-lg text-primary" />
        </div>
      ) : error ? (
        <div className="text-sm flex items-center justify-center h-screen font-semibold">
          {error}
        </div>
      ) : isViewingReports ? (
        reports.length === 0 ? (
          <div className="text-sm flex items-center justify-center h-screen font-semibold">
            No reports found.
          </div>
        ) : (
          <div className="grid grid-cols-1 bg-blue-50 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {reports.map((report, index) => (
              <div
                key={`${report.projectUniqueId}-${index}`}
                className="flex flex-col items-center bg-white p-4 rounded-lg"
              >
                <div className="bg-gray-100 p-4 rounded-full">
                  <FaRegFileAlt size={80} className="text-primary" />
                </div>
                <p className="mt-2 text-gray-700 text-center">
                  {report.projectName} {report.reportMonth} {report.reportYear}{" "}
                  Report
                </p>
                {report.reportLink && (
                  <a
                    href={report.reportLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline mt-1"
                  >
                    View Report
                  </a>
                )}
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="bg-white p-4 rounded-lg">
          {allProjects.length === 0 ? (
            <div className="text-sm flex items-center justify-center h-screen font-semibold">
              You have no existing projects.
            </div>
          ) : (
            <TableComponent
              title="Projects"
              columns={[
                "Project ID",
                "Project Name",
                "Developer",
                "Email",
                "Invested Amount",
              ]}
              data={allProjects.map((item) => [
                item?.projectUniqueId,
                item?.projectName,
                item?.developerName,
                item?.developerEmail,
                item?.investedAmount,
              ])}
              onRowClick={(projectId) =>
                navigate(`/project-details/${projectId}`)
              }
              openModal={openModal}
            />
          )}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onRequest={handleRequestReport}
      />
    </main>
  );
};

export default ProjectReport;
