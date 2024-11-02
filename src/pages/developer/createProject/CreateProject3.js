import React, { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { createProject } from "../../../redux/actions/projectActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import ResponseModal from "./ResponseModal";

const CreatePage3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormData = {
    equipmentCost: "",
    developmentCost: "",
    epcCost: "",
    expectedAverageMonthlyRevenue: "",
    connectionFeePerConnection: "",
    averageMonthlyRevenuePerConnection: "",
    fundingStructure: "",
    equityPayoutStructure: "",
    debtPercentage: "",
  };

  const uniqueId = localStorage.getItem("uniqueId");
  const [formData, setFormData] = useLocalStorage("formData", {
    ...initialFormData,
    userUniqueId: uniqueId,
  });
  const [fundingStructure, setFundingStructure] = useState(
    formData.fundingStructure
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "number" ? (value === "" ? 0 : +value) : value,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFundingStructureChange = (e) => {
    const selectedFundingStructure = e.target.value;
    setFundingStructure(selectedFundingStructure);
    if (selectedFundingStructure === "both") {
      setFormData({ ...formData, fundingStructure: "Equity & Debt" });
    } else {
      setFormData({ ...formData, fundingStructure: selectedFundingStructure });
    }
  };

  const handleBack = () => {
    navigate("/create-project-page2");
  };

  const handleSubmit = () => {
    if (!loading) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmSubmit = () => {
    if (!loading) {
      setLoading(true);
      const updatedFormData = { ...formData, userUniqueId: uniqueId };
      dispatch(createProject(updatedFormData))
        .then((response) => {
          setResponse(response);
          setLoading(false);
          setShowResponseModal(true);
          setShowConfirmModal(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
          setShowResponseModal(true);
          setShowConfirmModal(false);
        });
    }
  };

  const handleConfirmCancel = () => {
    setShowConfirmModal(false);
  };

  // const handleResponseClose = () => {
  //   setShowResponseModal(false);
  //   setLoading(false);
  // };

  useEffect(() => {
    if (
      response &&
      (response.statusCode === 200 || response.statusCode === 201)
    ) {
      setShowResponseModal(false);
      setLoading(false);
      setTimeout(() => {
        localStorage.clear();
      }, 2000);
    }
  }, [response]);

  useEffect(() => {
    if (error) {
      setLoading(false);
      setTimeout(() => {
        setShowResponseModal(false);
      }, 5000);
    }
  }, [error]);

  return (
    <div className="max-w-2xl px-10 sm:mx-4 sm:pt-6">
      <img src="images/gpfpLogo.svg" alt="Logo" className="h-8 mt-6" />
      <h2 className="text-xl font-semibold mb-4 my-8 text-[#515151]">
        5. Investment Cost
      </h2>
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="equipmentCost"
        >
          Equipment Cost
        </label>
        <input
          type="number"
          id="equipmentCost"
          name="equipmentCost"
          value={Number(formData.equipmentCost)}
          onChange={handleChange}
          className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="developmentCost"
        >
          Development Cost
        </label>
        <input
          type="number"
          id="developmentCost"
          name="developmentCost"
          value={Number(formData.developmentCost)}
          onChange={handleChange}
          className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="epcCost">
          EPC Cost
        </label>
        <input
          type="number"
          id="epcCost"
          name="epcCost"
          value={Number(formData.epcCost)}
          onChange={handleChange}
          className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <h2 className="text-xl font-semibold mb-4 my-8 text-[#515151]">
        6. Revenue
      </h2>
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="expectedAverageMonthlyRevenue"
        >
          What is the Average Monthly Revenue Expected?
        </label>
        <input
          type="number"
          id="expectedAverageMonthlyRevenue"
          name="expectedAverageMonthlyRevenue"
          value={Number(formData.expectedAverageMonthlyRevenue)}
          onChange={handleChange}
          className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="connectionFeePerConnection"
        >
          Connection fee per connection?
        </label>
        <input
          type="number"
          id="connectionFeePerConnection"
          name="connectionFeePerConnection"
          value={Number(formData.connectionFeePerConnection)}
          onChange={handleChange}
          className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="averageMonthlyRevenuePerConnection"
        >
          What is the Average Monthly Revenue Per Connection?
        </label>
        <input
          type="number"
          id="averageMonthlyRevenuePerConnection"
          name="averageMonthlyRevenuePerConnection"
          value={Number(formData.averageMonthlyRevenuePerConnection)}
          onChange={handleChange}
          className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <h2 className="text-xl font-semibold mb-4 my-8 text-[#515151]">
        7. Funding
      </h2>
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="fundingStructure"
        >
          What is the Funding Structure?
        </label>
        <div className="flex flex-col">
          <div className="mb-2">
            <input
              type="radio"
              id="equity"
              name="fundingStructure"
              value="equity"
              checked={fundingStructure === "equity"}
              onChange={handleFundingStructureChange}
            />
            <label className="ml-2" htmlFor="equity">
              Equity
            </label>
          </div>
          <div className="mb-2">
            <input
              type="radio"
              id="debt"
              name="fundingStructure"
              value="debt"
              checked={fundingStructure === "debt"}
              onChange={handleFundingStructureChange}
            />
            <label className="ml-2" htmlFor="debt">
              Debt
            </label>
          </div>
          <div className="mb-2">
            <input
              type="radio"
              id="both"
              name="fundingStructure"
              value="both"
              checked={fundingStructure === "both"}
              onChange={handleFundingStructureChange}
            />
            <label className="ml-2" htmlFor="both">
              Both
            </label>
          </div>
        </div>
      </div>

      {(fundingStructure === "equity" || fundingStructure === "both") && (
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="equityPayoutStructure"
          >
            What is the Equity Payout Structure?
          </label>
          <input
            type="number"
            id="equityPayoutStructure"
            name="equityPayoutStructure"
            value={Number(formData.equityPayoutStructure)}
            onChange={(e) => {
              setFormData({
                ...formData,
                equityPayoutStructure: e.target.value,
              });
            }}
            className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      )}

      {(fundingStructure === "debt" || fundingStructure === "both") && (
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="debtPercentage"
          >
            Debt Percentage
          </label>
          <input
            type="number"
            id="debtPercentage"
            name="debtPercentage"
            value={Number(formData.debtPercentage)}
            onChange={(e) => {
              setFormData({ ...formData, debtPercentage: +e.target.value });
            }}
            className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      )}
      <div className="flex justify-start gap-4">
        <button
          className="bg-secondary hover:bg-primary my-6 text-white font-medium py-2 px-4 rounded-md focus:outline-none"
          onClick={handleBack}
        >
          back
        </button>
        <button
          className="bg-primary hover:bg-secondary my-6 text-white font-medium py-2 px-4 rounded-md focus:outline-none"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={handleConfirmCancel}
        onSubmit={handleConfirmSubmit}
        loading={loading}
      />
      <ResponseModal
        isOpen={showResponseModal}
        onClose={() => setShowResponseModal(false)}
        response={response}
        error={error}
        loading={loading}
      />
    </div>
  );
};

export default CreatePage3;
