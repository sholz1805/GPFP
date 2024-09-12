import React from "react";
import { FaUserCircle, FaChartLine, FaTasks } from "react-icons/fa";

const DummyDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex items-center mb-8">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="h-24 w-24 rounded-full border-4 border-primary"
        />
        <div className="ml-4">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome, User!</h1>
          <p className="text-gray-600">Here’s an overview of your dashboard.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaUserCircle className="text-3xl text-blue-500" />
            <h2 className="text-xl font-semibold ml-4">Profile Overview</h2>
          </div>
          <p className="text-gray-600">Manage your profile information and settings here.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaChartLine className="text-3xl text-green-500" />
            <h2 className="text-xl font-semibold ml-4">Performance</h2>
          </div>
          <p className="text-gray-600">View your performance metrics and insights.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaTasks className="text-3xl text-red-500" />
            <h2 className="text-xl font-semibold ml-4">Tasks</h2>
          </div>
          <p className="text-gray-600">Manage your tasks and to-do list here.</p>
        </div>
      </div>
    </div>
  );
};

export default DummyDashboard;
