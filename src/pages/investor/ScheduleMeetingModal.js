import React, { useState } from "react";

const ScheduleMeetingModal = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:00am");

  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 14); 

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setDate(selectedDate);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg w-96 m-2 md:m-3">
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200"
              />
            </div>
            
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="dateAndTime"
              >
                Date and Time
              </label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  min={today.toISOString().split("T")[0]} 
                  max={maxDate.toISOString().split("T")[0]} 
                  onChange={handleDateChange}
                  className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200"
                />
                <select
                  id="time"
                  value={time}
                  onChange={handleTimeChange}
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
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="additionalNote"
              >
                Additional Note
              </label>
              <textarea
                id="additionalNote"
                className="appearance-none border rounded w-full text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-green-200 resize-none"
              ></textarea>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-primary hover:bg-secondary text-white w-full font-semibold py-2 px-4 rounded focus:outline-green-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleMeetingModal;