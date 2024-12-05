import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { requestInformation } from "../../redux/actions/availableProjectActions";

const FurtherInfoModal = ({
  onClose,
  userUniqueId,
  projectUniqueId,
  onSuccess,
  onError,
}) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const info = {
      userUniqueId,
      projectUniqueId,
      message,
    };

    try {
      await dispatch(requestInformation(info));
      onSuccess("Request for further information sent successfully!");
      onClose();
    } catch (err) {
      const errorMessage = "Failed to send request. Please try again.";
      setError(errorMessage);
      onError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg w-96 m-2 md:m-3 relative">
      <button
        className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-900 transition duration-300"
        onClick={onClose}
      >
        <IoMdCloseCircle />
      </button>
      <form onSubmit={handleSubmit}>
        <p className="text-primary font-semibold text-sm mb-2">
          Request Further Information
        </p>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-xs font-semibold mb-2"
            htmlFor="inquiries"
          >
            Your Enquiries
          </label>
          <textarea
            id="inquiries"
            className="appearance-none border rounded w-full text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-green-200 resize-none"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-primary hover:bg-secondary text-xs text-white w-full font-semibold py-2 px-4 rounded focus:outline-green-200"
            disabled={isLoading}
          >
            {isLoading ? "loading" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FurtherInfoModal;
