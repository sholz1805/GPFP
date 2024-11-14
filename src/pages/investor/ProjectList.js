// import React, { useState } from "react";
// import { IoMdCloseCircle } from "react-icons/io";

// const projects = [
//   {
//     id: "GP1001",
//     logo: "https://placehold.co/50x50?text=Logo",
//     title: "Tradefair BBA",
//     description: "Productive use and Residential",
//     startDate: "Sept. 20",
//     members: 3,
//     progress: 20,
//     pdfLink:
//       "https://docs.google.com/document/d/1DLpC1Ex48SDyKFn6QvZJaMtnMDZhpHw8/edit?usp=drive_link&ouid=100786290718410154447&rtpof=true&sd=true",
//   },
//   {
//     id: "GP1002",
//     logo: "https://placehold.co/50x50?text=Logo",
//     title: "Light up Kano",
//     description: "Productive use and Residential",
//     startDate: "Sept. 20",
//     members: 4,
//     progress: 70,
//     pdfLink: "https://example.com/project2.pdf",
//   },
//   {
//     id: "GP1003",
//     logo: "https://placehold.co/50x50?text=Logo",
//     title: "Light up Abuja",
//     description: "Residential",
//     startDate: "Sept. 20",
//     members: 5,
//     progress: 30,
//     pdfLink: "https://example.com/project3.pdf",
//   },
//   {
//     id: "GP1004",
//     logo: "https://placehold.co/50x50?text=Logo",
//     title: "Tradefair VI",
//     description: "Productive use",
//     startDate: "Sept. 20",
//     members: 3,
//     progress: 50,
//     pdfLink: "https://example.com/project4.pdf",
//   },
//   {
//     id: "GP1005",
//     logo: "https://placehold.co/50x50?text=Logo",
//     title: "Light up Kaduna",
//     description: "Productive use and Residential",
//     startDate: "Sept. 20",
//     members: 4,
//     progress: 70,
//     pdfLink: "https://example.com/project5.pdf",
//   },
//   {
//     id: "GP1006",
//     logo: "https://placehold.co/50x50?text=Logo",
//     title: "Solar Access Lagos",
//     description: "Productive use and Residential",
//     startDate: "Sept. 20",
//     members: 5,
//     progress: 90,
//     pdfLink: "https://example.com/project6.pdf",
//   },
//   {
//     id: "GP1007",
//     logo: "https://placehold.co/50x50?text=Logo",
//     title: "Light up Abuja",
//     description: "Productive use and Residential",
//     startDate: "Sept. 20",
//     members: 5,
//     progress: 90,
//     pdfLink: "https://example.com/project7.pdf",
//   },
//   {
//     id: "GP1008",
//     logo: "https://placehold.co/50x50?text=Logo",
//     title: "Light up Abuja",
//     description: "Productive use and Residential",
//     startDate: "Sept. 20",
//     members: 4,
//     progress: 90,
//     pdfLink: "https://example.com/project8.pdf",
//   },
//   {
//     id: "GP1009",
//     logo: "https://placehold.co/50x50?text=Logo",
//     title: "Light up Abuja",
//     description: "Productive use and Residential",
//     startDate: "Sept. 20",
//     members: 2,
//     progress: 90,
//     pdfLink: "https://example.com/project9.pdf",
//   },
//   {
//     id: "GP10010",
//     logo: "https://placehold.co/50x50?text=Logo",
//     title: "Light up Abuja",
//     description: "Productive use and Residential",
//     startDate: "Sept. 20",
//     members: 5,
//     progress: 90,
//     pdfLink: "https://example.com/project10.pdf",
//   },
// ];

// const PojectList = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [isProceedModalOpen, setIsProceedModalOpen] = useState(false);

//   const handleCardClick = (project) => {
//     setSelectedProject(project);
//     setIsOpen(true);
//   };

//   const handleProceed = () => {
//     setIsProceedModalOpen(true);
//   };

//   const handleCloseProceedModal = () => {
//     setIsProceedModalOpen(false);
//   };

//   return (
//     <div className="p-8 bg-[#fafafa] h-screen overflow-y-auto">
//       <div className="bg-white px-6 py-4 mb-4">
//         <h1 className="text-2xl font-semibold mb-4 text-primary">
//           Projects List
//         </h1>
//       </div>
//       <div className="flex-1 overflow-y-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
//           {projects.map((project) => (
//             <div
//               key={project.id}
//               className="bg-white border hover:border-primary cursor-pointer rounded-lg p-4 m-2 w-80"
//               onClick={() => handleCardClick(project)}
//             >
//               <img src={project.logo} alt={project.title} />
//               <p className="text-xs mt-4">{project.id}</p>
//               <h2 className="text-lg mt-2 text-[#4B4949] font-bold">
//                 {project.title}
//               </h2>
//               <p className="text-sm mb-2">{project.description}</p>
//               <p className="text-xs">
//                 Start Date:{" "}
//                 <span className="font-bold"> {project.startDate}</span>
//               </p>

//               <div className="flex items-center justify-between mt-2 gap-4">
//                 <div className="w-2/4 bg-gray-200 rounded-full h-2.5">
//                   <div
//                     className="bg-[#70C3C3] h-2.5 rounded-full"
//                     style={{
//                       width: Math.min(Math.max(project.progress, 0), 100) + "%",
//                     }}
//                   ></div>
//                 </div>

