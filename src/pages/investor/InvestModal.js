import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { requestInvestment } from "../../redux/actions/availableProjectActions";
import { useDispatch } from "react-redux";

const InvestModal = ({
  onClose,
  userUniqueId,
  projectUniqueId,
  onSuccess,
  onError,
}) => {
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [investmentType, setInvestmentType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const investmentDetails = {
      userUniqueId,
      projectUniqueId,
      investmentAmount,
      investmentType,
    };

    try {
      await dispatch(requestInvestment(investmentDetails));
      onSuccess("Investment successful!");
      onClose();
    } catch (err) {
      const errorMessage = "Investment failed. Please try again.";
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
        <p className="text-primary font-semibold text-sm mb-2">Invest</p>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-xs font-semibold mb-2"
            htmlFor="investmentAmount"
          >
            Investment Amount
          </label>
          <input
            id="investmentAmount"
            type="text"
            className="appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200"
            onChange={(e) => setInvestmentAmount(e.target.value)}
            value={investmentAmount}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-xs font-semibold mb-2"
            htmlFor="investmentType"
          >
            Investment Type
          </label>
          <select
            id="investmentType"
            className="appearance-none border rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-green-200"
            value={investmentType}
            onChange={(e) => setInvestmentType(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="equity">Equity</option>
            <option value="debt">Debt</option>
          </select>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-primary hover:bg-secondary text-center text-xs text-white w-full font-semibold py-2 px-4 rounded focus:outline-green-200"
            disabled={isLoading}
          >
            {isLoading ? "loading" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvestModal;
