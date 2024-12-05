import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { requestMeeting } from "../../redux/actions/availableProjectActions";
import { useDispatch } from "react-redux";

const MeetingModal = ({
  onClose,
  userUniqueId,
  projectUniqueId,
  onSuccess,
  onError,
}) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:00am");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 14);

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const meetingDateTime = `${date.toISOString().split("T")[0]} ${time}`;
    const meetingDetails = {
      userUniqueId,
      projectUniqueId,
      message,
      meetingDateTime,
    };

    try {
      await dispatch(requestMeeting(meetingDetails));
      onSuccess("Meeting request sent successfully!");
      onClose();
    } catch (err) {
      const errorMessage = "Failed to send meeting request. Please try again.";
      console.log(err);
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
          Set Up a Meeting
        </p>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-xs font-semibold mb-2"
            htmlFor="dateAndTime"
          >
            Date and Time
          </label>
          <div className="flex space-x-2">
            <input
              type="date"
              min={today.toISOString().split("T")[0]}
              max={maxDate.toISOString().split("T")[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200"
            />
            <select
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-green-200"
            >
              <option value="10:00am">10:00am</option>
              <option value="11:00am">11:00am</option>
              <option value="12:00pm">12:00pm</option>
              <option value="1:00pm">1:00pm</option>
              <option value="2:00pm">2:00pm</option>
              <option value="3:00pm">3:00pm</option>
              <option value="4:00pm">4:00pm</option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-xs font-semibold mb-2"
            htmlFor="additionalNote"
          >
            Additional Note
          </label>
          <textarea
            id="additionalNote"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="appearance-none border rounded w-full text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-green-200 resize-none"
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

export default MeetingModal;
