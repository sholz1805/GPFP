import React, { useState } from "react";

const FurtherInfoModal = () => {
  
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
            
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="inquiries"
              >
               Your Inquiries
              </label>
              <textarea
                id="inquiries"
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

export default FurtherInfoModal;