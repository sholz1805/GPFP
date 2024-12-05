import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDeveloperReport,
  createInvestorReport,
  fetchAllInvestment,
} from "../../../redux/actions/adminActions";
import {
  FaSpinner,
  FaCaretLeft,
  FaCaretRight,
  FaDownload,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import TableSerachBar from "../../TableSearchBar";
import { FaFileCirclePlus } from "react-icons/fa6";
import ReportModal from "./ReportModal";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

const TableComponent = ({
  title,
  columns,
  data,
  onRowClick,
  onDownloadReport,
  onOpenModal,
}) => {
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);

  const handleCreateReportClick = (index) => {
    setDropdownOpenIndex(dropdownOpenIndex === index ? null : index);
  };

  const handleDropdownSelect = (type, investment) => {
    if (!investment?.developer || !investment?.project) {
      console.error("Missing fields in investment data:", investment);
      return;
    }

    const userUniqueId =
      type === "Developer"
        ? investment.developer?.uniqueId
        : investment.investor?.uniqueId;

    if (!userUniqueId) {
      console.error(
        `User  Unique ID is undefined for the selected ${type} investment`,
        investment
      );
      return;
    }

    const projectUniqueId = investment.project?.projectUniqueId;
    if (!projectUniqueId) {
      console.error("Project Unique ID is undefined or null", investment);
      return;
    }

    onOpenModal(type, investment);
    setDropdownOpenIndex(null);
  };

  return (
    <>
      <div>
        <p className="text-l font-semibold text-primary mb-2">{title}</p>
      </div>
      <div
        className="bg-white border border-gray-300 rounded-lg p-2 overflow-y-auto scrollbar-hide"
        style={{ height: "80vh", width: "100%" }}
      >
        <table className="min-w-full bg-white">
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
            {data.map((investment, rowIndex) => (
              <tr
                key={rowIndex}
                className={`cursor-pointer hover:bg-gray-100 ${
                  dropdownOpenIndex === rowIndex ? "bg-gray-100" : ""
                }`}
              >
                <td
                  className="text-left text-xs py-3 px-4 border-b border-gray-300"
                  onClick={() => onRowClick(investment.projectId)}
                >
                  {investment.projectId}
                </td>
                <td className="text-left text-xs py-3 px-4 border-b border-gray-300">
                  {investment.projectName}
                </td>
                <td className="text-left text-xs py-3 px-4 border-b border-gray-300">
                  {investment.location}
                </td>
                <td className="text-left text-xs py-3 px-4 border-b border-gray-300">
                  {investment.investorName}
                </td>
                <td className="text-left text-xs py-3 px-4 border-b border-gray-300">
                  {investment.developerName}
                </td>
                <td className="text-left text-xs py-3 px-4 border-b border-gray-300 flex space-x-4 relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCreateReportClick(rowIndex);
                    }}
                  >
                    <FaFileCirclePlus className="text-primary hover:text-secondary text-lg" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDownloadReport(investment.projectId);
                    }}
                  >
                    <FaDownload className="text-primary hover:text-secondary text-lg" />
                  </button>

                  {dropdownOpenIndex === rowIndex && (
                    <div className="absolute right-16 z-40 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
                      <button
                        onClick={() =>
                          handleDropdownSelect("Developer", investment)
                        }
                        className="block px-4 py-2 text-sm text-left hover:bg-gray-100"
                      >
                        For Developer
                      </button>
                      <button
                        onClick={() =>
                          handleDropdownSelect("Investor", investment)
                        }
                        className="block px-4 py-2 text-sm text-left hover:bg-gray-100"
                      >
                        For Investor
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const Report = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reportType, setReportType] = useState("");
  const [userUniqueId, setUserUniqueId] = useState("");
  const [projectUniqueId, setProjectUniqueId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const investmentState = useSelector((state) => state.admin.allInvestment);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [responseLoading, setResponseLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchAllInvestment(currentPage));
      setLoading(false);
    };

    fetchData();
  }, [dispatch, currentPage]);

  const investments = investmentState.data?.content || [];
  const totalPages = investmentState.data?.totalPages || 0;

  const filtered = investments.filter((investment) => {
    return (
      investment.project.projectName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      investment.project.location
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      investment.project.projectUniqueId
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  const investmentListData = filtered.map((investment) => ({
    projectId: investment.project?.projectUniqueId,
    projectName: investment.project?.projectName,
    location: investment.project?.location,
    investorName: investment.investor?.fullName,
    developerName: investment.developer?.fullName,
    investment,
    investor: investment.investor,
    developer: investment.developer,
    project: investment.project,
  }));

  const investmentListColumns = [
    "Project Id",
    "Project Name",
    "Project Location",
    "Investor Name",
    "Developer Name",
    "Actions",
  ];

  const handleRowClick = (projectId) => {
    navigate(`/projectdetails/${projectId}`);
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

  const openModal = (type, investment) => {
    setReportType(type);
    setModalIsOpen(true);

    const userUniqueId =
      type === "Developer"
        ? investment.developer?.uniqueId
        : investment.investor?.uniqueId;
    const projectUniqueId = investment.project?.projectUniqueId;

    setUserUniqueId(userUniqueId);
    setProjectUniqueId(projectUniqueId);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setReportType("");
  };

  const handleReportSubmit = async (reportData) => {
    setResponseLoading(true);
    setResponseModalOpen(true);
    setResponseMessage("");
    let success = false; 

    try {
        let response;

        if (reportType === "Developer") {
            response = await dispatch(createDeveloperReport(reportData));
            console.log(reportData);
            if (response && response.status) {
              success = true; 
              setResponseMessage(response.message); 
          }
        } else if (reportType === "Investor") {
            response = await dispatch(createInvestorReport(reportData));
            console.log(reportData);
            if (response && response.status) {
              success = true; 
              setResponseMessage(response.message); 
          }
        }

        else {
            setResponseMessage("Failed to create report. Please try again."); 
        }
    } catch (error) {
        console.error("Error creating report:", error);

        if (error.response && error.response.data) {
            const { message } = error.response.data;
            setResponseMessage(message || "Failed to create report. Please try again.");
        } else {
            setResponseMessage("Network error, please try again later.");
        }
    } finally {
        setResponseLoading(false);
        setIsSuccess(success);
    }
};

  const handleDownloadReport = (projectId) => {
    console.log("Downloading report for investment ID:", projectId);
  };

  const ResponseModal = ({
    isOpen,
    onClose,
    loading,
    responseMessage,
    isSuccess,
  }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-72 p-6 rounded shadow-md relative">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-1 py-1 bg-gray-300 text-xs text-gray-700 rounded-full hover:bg-gray-400"
            >
              <IoIosClose />
            </button>
          </div>
          {loading ? (
            <div className="flex items-center justify-center">
              <FaSpinner className="animate-spin text-primary" />
              <span className="ml-2 text-xs">Processing...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {isSuccess ? (
                <FaCheckCircle size={30} className="text-green-500 mb-2" />
              ) : (
                <FaTimesCircle size={30} className="text-red-500 mb-2" />
              )}
              <p className="text-xs text-center">{responseMessage}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 p-4 h-screen">
      <div className="mb-4 flex flex-col md:flex-row items-center justify-between p-2">
        <div className="flex items-center mb-4 md:mb-0 flex-wrap">
          <div className="w-full md:w-auto">
            <TableSerachBar
              onSearch={(query) => {
                setSearchQuery(query);
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className={`bg-primary text-white text-sm rounded-md px-4 py-2 hover:bg-secondary ${
                currentPage === 0 ? " opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FaCaretLeft />
            </button>
            <span className="mx-2">
              {currentPage + 1} of {totalPages}
            </span>
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
      </div>

      {loading ? (
        <div className="flex flex-col items-center m-4 justify-center bg-white rounded-xl h-[80%]">
          <FaSpinner className="animate-spin text-lg text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-lg flex flex-col items-center m-4 justify-center bg-white rounded-xl h-[80%] font-semibold">
          No investment found
        </div>
      ) : (
        <TableComponent
          title="Investment List"
          columns={investmentListColumns}
          data={investmentListData}
          onRowClick={handleRowClick}
          onDownloadReport={handleDownloadReport}
          onOpenModal={openModal}
        />
      )}

      <ReportModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        onSubmit={handleReportSubmit}
        userUniqueId={userUniqueId}
        projectUniqueId={projectUniqueId}
      />

      <ResponseModal
        isOpen={responseModalOpen}
        onClose={() => setResponseModalOpen(false)}
        loading={responseLoading}
        responseMessage={responseMessage}
        isSuccess={isSuccess}
      />
    </div>
  );
};

export default Report;
