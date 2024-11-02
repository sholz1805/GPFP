import React, { useEffect } from "react";
import NaijaStates from "naija-state-local-government";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCaretDown } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

const CreateProject = () => {
  const location = useLocation();
  const uniqueId = location.state;
  // const uniqueId =
  //   location?.state?.uniqueId || localStorage.getItem("uniqueId");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initialFormData = {
    userUniqueId: uniqueId,
    projectName: "",
    projectLocation: {
      state: "",
      lga: "",
    },
    technology: "",
    type: "",
    projectStartDate: new Date(),
    description: "",
    offTakerName: "",
    offTakerDetails: "",
    projectDuration: "",
    peakCapacity: "",
    batteryStorageCapacity: "",
    inverterCapacity: "",
    powerSourceCapacity: "",
    connectionCount: "",
    projectGrant: "",
    grantType: "",
    otherGrantType: "",
  };

  const [formData, setFormData] = useLocalStorage("formData", initialFormData);

  const states = NaijaStates.states();

  const selectedStateData = formData.projectLocation?.state ? NaijaStates.lgas(formData.projectLocation.state) : null;
  const lgas = selectedStateData ? selectedStateData.lgas : [];

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({
      ...formData,
      projectLocation: {
        ...formData.projectLocation,
        state: selectedState,
        lga: "",
      },
    });
  };

  const handleLgaChange = (e) => {
    const selectedLga = e.target.value;
    setFormData({
      ...formData,
      projectLocation: { ...formData.projectLocation, lga: selectedLga },
    });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, projectStartDate: date });
  };

  const today = new Date();
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(today.getFullYear() + 1);

  const handleRadioChange = (e) => {
    setFormData({ ...formData, projectGrant: e.target.value });
  };
  const handleSelectChange = (e) => {
    setFormData({ ...formData, grantType: e.target.value });
  };

  const handleTextChange = (e) => {
    setFormData({ ...formData, otherGrantType: e.target.value });
  };

  const navigate = useNavigate();
  const handleNextPage = () => {
    // console.log(formData);
    navigate("/create-project-page2");
  };
  return (
    <div className="max-w-2xl px-10 sm:mx-4 sm:pt-6">
      <img src="images/gpfpLogo.svg" alt="Logo" className="h-8 mt-6" />
      <h2 className="text-xl font-semibold mb-4 my-8 text-[#515151]">
        1. Project Details
      </h2>
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="projectName"
        >
          Project Name
        </label>
        <input
          type="text"
          id="projectName"
          margin="normal"
          value={formData.projectName}
          onChange={(e) =>
            setFormData({ ...formData, projectName: e.target.value })
          }
          className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="projectLocation"
        >
          Project Location
        </label>
        <div className="flex flex-wrap -mx-3">
          <div className="w-1/2 px-3 relative">
            <select
              id="projectLocationState"
              value={formData.projectLocation?.state || ""}
              onChange={handleStateChange}
              className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select State</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-8 pointer-events-none">
              <FaCaretDown />
            </div>
          </div>
          <div className="w-1/2 px-3 relative">
            {formData.projectLocation?.state && (
              <>
                <select
                  id="projectLocationLga"
                  value={formData.projectLocation?.lga}
                  onChange={handleLgaChange}
                  className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select LGA</option>
                  {Array.isArray(lgas) && lgas.length > 0 ? (
                    lgas.map((lga, index) => (
                      <option key={index} value={lga}>
                        {lga}
                      </option>
                    ))
                  ) : (
                    <option value="">No LGAs available</option>
                  )}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-8 pointer-events-none">
                  <FaCaretDown />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mb-4 relative">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="technology"
        >
          Technology
        </label>
        <select
          id="technology"
          value={formData.technology}
          onChange={(e) =>
            setFormData({ ...formData, technology: e.target.value })
          }
          className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="Solar">Solar</option>
          <option value="Wind">Wind</option>
          <option value="Gas">Gas</option>
          <option value="Hydro">Hydro</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-5 pt-7 pointer-events-none">
          <FaCaretDown className="p-0" />
        </div>
      </div>
      <div className="mb-4 relative">
        <label className="block text-sm font-semibold mb-2" htmlFor="type">
          Project Type
        </label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="SHS - Solar Home System">
            SHS - Solar Home System
          </option>
          <option value="C&I - Commercial and Industrial">
            C&I - Commercial and Industrial
          </option>
          <option value="Residential">Residential</option>
          <option value="Productive Use">Productive Use</option>
          <option value="C&I and Productive use">C&I and Productive use</option>
          <option value="Productive & Residential">
            Productive & Residential
          </option>
          <option value="C&I and Residential">C&I and Residential</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-5 pt-7 pointer-events-none">
          <FaCaretDown className="p-0" />
        </div>
      </div>
      <div className="my-4">
        <label className="block text-sm font-medium text-gray-700">
          Proposed Start Date
        </label>
        <div className="appearance-none border rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <DatePicker
            selected={formData.projectStartDate}
            onChange={handleDateChange}
            dateFormat="dd-MM-yyyy"
            minDate={today}
            maxDate={oneYearFromNow}
            className="appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="description"
        >
          Project Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="appearance-none resize-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="offTakerName"
        >
          Name of Off-taker
        </label>
        <input
          type="text"
          id="offTakerName"
          value={formData.offTakerName}
          onChange={(e) =>
            setFormData({ ...formData, offTakerName: e.target.value })
          }
          className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="offTakerDetails"
        >
          Off-taker Details
        </label>
        <textarea
          id="offTakerDetails"
          value={formData.offTakerDetails}
          onChange={(e) =>
            setFormData({ ...formData, offTakerDetails: e.target.value })
          }
          className="appearance-none resize-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4 relative">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="projectDuration"
        >
          Contract Duration (Years)
        </label>
        <select
          id="projectDuration"
          value={formData.projectDuration}
          onChange={(e) =>
            setFormData({ ...formData, projectDuration: +e.target.value })
          }
          className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {Array.from({ length: 25 }, (_, i) => i + 1).map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-5 pt-7 pointer-events-none">
          <FaCaretDown className="p-0" />
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4 my-16 text-[#515151]">
        2. Project Configuration
      </h2>
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="peakCapacity"
        >
          Peak Capacity
        </label>
        <input
          type="number"
          id="peakCapacity"
          value={formData.peakCapacity}
          onChange={(e) =>
            setFormData({ ...formData, peakCapacity: +e.target.value })
          }
          className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="batteryStorageCapacity"
        >
          Battery Storage Capacity
        </label>
        <input
          type="number"
          id="batteryStorageCapacity"
          value={formData.batteryStorageCapacity}
          onChange={(e) =>
            setFormData({
              ...formData,
              batteryStorageCapacity: +e.target.value,
            })
          }
          className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="inverterCapacity"
        >
          Inverter Capacity
        </label>
        <input
          type="number"
          id="inverterCapacity"
          value={formData.inverterCapacity}
          onChange={(e) =>
            setFormData({ ...formData, inverterCapacity: +e.target.value })
          }
          className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="powerSourceCapacity"
        >
          Power Source Capacity
        </label>
        <input
          type="number"
          id="powerSourceCapacity"
          value={formData.powerSourceCapacity}
          onChange={(e) =>
            setFormData({ ...formData, powerSourceCapacity: +e.target.value })
          }
          className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="connectionCount"
        >
          Number of Connections
        </label>
        <input
          type="number"
          id="connectionCount"
          value={formData.connectionCount}
          onChange={(e) =>
            setFormData({ ...formData, connectionCount: +e.target.value })
          }
          className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 my-16 text-[#515151]">
          3. Does your project qualify for any Grant?
        </h2>
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2"
            htmlFor="projectGrant"
          >
            Qualifies for Grant
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              id="yes"
              value="Yes"
              checked={formData.projectGrant === "Yes"}
              onChange={handleRadioChange}
            />
            <label className="ml-2" htmlFor="yes">
              Yes
            </label>
            <input
              type="radio"
              id="no"
              value="No"
              checked={formData.projectGrant === "No"}
              onChange={handleRadioChange}
              className="ml-4"
            />
            <label className="ml-2" htmlFor="no">
              No
            </label>
          </div>
        </div>

        {formData.projectGrant === "Yes" && (
          <div>
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="grantType"
              >
                Select one of these grants
              </label>
              <div className="appearance-none relative border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <select
                  id="grantType"
                  value={formData.grantType}
                  onChange={handleSelectChange}
                  className="appearance-none p-2 focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select a grant</option>
                  <option value="REA">REA</option>
                  <option value="UEF">UEF</option>
                  <option value="Others">Others</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
                  <FaCaretDown className="p-0" />
                </div>
              </div>
            </div>

            {formData.grantType === "Others" && (
              <div className="mb-4">
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="otherGrantType"
                >
                  Specify and add link to the information about the Grant
                </label>
                <textarea
                  id="otherGrantType"
                  value={formData.otherGrantType}
                  onChange={handleTextChange}
                  className="appearance-none border resize-none rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            )}
          </div>
        )}
      </div>
      <button
        onClick={handleNextPage}
        className="bg-primary hover:bg-secondary my-6 text-white font-medium py-2 px-4 rounded"
      >
        Next Page
      </button>
    </div>
  );
};

export default CreateProject;
