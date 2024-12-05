import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createInvestmentTransaction,
  fetchPendingInvestment,
} from "../../../redux/actions/adminActions";
import { FaSpinner, FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import TableSearchBar from "../../TableSearchBar";
import { IoIosClose } from "react-icons/io";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const InputField = ({ label, value, onChange, readOnly = false, type = "text", required = false }) => (
  <div className="mb-4">
    <label className="block text-xs font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className="border border-gray-300 outline-none rounded-md p-2 w-full text-xs"
      required={required}
    />
  </div>
);

const InvestmentModal = ({ isOpen, onClose, project, onSuccess }) => {
  const [investedAmount, setInvestedAmount] = useState(0);
  const [investmentEquity, setInvestmentEquity] = useState(0);
  const [responseLoading, setResponseLoading] = useState(false);

  const projectUniqueId = project ? project.projectUniqueId : "";
  const investorEmail = project ? project.investorEmail : "";
  const pendingInvestmentId = project ? project.pendingInvestmentId : 0;

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const investmentData = {
      investorEmail,
      projectUniqueId,
      investedAmount: Number(investedAmount),
      investmentEquity: Number(investmentEquity),
      pendingInvestmentId,
    };

    setResponseLoading(true);
    try {
      await dispatch(createInvestmentTransaction(investmentData));
      onSuccess("Investment created successfully!");
    } catch (error) {
      onSuccess("Failed to create investment.");
    } finally {
      setResponseLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-72 p-6 rounded shadow-md relative">
        <div className="flex justify-end">
          <button onClick={onClose} className="px-1 py-1 bg-gray-300 text-xs text-gray-700 rounded-full hover:bg-gray-400">
            <IoIosClose />
          </button>
        </div>
        <h2 className="text-sm font-semibold text-primary mb-2">Create Investment</h2>

        <form onSubmit={handleSubmit}>
          <InputField label="Investor Email" value={investorEmail} readOnly />
          <InputField label="Project ID" value={projectUniqueId} readOnly />
          <InputField label="Invested Amount" type="number" value={investedAmount} onChange={(e) => setInvestedAmount(Number(e.target.value))} required />
          <InputField label="Investment Equity" type="number" value={investmentEquity} onChange={(e) => setInvestmentEquity(Number(e.target.value))} required />
          <div className="flex justify-end">
            <button type="submit" className="bg-primary text-white text-xs rounded-md px-4 py-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TableComponent = ({ title, columns, data, onRowClick, onCreateInvestment }) => (
  <>
    <div>
      <p className="text-l font-semibold text-primary mb-2">{title}</p>
    </div>
    <div className="bg-white border border-gray-300 rounded-lg p-2 overflow-y-auto scrollbar-hide" style={{ height: "80vh", width: "100%" }}>
      < table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="text-left text-xs font-semibold text-primary py-6 px-2 border-b border-gray-300 border-b-2 border-primary">
                {column}
              </th>
            ))}
            <th className="text-left text-xs font-semibold text-primary py-6 px-2 border-b border-gray-300 border-b-2 border-primary"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} onClick={() => onRowClick(row.projectUniqueId)} className="cursor-pointer hover:bg-gray-100">
              <td className="text-left text-xs py-3 px-2 border-b border-gray-300">{row.projectUniqueId}</td>
              <td className="text-left text-xs py-3 px-2 border-b border-gray-300">{row.projectName}</td>
              <td className="text-left text-xs py-3 px-2 border-b border-gray-300">{row.investorName}</td>
              <td className="text-left text-xs py-3 px-2 border-b border-gray-300">{row.investorEmail}</td>
              <td className="text-left text-xs py-3 px-2 border-b border-gray-300" colSpan="1">
                <button onClick={(e) => { e.stopPropagation(); onCreateInvestment(row); }} className="bg-primary text-white text-xs rounded-md px-4 py-2">
                  Create Investment
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

const ResponseModal = ({ isOpen, onClose, loading, responseMessage }) => {
  if (!isOpen) return null;
  const isSuccess = responseMessage.includes("successfully");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-72 p-6 rounded shadow-md relative">
        <div className="flex justify-end">
          <button onClick={onClose} className="px-1 py-1 bg-gray-300 text-xs text-gray-700 rounded-full hover:bg-gray-400">
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
const InvestmentTransaction = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pendingInvestment = useSelector((state) => state.admin.pendingInvestment);

  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [responseLoading, setResponseLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchPendingInvestment(currentPage));
      setLoading(false);
    };

    fetchData();
  }, [dispatch, currentPage]);

  const filteredProjects = pendingInvestment.data?.content || [];
  const totalPages = pendingInvestment.data?.totalPages || 0;

  const filtered = filteredProjects.filter((project) => {
    const matchesSearch =
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.investorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.projectUniqueId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      new Date(project.interestDate).toLocaleDateString().includes(searchQuery);

    return matchesSearch;
  });

  const projectListData = filtered.map((project) => ({
    projectUniqueId: project.projectUniqueId,
    projectName: project.projectName,
    investorName: project.investorName,
    investorEmail: project.investorEmail,
    pendingInvestmentId: project.id || 0,
  }));

  const projectListColumns = [
    "Project Id",
    "Project Name",
    "Investor",
    "Investor Email",
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

  const handleCreateInvestment = (project) => {
    // console.log("Selected Project:", project);
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <div className="bg-gray-100 p-4 h-screen">
      <div className="mb-4 flex flex-col md:flex-row items-center justify-between p-2">
        <div className="flex items-center mb-4 md:mb-0 flex-wrap">
          <div className="w-full md:w-auto">
            <TableSearchBar
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
                currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
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
        <div
          className={`text-lg flex flex-col items-center m-4 justify-center bg-white rounded-xl h-[80%] font-semibold`}
        >
          No project found
        </div>
      ) : (
        <TableComponent
          title="Project List"
          columns={projectListColumns}
          data={projectListData}
          onRowClick={handleRowClick}
          onCreateInvestment={handleCreateInvestment}
        />
      )}

      <InvestmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        project={selectedProject}
        onSuccess={(message) => {
          setResponseMessage(message);
          setResponseModalOpen(true);
          setModalOpen(false);
        }}
      />

      <ResponseModal
        isOpen={responseModalOpen}
        onClose={() => setResponseModalOpen(false)}
        loading={responseLoading}
        responseMessage={responseMessage}
      />
    </div>
  );
};

export default InvestmentTransaction;