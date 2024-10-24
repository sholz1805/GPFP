import React from "react";

const InvestModal = () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg w-96 m-2 md:m-3">
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="investmentAmount"
              >
                Proposed Investment Amount
              </label>
              <input
                id="investmentAmount"
                type="text"
                className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="investmentType"
              >
                Investment Type
              </label>
              <select
                id="investmentType"
                className="appearance-none border rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-green-200"
              >
                <option value="">Select an option</option>
                <option value="equity">Equity</option>
                <option value="debt">Debt</option>
              </select>
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

export default InvestModal;
