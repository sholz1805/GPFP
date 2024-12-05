import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvestedProjects } from "../../redux/actions/investorActions";
import { FaSpinner, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TableSearchBar from "../TableSearchBar";

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
        <table className="min-w-full bg-white">
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
      </div>
    </>
  );
};

const Portfolio = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const investedProjects = useSelector((state) => state.investedProjects.investedProjects);
  const uniqueId = localStorage.getItem("uniqueId");
  console.log(investedProjects)

  useEffect(() => {
    if (uniqueId) {
      dispatch(fetchInvestedProjects(uniqueId));
    }
  }, [dispatch, uniqueId]);

  const isLoading = investedProjects.loading;
  const errorMessage = investedProjects.error;  
  const allProjects = investedProjects?.data?.investmentList?.content || [];
  console.log(allProjects)

  const filteredProjects = allProjects.filter((item) => {
    if (!searchQuery.trim()) return true; 
    return (
      item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.developerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.developerEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  

  const totalPages = Math.ceil(filteredProjects.length / 10);
  const paginatedProjects = filteredProjects
    .slice(currentPage * 10, (currentPage + 1) * 10)
    .map((item) => [
      item?.projectUniqueId,
      item?.projectName,
      item?.developerName,
      item?.developerEmail,
      item?.investedAmount,
    ]);

  const handleRowClick = (projectId) => {
    navigate(`/project-details/${projectId}`);
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

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <main className="bg-gray-100 min-h-screen p-4">
      <div className="mb-4 flex flex-col md:flex-row items-center justify-between p-2">
        <div className="flex items-center mb-4 md:mb-0">
          <TableSearchBar onSearch={setSearchQuery} />
        </div>

        <div className="flex items-center justify-between md:w-auto">
         
          <div className="flex items-center gap-3">
            <div>
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
              {currentPage + 1} of {totalPages || 1}
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
           

            <button
            onClick={handleBack}
            className="bg-primary text-white text-sm rounded-md px-4 py-2 hover:bg-secondary"
          >
            Back
          </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-xl flex items-center justify-center bg-white rounded-xl h-screen font-semibold">
          <FaSpinner className="animate-spin text-lg text-primary" />
        </div>
      ) : errorMessage ? (
        <div className="text-sm flex items-center justify-center bg-white rounded-xl h-screen font-semibold">
          {errorMessage}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-sm flex items-center justify-center bg-white rounded-xl h-screen font-semibold">
          No projects found.
        </div>
      ) : (
        <TableComponent
          title="Invested Projects"
          columns={[
            "Project ID",
            "Project Name",
            "Developer",
            "Email",
            "Invested Amount",
          ]}
          data={paginatedProjects}
          onRowClick={handleRowClick}
        />
      )}
    </main>
  );
};

export default Portfolio;