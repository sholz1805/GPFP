import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateProject2 = () => {
  const [formData, setFormData] = useState({
    submittedProjectDataSheet: "",
    signedPpaAgreement: "",
    hasIceCertificate: "",
    genderActionPlan: "",
    hasHsePolicy: "",
    doneInspection: "",
    submittedRequiredDocuments: "",
    fundReleased: "",
    signedExclusivAgreement: "",
    doneSiteAssessment: "",
    doneCommunityEngagement: "",
    doneActivityValuation: "",
    doneEia: "",
    finalisedSystemDesign: "",
    metLicensingRequirements: "",
    doneCustomerClassification: "",
    completedLandAcquisition: "",
    doneSpvOperationAccounts:" ",
    setUpCollectionAccounts:"",
    signedInvestorAgreement:"",
    achievedFinancialClose: "",
    completedInstallation:"",
    performedTests:"",
    initiatedCollection:"",
    ensuredMonthlyPayment:"",

  
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    localStorage.setItem(
      "formData",
      JSON.stringify({ ...formData, [name]: value })
    );
  };

  const navigate = useNavigate();
  const handleNextPage = () => {
    // console.log(formData);
    navigate("/create-project-page3");
  };

  const handleBack = () => {
    navigate("/create-project");
  };

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  const grantApproval = [
    {
      label: "Has the Project Data Sheet been submitted?",
      name: "submittedProjectDataSheet",
    },
    {
      label: "Has the PPA Agreement been signed?",
      name: "signedPpaAgreement",
    },
    {
      label: "Is the IEC Certificate System available?",
      name: "hasIceCertificate",
    },
    {
      label: "Is the Gender Action Plan in place?",
      name: "genderActionPlan",
    },
    {
      label: "Has the HSE Policy been established?",
      name: "hasHsePolicy",
    },
  ];

  const grantPayment = [
    {
      label: "Has the Inspection been completed?",
      name: "doneInspection",
    },
    {
      label: "Have all required Documents been submitted?",
      name: "submittedRequiredDocuments",
    },
    {
      label: "Has the Fund been released?",
      name: "fundReleased",
    },
  ];

  const siteQualification = [
    {
      label: "Is the Exclusive Agreement signed?",
      name: "signedExclusivAgreement",
    },
    {
      label: "Has a Preliminary Site Assessment been conducted?",
      name: "doneSiteAssessment",
    },
    {
      label: "Has the Community Engagement been completed?",
      name: "doneCommunityEngagement",
    },
    {
      label: "Has the Activity Valuation been performed?",
      name: "doneActivityValuation",
    },
  ];

  const designAndPlanning = [
    {
      label: "Has an EIA (Environmental Impact Assessment) been conducted?",
      name: "doneEia",
    },
    {
      label: "Is the System Design finalized?",
      name: "finalisedSystemDesign",
    },
    {
      label: "Have all Licensing and Permitting requirements been met?",
      name: "metLicensingRequirements",
    },
    {
      label: "Has the Customer Classification been done?",
      name: "doneCustomerClassification",
    },
    {
      label: "Has Land Acquisition been completed?",
      name: "completedLandAcquisition",
    },
  ];

  const financialClose = [
    {
      label: "Are the SPV Operations Accounts in place?",
      name: "doneSpvOperationAccounts",
    },
    {
      label: "Are the Collection Accounts set up?",
      name: "setUpCollectionAccounts",
    },
    {
      label: "Has the Investor Agreement been signed?",
      name: "signedInvestorAgreement",
    },
    {
      label: "Has Financial Close been achieved?",
      name: "achievedFinancialClose",
    },

  ]

  const implementation = [
    {
      label: "Has the Installation been completed?",
      name: "completedInstallation",
    },
    {
      label: "Have all Tests been performed?",
      name: "performedTests",
    },
    {
      label: "Has Collection been initiated?",
      name: "initiatedCollection",
    },
    {
      label: "Is Monthly Payment being ensured?",
      name: "ensuredMonthlyPayment",
    },

  ]

  return (
    <div className="max-w-2xl px-10 sm:mx-4 sm:pt-6">
      <img src="images/gpfpLogo.svg" alt="Logo" className="h-8 mt-6" />
      <h2 className="text-xl font-semibold mb-4 my-8 text-[#515151]">
        4. Project Status
      </h2>
      <div className="mb-8">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="grantApproval"
        >
          Grant Approval
        </label>
        {grantApproval.map((question, index) => (
          <div key={index} className="mb-4">
            <p>{question.label}</p>
            <div className="flex items-center">
              <input
                type="radio"
                id={`${question.name}Yes`}
                name={question.name}
                value="Yes"
                checked={formData[question.name] === "Yes"}
                onChange={handleRadioChange}
              />
              <label className="ml-2" htmlFor={`${question.name}Yes`}>
                Yes
              </label>
              <input
                type="radio"
                id={`${question.name}No`}
                name={question.name}
                value="No"
                checked={formData[question.name] === "No"}
                onChange={handleRadioChange}
                className="ml-4"
              />
              <label className="ml-2" htmlFor={`${question.name}No`}>
                No
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="grantPayment"
        >
          Grant Payment
        </label>
        {grantPayment.map((question, index) => (
          <div key={index} className="mb-4">
            <p>{question.label}</p>
            <div className="flex items-center">
              <input
                type="radio"
                id={`${question.name}Yes`}
                name={question.name}
                value="Yes"
                checked={formData[question.name] === "Yes"}
                onChange={handleRadioChange}
              />
              <label className="ml-2" htmlFor={`${question.name}Yes`}>
                Yes
              </label>
              <input
                type="radio"
                id={`${question.name}No`}
                name={question.name}
                value="No"
                checked={formData[question.name] === "No"}
                onChange={handleRadioChange}
                className="ml-4"
              />
              <label className="ml-2" htmlFor={`${question.name}No`}>
                No
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="siteQualification"
        >
          Site Qualification
        </label>
        {siteQualification.map((question, index) => (
          <div key={index} className="mb-4">
            <p>{question.label}</p>
            <div className="flex items-center">
              <input
                type="radio"
                id={`${question.name}Yes`}
                name={question.name}
                value="Yes"
                checked={formData[question.name] === "Yes"}
                onChange={handleRadioChange}
              />
              <label className="ml-2" htmlFor={`${question.name}Yes`}>
                Yes
              </label>
              <input
                type="radio"
                id={`${question.name}No`}
                name={question.name}
                value="No"
                checked={formData[question.name] === "No"}
                onChange={handleRadioChange}
                className="ml-4"
              />
              <label className="ml-2" htmlFor={`${question.name}No`}>
                No
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="designAndPlanning"
        >
          Design and Planning
        </label>
        {designAndPlanning.map((question, index) => (
          <div key={index} className="mb-4">
            <p>{question.label}</p>
            <div className="flex items-center">
              <input
                type="radio"
                id={`${question.name}Yes`}
                name={question.name}
                value="Yes"
                checked={formData[question.name] === "Yes"}
                onChange={handleRadioChange}
              />
              <label className="ml-2" htmlFor={`${question.name}Yes`}>
                Yes
              </label>
              <input
                type="radio"
                id={`${question.name}No`}
                name={question.name}
                value="No"
                checked={formData[question.name] === "No"}
                onChange={handleRadioChange}
                className="ml-4"
              />
              <label className="ml-2" htmlFor={`${question.name}No`}>
                No
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="financialClose"
        >
          Financial Close
        </label>
        {financialClose.map((question, index) => (
          <div key={index} className="mb-4">
            <p>{question.label}</p>
            <div className="flex items-center">
              <input
                type="radio"
                id={`${question.name}Yes`}
                name={question.name}
                value="Yes"
                checked={formData[question.name] === "Yes"}
                onChange={handleRadioChange}
              />
              <label className="ml-2" htmlFor={`${question.name}Yes`}>
                Yes
              </label>
              <input
                type="radio"
                id={`${question.name}No`}
                name={question.name}
                value="No"
                checked={formData[question.name] === "No"}
                onChange={handleRadioChange}
                className="ml-4"
              />
              <label className="ml-2" htmlFor={`${question.name}No`}>
                No
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="implementation"
        >
          Implementation
        </label>
        {implementation.map((question, index) => (
          <div key={index} className="mb-4">
            <p>{question.label}</p>
            <div className="flex items-center">
              <input
                type="radio"
                id={`${question.name}Yes`}
                name={question.name}
                value="Yes"
                checked={formData[question.name] === "Yes"}
                onChange={handleRadioChange}
              />
              <label className="ml-2" htmlFor={`${question.name}Yes`}>
                Yes
              </label>
              <input
                type="radio"
                id={`${question.name}No`}
                name={question.name}
                value="No"
                checked={formData[question.name] === "No"}
                onChange={handleRadioChange}
                className="ml-4"
              />
              <label className="ml-2" htmlFor={`${question.name}No`}>
                No
              </label>
            </div>
          </div>
        ))}
      </div>

<div className="flex justify-start gap-4">
      <button
        onClick={handleBack}
        className="bg-secondary hover:bg-primary my-6 text-white font-medium py-2 px-4 rounded"
      >
        Previous Page
      </button>
      <button
        onClick={handleNextPage}
        className="bg-primary hover:bg-secondary my-6 text-white font-medium py-2 px-4 rounded"
      >
        Next Page
      </button>
      </div>
    </div>
  );
};

export default CreateProject2;
