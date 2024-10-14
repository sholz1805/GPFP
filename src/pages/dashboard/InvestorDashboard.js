import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import {
  FaChartLine,
  FaMoneyBillWave,
  FaPlus,
  FaProjectDiagram,
  FaUsers,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const TableComponent = ({ title, columns, data }) => {
  return (
    <>
      <div>
        <p className="text-l font-semibold text-primary mb-2">{title}</p>
      </div>
      <div
        className="bg-white border border-gray-300 rounded-lg p-2 mb-4 overflow-y-auto scrollbar-hide"
        style={{ height: "65vh", width: "100%" }}
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
            {data.map((row, index) => (
              <tr key={index}>
                {row.map((cell, index) => (
                  <td
                    key={index}
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
        <h2 className="text-3xl font-bold">{figure}</h2>
        <p className="text-s text-gray-600 leading-tight">{details}</p>
      </div>
    </div>
  );
};

const InvestorDashboard = () => {
  const projectListColumns = [
    "Date",
    "ProjectId",
    "ProjectName",
    "ProjectType",
    "Developer",
  ];
  const projectListData = [
    ["2022-01-01", "PID-001", "Project 1", "Type 1", "John Doe"],
    ["2022-01-15", "PID-002", "Project 2", "Type 2", "Jane Doe"],
    ["2022-02-01", "PID-003", "Project 3", "Type 3", "Bob Smith"],
    ["2022-02-01", "PID-003", "Project 3", "Type 3", "Bob Smith"],
    ["2022-02-01", "PID-003", "Project 3", "Type 3", "Bob Smith"],
    ["2022-02-01", "PID-003", "Project 3", "Type 3", "Bob Smith"],
    ["2022-02-01", "PID-003", "Project 3", "Type 3", "Bob Smith"],
    ["2022-02-01", "PID-003", "Project 3", "Type 3", "Bob Smith"],
    ["2022-01-15", "PID-002", "Project 2", "Type 2", "Jane Doe"],
    ["2022-01-15", "PID-002", "Project 2", "Type 2", "Jane Doe"],
    ["2022-01-15", "PID-002", "Project 2", "Type 2", "Jane Doe"],
  ];

  const navigate = useNavigate();
  const handleCreateProject = () => {
    navigate("/create-project");
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
              src="https://storage.googleapis.com/a1aa/image/GaqxeEfNkIqLN0jXez0WfHh9OrDtmNce36cmQ07HQ8xkFmYcC.jpg"
              width="50"
            />
          </div>
          <div className="flex justify-center">
            <div>
              <h2 className="text-base font-semibold text-center">
                Sholz Creatives
              </h2>
              <p className="text-xs text-gray-600 text-center">
                Lagos, Nigeria
              </p>
              <p className="text-xs text-primary text-center">
                sholzcreatives@gmail.com
              </p>
            </div>
          </div>
          <div className="bg-gray-100 p-2 rounded-lg my-6">
            <div className="mb-2">
              <button
                onClick={handleCreateProject}
                className="bg-primary text-white w-full text-xs py-2 px-2 rounded-lg flex  hover:bg-secondary items-center"
              >
                <FaPlus className="mr-2" />
                Create Project
              </button>
            </div>
            {/* <div className="mb-2">
              <button className="bg-primary text-white w-full text-xs py-2 px-2 rounded-lg flex  hover:bg-secondary items-center">
                <AiOutlineEye className="mr-2" />
                View Project
              </button>
            </div> */}
            {/* <div className="mb-2">
              <button className="bg-primary text-white w-full text-xs py-2 px-2 rounded-lg flex items-center hover:bg-secondary">
                <TbListDetails className="mr-2" />
                Investment Details
              </button>
            </div> */}
            <div className="mb-2">
              <button className="bg-primary text-white w-full text-xs py-2 px-2 rounded-lg flex items-center  hover:bg-secondary">
                <FaChartLine className="mr-2" />
                My Portfolio
              </button>
            </div>
          </div>
          <div className="mt-auto">
            <button className="text-primary w-full text-xs py-2 px-2 rounded-lg flex    items-center">
              <IoMdSettings className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>
        <div className="w-full md:w-3/4 md:mx-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 h-auto">
            <Card
              icon={<FaProjectDiagram size={14} color="#467D9A" />}
              title="Projects"
              figure={10}
              details="Number of projects"
            />
            <Card
              icon={<FaMoneyBillWave size={14} color="#467D9A" />}
              title="Investment"
              figure={formatNumber(5000000500)}
              details="Total investment"
            />
            <Card
              icon={<FaUsers size={14} color="#467D9A" />}
              title="Investors"
              figure={50}
              details="Number of investors"
            />
          </div>
          <TableComponent
            title="Project List"
            columns={projectListColumns}
            data={projectListData}
          />
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
