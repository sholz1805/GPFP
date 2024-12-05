import React, { useEffect, useState } from "react";
import {
  FaChartLine,
  FaMoneyBillWave,
  FaProjectDiagram,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GrProjects } from "react-icons/gr";
import { TbFileReport } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInvestedProjects,
  fetchTransactionCount,
} from "../../redux/actions/investorActions";
import { useLogout } from "../authentication/authUtils/logoutUtil";

const TableComponent = ({ title, columns, data, onRowClick }) => {
  return (
    <>
      <div>
        <p className="text-l font-semibold text-primary mb-2">{title}</p>
      </div>
      <div
        className="bg-white border border-gray-300 rounded-lg p-2 overflow-y-auto scrollbar-hide"
        style={{ height: "65vh", width: "100%" }}
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
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                onClick={() => onRowClick(row[0])}
                className="cursor-pointer hover:bg-gray-100"
              >
                {row.map((cell, index) => {
                  if (index === 4) {
                    const amount = parseFloat(cell);
                    const formattedAmount = `N${amount.toLocaleString()}`;
                    return (
                      <td
                        key={index}
                        className="text-left text-xs py-3 px-2 border-b border-gray-300"
                      >
                        {formattedAmount}
                      </td>
                    );
                  } else {
                    return (
                      <td
                        key={index}
                        className="text-left text-xs py-3 px-2 border-b border-gray-300"
                      >
                        {cell}
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
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

const InvestorDashboard = () => {
  const [openModal, setOpenModal] = useState(false);

  const projectListColumns = [
    "Project Id",
    "Project Name",
    "Developer",
    "Email",
    "Amount Invested",
    
  ];

  const navigate = useNavigate();
  const handlePortfolio = () => {
    navigate("/my-portfolio");
  };

  const handleViewProject = () => {
    navigate("/project-list");
  };

  const handleRowClick = (projectId) => {
    navigate(`/project-details/${projectId}`);
  };

  const handleViewReport = () => {
    navigate(`/project-report`);
  };

  const dispatch = useDispatch();
  const UniqueId = localStorage.getItem("uniqueId");
  const investedProjects = useSelector(
    (state) => state.investedProjects.investedProjects
  );
  const transactionCount = useSelector(
    (state) => state.investedProjects.transactionCount
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!UniqueId) {
        navigate("/login");
        return; 
      }

      try {
        await dispatch(fetchInvestedProjects(UniqueId));
        await dispatch(fetchTransactionCount(UniqueId));
      } catch (err) {
        console.error("Failed to load invested projects or transaction count:", err);
      }
    };

    fetchData();
  }, [dispatch, navigate, UniqueId]);

  // console.log(investedProjects);
  // console.log(transactionCount);

  

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

  const projectListData =
    investedProjects?.data?.investmentList?.content.map((item) => [
      item?.projectUniqueId,
      item?.projectName,
      item?.developerName,
      item?.developerEmail,
      item?.investedAmount,
    ]) || [];

  const hasInvestedProjects =
    investedProjects?.data?.investmentList?.content?.length > 0;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col justify-center p-4 md:flex-row">
        <div className="w-full md:w-1/4 bg-white border border-gray-300 rounded-lg p-4 md:mx-2">
          <div className="mb-4 flex justify-center">
            <img
              alt="img"
              className="rounded-full w-40 h-40"
              height="50"
              src={transactionCount?.data?.investorDetails?.profilePicture}
              width="50"
            />
          </div>
          <div className="flex justify-center">
            <div>
              <h2 className="text-base font-semibold text-center">
                {transactionCount?.data?.investorDetails?.fullName}
              </h2>
              <p className="text-xs text-primary text-center">
                {transactionCount?.data?.investorDetails?.email}
              </p>
            </div>
          </div>
          <div className="bg-gray-100 p-2 rounded-lg my-6">
            <div className="mb-2">
              <button
                onClick={handlePortfolio}
                className="bg-primary text-white w-full text-xs py-2 px-2 rounded-lg flex items-center hover:bg-secondary"
              >
                <FaChartLine className="mr-2" />
                My Portfolio
              </button>
            </div>
            <div className="mb-2">
              <button
                onClick={handleViewProject}
                className="bg-primary text-white w-full text-xs py-2 px-2 rounded-lg flex hover:bg-secondary items-center"
              >
                <GrProjects className="mr-2" />
                View Projects
              </button>
            </div>
            <div className="mb-2">
              <button
                onClick={handleViewReport}
                className="bg-primary text-white w-full text-xs py-2 px-2 rounded-lg flex hover:bg-secondary items-center"
              >
                <TbFileReport className="mr-2" />
                View Report
              </button>
            </div>
          </div>
          <div className="mt-auto">
            <button
              className="text-primary w-full text-sm py-2 px-2 rounded-lg flex items-center"
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
              title="EquityValue"
              figure={formatNumber(transactionCount?.data?.equityValue)}
              details="Equity Value"
            />
            <Card
              icon={<FaMoneyBillWave size={14} color="#467D9A" />}
              title="InvestmentValue"
              figure={
                formatNumber(transactionCount?.data?.investmentValue) || 0
              }
              details="Investment Value"
            />
            <Card
              icon={<FaProjectDiagram size={14} color="#467D9A" />}
              title="ActiveInvestments"
              figure={transactionCount?.data?.investmentCount}
              details="Active Investments"
            />
          </div>
          {hasInvestedProjects ? (
            <TableComponent
              title="My Portfolio"
              columns={projectListColumns}
              data={projectListData}
              onRowClick={handleRowClick}
            />
          ) : (
            <div
              className="bg-white border border-gray-300 rounded-lg p-2 overflow-y-auto scrollbar-hide flex justify-center items-center"
              style={{ height: "65vh", width: "100%" }}
            >
              You don't have any investment yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
