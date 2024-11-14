import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInvestors } from "../../../redux/actions/adminActions";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const Investor = () => {
  const dispatch = useDispatch();
  const allInvestors = useSelector((state) => state.admin.allInvestors);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllInvestors());
  }, [dispatch]);

  const developerListColumn = [
    "Investor Id",
    "Name",
    "Email",
    "Phone Number",
  ];

  let developerListData = [];
  let errorMessage = "";

  const isLoading = allInvestors.loading;

  if (allInvestors.data) {
    if (allInvestors.data.length > 0) {
      developerListData = allInvestors.data.map((developer) => [
        developer.uniqueId,
        developer.username,
        developer.email,
        developer.phoneNumber,
      ]);
    } else {
      errorMessage = "No developer(s) found.";
    }
  } else if (allInvestors.error) {
    errorMessage = allInvestors.error;
  }

  const TableComponent = ({ title, columns, data, error, isLoading }) => {
    return (
      <>
        <div>
          <p className="text-l font-semibold text-primary mb-2">{title}</p>
        </div>
        <div
          className="bg-white border border-gray-300 rounded-lg p-2 overflow-y-auto scrollbar-hide"
          style={{ height: "88vh", width: "100%" }}
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
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-3">
                    <FaSpinner className="animate-spin text-xl" />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center text-xl font-semibold text-black py-3"
                  >
                    {error}
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr
                    key={index}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => navigate(`/investor-profile/${row[0]}`)}
                  >
                    {row.map((cell, index) => (
                      <td
                        key={index}
                        className="text-left text-xs py-3 px-2 border-b border-gray-300"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <main className="bg-gray-100 min-h-screen p-4 ">
      <TableComponent
        title="Developer(s) List"
        columns={developerListColumn}
        data={developerListData}
        error={errorMessage}
        isLoading={isLoading}
      />
    </main>
  );
};

export default Investor;
