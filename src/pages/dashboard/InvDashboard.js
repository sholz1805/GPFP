import React, { useState } from "react";

const projects = [
  {
    id: "GP1001",
    logo: "https://placehold.co/50x50?text=Logo",
    title: "Tradefair BBA",
    description: "Productive use and Residential",
    startDate: "Sept. 20",
    members: 3,
    progress: 20,
    pdfLink: "https://docs.google.com/document/d/1DLpC1Ex48SDyKFn6QvZJaMtnMDZhpHw8/edit?usp=drive_link&ouid=100786290718410154447&rtpof=true&sd=true",
  },
  {
    id: "GP1002",
    logo: "https://placehold.co/50x50?text=Logo",
    title: "Light up Kano",
    description: "Productive use and Residential",
    startDate: "Sept. 20",
    members: 4,
    progress: 70,
    pdfLink: "https://example.com/project2.pdf",
  },
  {
    id: "GP1003",
    logo: "https://placehold.co/50x50?text=Logo",
    title: "Light up Abuja",
    description: "Residential",
    startDate: "Sept. 20",
    members: 5,
    progress: 30,
    pdfLink: "https://example.com/project3.pdf",
  },
  {
    id: "GP1004",
    logo: "https://placehold.co/50x50?text=Logo",
    title: "Tradefair VI",
    description: "Productive use",
    startDate: "Sept. 20",
    members: 3,
    progress: 50,
    pdfLink: "https://example.com/project4.pdf",
  },
  {
    id: "GP1005",
    logo: "https://placehold.co/50x50?text=Logo",
    title: "Light up Kaduna",
    description: "Productive use and Residential",
    startDate: "Sept. 20",
    members: 4,
    progress: 70,
    pdfLink: "https://example.com/project5.pdf",
  },
  {
    id: "GP1006",
    logo: "https://placehold.co/50x50?text=Logo",
    title: "Solar Access Lagos",
    description: "Productive use and Residential",
    startDate: "Sept. 20",
    members: 5,
    progress: 90,
    pdfLink: "https://example.com/project6.pdf",
  },
  {
    id: "GP1007",
    logo: "https://placehold.co/50x50?text=Logo",
    title: "Light up Abuja",
    description: "Productive use and Residential",
    startDate: "Sept. 20",
    members: 5,
    progress: 90,
    pdfLink: "https://example.com/project7.pdf",
  },
  {
    id: "GP1008",
    logo: "https://placehold.co/50x50?text=Logo",
    title: "Light up Abuja",
    description: "Productive use and Residential",
    startDate: "Sept. 20",
    members: 4,
    progress: 90,
    pdfLink: "https://example.com/project8.pdf",
  },
  {
    id: "GP1009",
    logo: "https://placehold.co/50x50?text=Logo",
    title: "Light up Abuja",
    description: "Productive use and Residential",
    startDate: "Sept. 20",
    members: 2,
    progress: 90,
    pdfLink: "https://example.com/project9.pdf",
  },
  {
    id: "GP10010",
    logo: "https://placehold.co/50x50?text=Logo",
    title: "Light up Abuja",
    description: "Productive use and Residential",
    startDate: "Sept. 20",
    members: 5,
    progress: 90,
    pdfLink: "https://example.com/project10.pdf",
  },
];

const InvDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  const handleProceed = () => {
    console.log("Proceed button clicked");
  };

  return (
    <div className="p-8 bg-[#fafafa] h-screen overflow-y-auto">
      <div className="bg-white px-6 py-4 mb-4">
        <h1 className="text-2xl font-semibold mb-4 text-primary">Projects List</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white border-2 hover:border-primary cursor-pointer rounded-lg p-4 m-2 w-80"
              onClick={() => handleCardClick(project)}
            >
              <img src={project.logo} alt={project.title} />
              <h2 className="text-lg font-bold">{project.title}</h2>
              <p>{project.description}</p>
              <p>Start Date: {project.startDate}</p>
              <p>Members: {project.members}</p>
              <p>Progress: {project.progress}%</p>
            </div>
          ))}
        </div>
      </div>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-3/4 h-[95vh]  overflow-y-auto scrollbar-hide">
            <iframe
              src={selectedProject.pdfLink}
              width="100%"
              height="100%"
              frameborder="0"
              scrolling="no"
            />
            <button
              className="bg-primary text-white p-2 rounded-lg mt-4"
              onClick={handleProceed}
            >
              Proceed
            </button>
            <button
              className="bg-red-500 text-white p-2 rounded-lg mt-4 ml-4"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvDashboard;