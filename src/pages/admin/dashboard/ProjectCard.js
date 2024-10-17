const ProjectCard = ({ project }) => {
  return (
    <li className="flex justify-between text-sm items-center mb-2">
      <span >{project.name}</span>
      <span>{project.date}</span>
      <span
        className={`px-2 py-1 text-sm ${
          project.status === "Approved"
            ? "bg-green-400 text-xs"
            : project.status === "Pending"
            ? "bg-yellow-400 text-xs"
            : "bg-gray-400 text-xs"
        } text-white rounded`}
      >
        {project.status}
      </span>
    </li>
  );
};

export default ProjectCard;
