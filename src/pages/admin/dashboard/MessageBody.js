import React, { useEffect, useState } from "react";
import { FaUser, FaSpinner, FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleMessage } from "../../../redux/actions/adminActions";

const MessageBody = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { messageId } = useParams();
  const singleMessages = useSelector(
    (state) => state.admin.singleMessage || {}
  );
  const error = useSelector((state) => state.admin.error);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      await dispatch(fetchSingleMessage(messageId));
      setLoading(false);
    };

    if (messageId) {
      fetchMessages();
    }
  }, [dispatch, messageId]);

  const formatTitle = (title) => {
    return title
      .replace(/_/g, " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-primary">
        <FaSpinner size={30} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  const { data } = singleMessages;
  const userDto = data?.userDto || {};

  const renderBodyContent = () => {
    switch (data?.notificationType) {
      case "INVESTMENT_NOTIFICATION":
        return (
          <div className="px-6 py-2">
            <p>
              <span className="text-primary font-semibold">
                {userDto.fullName}
              </span>{" "}
              has expressed interest in investing in a project.
            </p>
            <p className="font-semibold mt-4 mb-2">Project Details</p>
            <p>
              Project ID:{" "}
              <span className="text-primary font-semibold">
                {data?.projectDTO?.projectUniqueId}
              </span>
            </p>
            <p>
              Project Name:{" "}
              <span className="text-primary font-semibold">
                {data?.projectDTO?.projectName}
              </span>
            </p>
            <p>
              Project Description:{" "}
              <span className="text-primary font-semibold">
                {data?.projectDTO?.projectDescription || "no description"}
              </span>
            </p>
            <p>
              Investment Amount: N
              <span className="text-primary font-semibold">
                {data?.investmentAmount}{" "}
              </span>
            </p>

            <p className="font-semibold mt-4 mb-2">Investor Details</p>
            <p>
              Investor ID:{" "}
              <span className="text-primary font-semibold">
                {userDto?.uniqueId}
              </span>
            </p>
            <p>
              Full Name:{" "}
              <span className="text-primary font-semibold">
                {userDto?.fullName}
              </span>
            </p>
            <p>
              Email:{" "}
              <span className="text-primary font-semibold">
                {userDto?.email}
              </span>
            </p>
          </div>
        );

      case "MORE_INFORMATION_REQUEST":
        return (
          <div>
            <p>
              <span className="text-primary font-semibold">
                {userDto.fullName}
              </span>{" "}
              has requested more information about a project.
            </p>
            <p className="font-semibold">Request Details</p>
            <p>{data?.requestDetails || "No specific details provided."}</p>
            <p className="font-semibold mt-4 mb-2">Project Details</p>
            <p>
              Project ID:{" "}
              <span className="text-primary font-semibold">
                {data?.projectDTO?.projectUniqueId}
              </span>
            </p>
            <p>
              Project Name:{" "}
              <span className="text-primary font-semibold">
                {data?.projectDTO?.projectName}
              </span>
            </p>
            <p>
              Project Description:{" "}
              <span className="text-primary font-semibold">
                {data?.projectDTO?.projectDescription || "no description"}
              </span>
            </p>

            <p className="font-semibold mt-4 mb-2">Requester Details</p>
            <p>
              ID:{" "}
              <span className="text-primary font-semibold">
                {userDto?.uniqueId}
              </span>
            </p>
            <p>
              Full Name:{" "}
              <span className="text-primary font-semibold">
                {userDto?.fullName}
              </span>
            </p>
            <p>
              Email:{" "}
              <span className="text-primary font-semibold">
                {userDto?.email}
              </span>
            </p>
          </div>
        );

      case "MEETING_REQUEST":
        return (
          <div>
            <p>
              {" "}
              <span className="text-primary font-semibold">
                {userDto.fullName}
              </span>{" "}
              has requested a meeting.
            </p>
            <p className="font-semibold">Meeting Details</p>
            <p>
              Date & Time :{" "}
              <span className="text-primary font-semibold">
                {data?.requestedDateTime
                  ? data.requestedDateTime.replace(" ", ", ")
                  : "Not specified"}
              </span>
            </p>

            <p>Additional Info: {data?.message || "no additional info"}</p>

            <p className="font-semibold mt-4 mb-2">Project Details</p>
            <p>
              Project ID:{" "}
              <span className="text-primary font-semibold">
                {data?.projectDTO?.projectUniqueId}
              </span>
            </p>
            <p>
              Project Name:{" "}
              <span className="text-primary font-semibold">
                {data?.projectDTO?.projectName}
              </span>
            </p>
            <p>
              Project Description:{" "}
              <span className="text-primary font-semibold">
                {data?.projectDTO?.projectDescription || "no description"}
              </span>
            </p>

            <p className="font-semibold mt-4 mb-2">Requester Details</p>
            <p>
              ID:{" "}
              <span className="text-primary font-semibold">
                {userDto?.uniqueId}
              </span>
            </p>
            <p>
              Full Name:{" "}
              <span className="text-primary font-semibold">
                {userDto?.fullName}
              </span>
            </p>
            <p>
              Email:{" "}
              <span className="text-primary font-semibold">
                {userDto?.email}
              </span>
            </p>
          </div>
        );

      default:
        return <p>Notification type not recognized.</p>;
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen w-full p-4">
      <div className="bg-white rounded-lg p-6 w-full h-full overflow-auto">
        <div className="flex justify-between items-center mb-4 border-b-2 border-gray-200">
          <h1 className="text-lg font-semibold text-primary  leading-10">
            {data?.notificationType
              ? formatTitle(data.notificationType)
              : "Notification Type Not Available"}
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center mb-2 bg-primary text-white text-sm rounded-md px-4 py-2 hover:bg-secondary"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
        </div>
        <div className="border-b-2 border-gray-200 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex justify-center items-center">
              <FaUser className="h-12 text-white" />
            </div>
            <div className="ml-4">
              <p className="font-semibold">{userDto.fullName}</p>
              <p className="text-gray-500">{userDto.email}</p>
            </div>
          </div>
        </div>
        <div className="text-gray-700 h-screen space-y-4 mt-2">
          {renderBodyContent()}
        </div>
      </div>
    </div>
  );
};

export default MessageBody;