//                 <div className="flex -space-x-2">
//                   {Array.from({ length: project.members }).map((_, index) => (
//                     <img
//                       key={index}
//                       src="https://placehold.co/20x20?text=Avatar"
//                       alt="Member Avatar"
//                       className="w-6 h-6 rounded-full border-2 border-white"
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {isOpen && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-4 rounded-lg w-3/4 h-[95vh]  overflow-y-auto scrollbar-hide">
//             <iframe
//               title="projectPdf"
//               src={selectedProject.pdfLink}
//               width="100%"
//               height="100%"
//               frameborder="0"
//               scrolling="no"
//             />
//             <button
//               className="bg-primary text-white px-4 py-2 rounded-md mt-4"
//               onClick={handleProceed}
//             >
//               Proceed
//             </button>
//             <button
//               className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 ml-4"
//               onClick={() => setIsOpen(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//       {isProceedModalOpen && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-4 rounded-lg w-1/2 h-auto overflow-y-auto scrollbar-hide relative">
//             <button
//               className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-900 transition duration-300"
//               onClick={handleCloseProceedModal}
//             >
//               <IoMdCloseCircle />
//             </button>
//             <div className="flex flex-col gap-4 p-4">
//               <button
//                 className="bg-primary text-white px-4 py-2 rounded-md"
//                 onClick={() => console.log("Request for meeting clicked")}
//               >
//                 Request a Meeting
//               </button>
//               <button
//                 className="bg-primary text-white px-4 py-2 rounded-md"
//                 onClick={() =>
//                   console.log("Request further information clicked")
//                 }
//               >
//                 Request further Information
//               </button>
//               <button
//                 className="bg-primary text-white px-4 py-2 rounded-md"
//                 onClick={() => console.log("Invest clicked")}
//               >
//                 Invest
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PojectList;

import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableProjects } from "../../redux/actions/availableProjectActions";
import {
  FaArrowLeft,
  FaCaretLeft,
  FaCaretRight,
  FaSpinner,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, projects, error, totalPages } = useSelector(
    (state) => state.availableProjects
);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProceedModalOpen, setIsProceedModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const uniqueId = localStorage.getItem("uniqueId");

  useEffect(() => {
    dispatch(fetchAvailableProjects(currentPage, uniqueId));
  }, [dispatch, uniqueId, currentPage]);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  const handleProceed = () => {
    setIsProceedModalOpen(true);
  };

  const handleCloseProceedModal = () => {
    setIsProceedModalOpen(false);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-lg text-primary" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  const mappedProjects = (projects || []).map((project) => ({
    id: project.projectUniqueId,
    logo: "https://placehold.co/50x50?text=Logo",
    title: project.projectName,
    description: project.projectDescription,
    startDate: new Date(project.startDate).toLocaleDateString(),
    members: 3, // Placeholder number of members
    progress: project.approved ? 100 : 0,
    pdfLink: project.uploadUrl || "https://example.com",
  }));

  return (
    <div className="p-4 bg-gray-100">
      <div className="mb-4 flex justify-between items-center px-4">
        <h1 className="text-2xl font-semibold text-primary">Projects List</h1>
        <div className="flex items-center justify-between gap-4 w-60">
          <div className="flex items-center w-full justify-between">
            <button
              onClick={handlePreviousPage}
              className={`bg-primary text-white text-sm rounded-md px-4 py-2 hover:bg-secondary ${
                currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentPage === 0}
            >
              <FaCaretLeft />
            </button>
            <span className="flex items-center text-xs ">
              {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className={`bg-primary text-white text-sm rounded-md px-4 py-2 hover:bg-secondary ${
                currentPage >= totalPages - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={currentPage >= totalPages - 1}
            >
              <FaCaretRight />
            </button>
          </div>

          <button
            onClick={handleBack}
            className="flex items-center bg-primary text-white text-sm rounded-md px-4 py-2 hover:bg-secondary"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {mappedProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border hover:border-primary cursor-pointer rounded-lg p-4 m-2 w-100"
              onClick={() => handleCardClick(project)}
            >
              <img src={project.logo} alt={project.title} />
              <p className="text-xs mt-4">{project.id}</p>
              <h2 className="text-lg mt-2 text-[#4B4949] font-bold">
                {project.title}
              </h2>
              <p className="text-sm mb-2">{project.description}</p>
              <p className="text-xs">
                Start Date:{" "}
                <span className="font-bold"> {project.startDate}</span>
              </p>

              <div className="flex items-center justify-between mt-2 gap-4">
                <div className="w-2/4 bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#70C3C3] h-2.5 rounded-full"
                    style={{
                      width: Math.min(Math.max(project.progress, 0), 100) + "%",
                    }}
                  ></div>
                </div>

                <div className="flex -space-x-2">
                  {Array.from({ length: project.members }).map((_, index) => (
                    <img
                      key={index}
                      src="https://placehold.co/20x20?text=Avatar"
                      alt="Member Avatar"
                      className="w-6 h-6 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-3/4 h-[95vh] overflow-y-auto scrollbar-hide">
            <iframe
              title="projectPdf"
              src={selectedProject.pdfLink}
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
            />
            <button
              className="bg-primary text-white px-4 py-2 rounded-md mt-4"
              onClick={handleProceed}
            >
              Proceed
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 ml-4"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isProceedModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-1/2 h-auto overflow-y-auto scrollbar-hide relative">
            <button
              className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-900 transition duration-300"
              onClick={handleCloseProceedModal}
            >
              <IoMdCloseCircle />
            </button>
            <div className="flex flex-col gap-4 p-4">
              <button
                className="bg-primary text-white px-4 py-2 rounded-md"
                onClick={() => console.log("Request for meeting clicked")}
              >
                Request a Meeting
              </button>
              <button
                className="bg-primary text-white px-4 py-2 rounded-md"
                onClick={() =>
                  console.log("Request further information clicked")
                }
              >
                Request further Information
              </button>
              <button
                className="bg-primary text-white px-4 py-2 rounded-md"
                onClick={() => console.log("Invest clicked")}
              >
                Invest
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
