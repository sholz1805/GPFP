import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDevelopers } from "../../../redux/actions/adminActions";
import { FaSpinner, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TableSearchBar from "../../TableSearchBar";

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

const Developer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allDevelopers = useSelector((state) => state.admin.allDevelopers);

  useEffect(() => {
    dispatch(fetchAllDevelopers());
  }, [dispatch]);

  const developerListColumns = [
    "Developer Id",
    "Name",
    "Email",
    "Phone Number",
  ];

  const isLoading = allDevelopers.loading;
  const errorMessage = allDevelopers.error;

  const filteredDevelopers = (allDevelopers.data || []).filter((developer) => {
    return (
      developer.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      developer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      developer.phoneNumber.includes(searchQuery)
    );
  });

  const totalPages = Math.ceil(filteredDevelopers.length / 10);
  const paginatedDevelopers = filteredDevelopers
    .slice(currentPage * 10, (currentPage + 1) * 10)
    .map((developer) => [
      developer.uniqueId,
      developer.username,
      developer.email,
      developer.phoneNumber,
    ]);

  const handleRowClick = (developerId) => {
    navigate(`/developer-profile/${developerId}`);
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
    <main className="bg-gray-100 min-h-screen p-4">
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

      {isLoading ? (
        <div className="flex flex-col items-center m-4 justify-center bg-white rounded-xl h-[80%]">
          <FaSpinner className="animate-spin text-lg text-primary" />
        </div>
      ) : errorMessage || filteredDevelopers.length === 0 ? (
        <div
          className={`text-lg flex flex-col h-screen items-center m-4 justify-center bg-white rounded-xl h-[80%] font-semibold`}
        >
          {errorMessage || "No Developer(s) found."}
        </div>
      ) : (
        <TableComponent
          title="Developer(s) List"
          columns={developerListColumns}
          data={paginatedDevelopers}
          onRowClick={handleRowClick}
        />
      )}
    </main>
  );
};

export default Developer;
