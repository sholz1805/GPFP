import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import DisplayCard from "./DisplayCard";
import { MdBusinessCenter } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import ProjectCard from "./ProjectCard";
import MessageCard from "./MessageCard";
import {
  fetchAllMessages,
  fetchAllProjects,
  fetchCounts,
} from "../../../redux/actions/adminActions";

const DashboardHome = () => {
  const [activeTab, setActiveTab] = useState("All Projects");
  const navigate = useNavigate(); 

  const dispatch = useDispatch();
  const adminCount = useSelector((state) => state.admin.counts);
  const allProjects = useSelector((state) => state.admin.allProjects);
  const allMessages = useSelector((state) => state.admin.allMessages);

  const projects = allProjects.projects;

  const getProjectStatus = (project) => {
    if (project.approved && project.uploadUrl) {
      return "Approved";
    }
    if (!project.approved && project.uploadUrl === null) {
      if (project.reviewed) {
        return "Not Approved"; 
      } else {
        return "Pending";      
      }
    }
    return "Unknown"; 
  };

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "All Projects") return true;
    const status = getProjectStatus(project);
    if (activeTab === "Approved" && status === "Approved") return true;
    if (activeTab === "Not Approved" && status === "Not Approved") return true;
    if (activeTab === "Pending" && status === "Pending") return true;
    return false;
  });

  const handleProjectClick = (projectId) => {
    navigate(`/projectdetails/${projectId}`);
  };

  const handleMessageClick = (message) => {
    navigate(`/messages/${message.uniqueId}`);
  };

  useEffect(() => {
    dispatch(fetchCounts());
    dispatch(fetchAllProjects());
    dispatch(fetchAllMessages());
  }, [dispatch]);

  // console.log(allMessages.data)

  return (
    <main className="bg-gray-100 min-h-screen p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <DisplayCard
          title="Projects"
          figure={adminCount?.data?.projectCount}
          icon={<FaProjectDiagram size={14} color="#467D9A" />}
        />
        <DisplayCard
          title="Investors"
          figure={adminCount?.data?.investorCount}
          icon={<MdBusinessCenter size={14} color="#467D9A" />}
        />
        <DisplayCard
          title="Developers"
          figure={adminCount?.data?.developerCount}
          icon={<FaUserCog size={14} color="#467D9A" />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div
            className="bg-white p-6 rounded-lg shadow overflow-y-auto scrollbar-hide"
            style={{ height: "65vh", width: "100%" }}
          >
            <div>
              <span className="text-l font-semibold">Projects</span>
              <div className="flex justify-between items-center mt-2 mb-4">
                <div className="flex space-x-2 text-sm">
                  <button
                    className={`px-4 py-2 ${
                      activeTab === "All Projects"
                        ? "bg-[#467D9A] text-white leading-none"
                        : "bg-gray-200 text-gray-600 leading-none"
                    } rounded`}
                    onClick={() => setActiveTab("All Projects")}
                  >
                    All Projects
                  </button>
                  <button
                    className={`px-4 py-2 ${
                      activeTab === "Approved"
                        ? "bg-[#467D9A] text-white leading-none"
                        : "bg-gray-200 text-gray-600 leading-none"
                    } rounded`}
                    onClick ={() => setActiveTab("Approved")}
                  >
                    Approved
                  </button>
                  <button
                    className={`px-4 py-2 ${
                      activeTab === "Not Approved"
                        ? "bg-[#467D9A] text-white leading-none"
                        : "bg-gray-200 text-gray-600 leading-none"
                    } rounded`}
                    onClick={() => setActiveTab("Not Approved")}
                  >
                    Not Approved
                  </button>
                  <button
                    className={`px-4 py-2 ${
                      activeTab === "Pending"
                        ? "bg-[#467D9A] text-white leading-none"
                        : "bg-gray-200 text-gray-600 leading-none"
                    } rounded`}
                    onClick={() => setActiveTab("Pending")}
                  >
                    Pending
                  </button>
                </div>
              </div>
              <ul>
                {filteredProjects.map((project) => (
                  <div key={project.projectUniqueId} onClick={() => handleProjectClick(project.projectUniqueId)}>
                    <ProjectCard 
                      project={{
                        id: project.projectUniqueId,
                        name: project.projectName,
                        location: project.location,
                        status: getProjectStatus(project),
                      }} 
                    />
                    <div className="border-b border-gray-300 my-2" />
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div
            className="bg-white px-2 py-4 rounded-lg shadow overflow-y-auto scrollbar-hide"
            style={{ height: "65vh", width: "100%" }}
          >
            <span className="text-l font-semibold">Messages</span>
            <ul className="mt-2">
              {allMessages.data ? (
                allMessages.data.map((message, index) => (
                  <MessageCard
                    key={index}
                    message={{
                      title: message.notificationType, 
                      sender: message.userDto.fullName,
                      details: message.message, 
                      date: message.createdTime,
                    }}
                    onClick={() => handleMessageClick(message)}
                  />
                ))
              ) : (
                <li>No messages available</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardHome;