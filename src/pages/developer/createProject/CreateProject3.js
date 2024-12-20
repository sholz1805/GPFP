import React, { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { createProject } from "../../../redux/actions/projectActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import ResponseModal from "./ResponseModal";
import ConfirmSaveModal from "./ConfirmSaveModal";
import axios from "axios";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

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

      setShowResponseModal(true);

      dispatch(createProject(updatedFormData))
        .then((response) => {
          setResponse(response);
          setError(null);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setResponse(null);
          setLoading(false);
        });
    }
  };

  const handleConfirmCancel = () => {
    setShowConfirmModal(false);
  };

  const handleResponseClose = () => {
    setShowResponseModal(false);
    setLoading(false);
    setResponse(null);
    setError(null);
  };

  useEffect(() => {
    if (response) {
      setLoading(false);
      if (response.statusCode === 200 || response.statusCode === 201) {
        setTimeout(() => {
          localStorage.removeItem("formData");
          navigate("/developer-dashboard");
        }, 5000);
      } else {
        setShowResponseModal(true);
      }
    }
  }, [response, navigate]);

  useEffect(() => {
    if (error) {
      setLoading(false);
      setTimeout(() => {
        setShowResponseModal(false);
      }, 5000);
    }
  }, [error]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://greenpower-stage-71fa5ec0b66d.herokuapp.com/api/v1/add/project/save-for-later",
        formData
      );
      console.log("Saved successfully:", response.data);
      setMessage({ text: "Project saved successfully!", type: "success" });

      setTimeout(() => {
        setIsLoading(false);
        setIsModalOpen(false);
        navigate("/developer-dashboard");
      }, 3000);
    } catch (error) {
      console.error("Error saving project:", error);
      setMessage({
        text: "Error saving project. Please try again.",
        type: "error",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center px-12 pt-4">
        <img src="images/gpfpLogo.svg" alt="Logo" className="h-8 mt-4" />
        <div className="flex justify-between items-center gap-5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-secondary hover:bg-primary text-white font-medium py-2 px-4 rounded transition ease-in-out duration-300"
          >
            Save
          </button>
        </div>
      </div>
      <div className="max-w-2xl px-10 sm:mx-4 sm:pt-6">
        <h2 className="text-xl font-semibold mb-4 my-4 text-[#515151]">
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
            value={Number(formData.equipmentCost || 0)}
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
            value={Number(formData.developmentCost || 0)}
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
            value={Number(formData.epcCost || 0)}
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
            value={Number(formData.expectedAverageMonthlyRevenue || 0)}
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
            value={Number(formData.connectionFeePerConnection || 0)}
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
            value={Number(formData.averageMonthlyRevenuePerConnection || 0)}
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
              value={Number(formData.equityPayoutStructure || 0)}
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
              value={Number(formData.debtPercentage || 0)}
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
          onClose={handleResponseClose}
          response={response}
          error={error}
          loading={loading}
        />
        <ConfirmSaveModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isLoading={isLoading}
          onConfirm={handleSave}
          message={message}
        />
      </div>
    </>
  );
};

export default CreatePage3;
