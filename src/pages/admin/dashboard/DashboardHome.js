import React, { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";
import { MdBusinessCenter } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import ProjectCard from "./ProjectCard";
import MessageCard from "./MessageCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllMessages,
  fetchAllProjects,
  fetchCounts,
} from "../../../redux/actions/adminActions";

const DashboardHome = () => {
  const [activeTab, setActiveTab] = useState("All Projects");

  const projects = [
    {
      id: 1,
      name: "VI Lagos TradeFair",
      date: "Jun 22, 2024",
      status: "Pending",
    },
    {
      id: 2,
      name: "LightUp Lagos",
      date: "Jun 22, 2024",
      status: "Not Approved",
    },
    {
      id: 3,
      name: "Abuja TradeFair",
      date: "Jun 22, 2024",
      status: "Approved",
    },
    { id: 4, name: "LightUp Kano", date: "Jun 22, 2024", status: "Pending" },
    { id: 5, name: "Green Jos", date: "Jun 22, 2024", status: "Approved" },
    {
      id: 6,
      name: "Lagos Tradefair",
      date: "Jun 22, 2024",
      status: "Approved",
    },
    {
      id: 7,
      name: "VI Lagos TradeFair",
      date: "Jun 22, 2024",
      status: "Pending",
    },
    {
      id: 8,
      name: "LightUp Lagos",
      date: "Jun 22, 2024",
      status: "Not Approved",
    },
    {
      id: 9,
      name: "Abuja TradeFair",
      date: "Jun 22, 2024",
      status: "Approved",
    },
    { id: 10, name: "LightUp Kano", date: "Jun 22, 2024", status: "Pending" },
    { id: 11, name: "Green Jos", date: "Jun 22, 2024", status: "Approved" },
    {
      id: 12,
      name: "Lagos Tradefair",
      date: "Jun 22, 2024",
      status: "Approved",
    },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "All Projects") return true;
    if (activeTab === "Approved" && project.status === "Approved") return true;
    if (activeTab === "Not Approved" && project.status === "Not Approved")
      return true;
    if (activeTab === "Pending" && project.status === "Pending") return true;
    return false;
  });

  const [messages, setMessages] = useState([
    {
      sender: "Wavelenght",
      content: "Lorem ipsum dolor sit amet consectetur...",
      read: false,
    },
    {
      sender: "BridgeGap",
      content: "Arcu vestibulum tortor et tempor vestibulum ac.",
      read: false,
    },
    {
      sender: "Wavelenght",
      content: "Lorem ipsum dolor sit amet consectetur...",
      read: false,
    },
    {
      sender: "Condueet",
      content: "Diam lectus ipsum blandit justo sed.",
      read: false,
    },
    {
      sender: "Wavelenght",
      content: "Arcu vestibulum tortor et tempor vestibulum ac.",
      read: false,
    },
    {
      sender: "Wavelenght",
      content: "Diam lectus ipsum blandit justo sed.",
      read: false,
    },
    {
      sender: "Wavelenght",
      content: "Lorem ipsum dolor sit amet consectetur...",
      read: false,
    },
    {
      sender: "BridgeGap",
      content: "Arcu vestibulum tortor et tempor vestibulum ac.",
      read: false,
    },
    {
      sender: "Wavelenght",
      content: "Lorem ipsum dolor sit amet consectetur...",
      read: false,
    },
    {
      sender: "Condueet",
      content: "Diam lectus ipsum blandit justo sed.",
      read: false,
    },
    {
      sender: "Wavelenght",
      content: "Arcu vestibulum tortor et tempor vestibulum ac.",
      read: false,
    },
    {
      sender: "Wavelenght",
      content: "Diam lectus ipsum blandit justo sed.",
      read: false,
    },
  ]);

  const handleMessageClick = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].read = true;
    setMessages(updatedMessages);
    console.log(
      `Navigating to details of message: ${updatedMessages[index].title}`
    );
  };

  const dispatch = useDispatch();
  const adminCount = useSelector((state) => state.admin.counts);
  // const allProjects = useSelector((state) => state.admin.allProjects);
  const allMessages = useSelector((state) => state.admin.allMessages);

  useEffect(() => {
    dispatch(fetchCounts());
    dispatch(fetchAllProjects());
    dispatch(fetchAllMessages());
  }, [dispatch]);

  console.log(adminCount);
  console.log(allMessages?.data);

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
                    onClick={() => setActiveTab("Approved")}
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
                {filteredProjects.map((project, index) => (
                  <div key={project.id}>
                    <ProjectCard project={project} />
                    {index < filteredProjects.length - 1 && (
                      <div className="border-b border-gray-300 my-2" />
                    )}
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
              {messages.map((message, index) => (
                <MessageCard
                  key={index}
                  message={message}
                  onClick={() => handleMessageClick(index)}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardHome;
