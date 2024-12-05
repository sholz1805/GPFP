import React, { useState, useEffect, useRef } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineLoading,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudinaryUpload from "../../../redux/CloudinaryUpload";
import { toast } from "react-toastify";
import InvestorProfileModal from "./InvestorProfileModal";
import ResponseModal from "../ResponseModal";
import {
  createInvestorProfile,
  fetchInvestorProfile,
} from "../../../redux/actions/profileActions";
import { useDispatch } from "react-redux";
import InfoModal from "../InfoModal";
/* eslint no-unused-vars: 0 */

const ReadOnlyTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: theme.palette.text.primary,
    cursor: "not-allowed",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.divider,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const ReadOnlyTextFieldComponent = ({
  label,
  value,
  onChange,
  onEdit,
  ...props
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      variant="standard"
      value={value}
      onChange={onChange}
      margin="normal"
      InputProps={{
        endAdornment: (
          <Button onClick={onEdit} className="absolute right">
            <AiOutlineEdit />
          </Button>
        ),
        readOnly: true,
        style: {
          cursor: "not-allowed",
        },
      }}
      {...props}
    />
  );
};

const InvestorProfile = () => {
  const [open, setOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [bvn, setBvn] = useState("");
  const [investmentExperience, setInvestmentExperience] = useState(0);
  const [expectation, setExpectation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editField, setEditField] = useState("");
  const [identificationMeans, setIdentificationMeans] = useState(null);
  const [meansOfIdName, setMeansOfIdName] = useState("");
  const [isFileUploadEditable, setIsFileUploadEditable] = useState(false);
  const [fileUploadError, setFileUploadError] = useState("");
  const [profile, setProfile] = useState({});

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const [initialDirectorFile, setInitialDirectorFile] = useState("");
  const [initialCacFile, setInitialCacFile] = useState("");
  const [initialMemartFile, setInitialMemartFile] = useState("");

  useEffect(() => {
    setInitialDirectorFile(identificationMeans);
    setInitialCacFile(identificationMeans);
    setInitialMemartFile(identificationMeans);
  }, [identificationMeans]);

  const dispatch = useDispatch();

  const UniqueId = localStorage.getItem('uniqueId')
  

  const inputRefs = {
    fullName: useRef(null),
    // phoneNumber: useRef(null),
    email: useRef(null),
    bvn: useRef(null),
    investmentExperience: useRef(null),
    expectation: useRef(null),
  };

  useEffect(() => {
    if (UniqueId !== null && UniqueId !== undefined) {
      const fetchUserProfile = async (UniqueId) => {
        try {
          const response = await dispatch(fetchInvestorProfile(UniqueId));
          const userProfile = response.payload;
          console.log(userProfile);

          if (userProfile && userProfile.error) {
            setProfileModalOpen(true);
            return;
          }

          if (userProfile) {
            setProfile(userProfile);
            console.log(userProfile);

            updateComponentState(userProfile);
          } else {
            console.error("Error fetching profile:");
            setProfileModalOpen(true);
          }
        } catch (error) {
          console.error("Error fetching profile:", error.message || error);
          setProfileModalOpen(true);
        }
      };

      fetchUserProfile(UniqueId);
    } else {
      setProfileModalOpen(true);
    }
  }, [dispatch, UniqueId]);

  const updateComponentState = (userProfile) => {
    setFullName(userProfile.data.username);
    setPhoneNumber(userProfile.data.phoneNumber);
    setEmail(userProfile.data.email);
    setBvn(userProfile.data.bvn);
    setInvestmentExperience (parseInt(userProfile.data.investmentExperience, 10) || 0);
    setExpectation(userProfile.data.expectation);
    setIdentificationMeans(userProfile.data.identificationMeans);
    setProfilePicture(userProfile.data.profilePicture);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setIsLoading(true);
      try {
        const response = await CloudinaryUpload(file, "profile_images");
        setProfilePicture(response.secure_url);
        setIsLoading(false);
      } catch (error) {
        console.error("Error uploading profile image to Cloudinary", error);
        setIsLoading(false);
      }
    } else {
      console.error("No file selected or file input is undefined");
    }
  };

  const handleRemoveImage = () => {
    setProfilePicture("");
  };

  const handleSave = () => {
    handleCreateProfile();
    setOpen(false);
  };

  const handleEdit = (field) => {
    setEditField(field);
    if (inputRefs[field] && inputRefs[field].current) {
      inputRefs[field].current.focus();
    }
    setOpen(true);
  };

  const handleFileUpload = async (event, setFileState, field) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const response = await CloudinaryUpload(file, "users_documents");
        setFileState(response.secure_url);
      } catch (error) {
        console.error("Error uploading file to Cloudinary", error);
        toast.error("Error uploading file. Please try again.");
      }
    }
  };

  const handleCreateProfile = async () => {
    setIsLoading(true);
    setResponseModalOpen(true);
    setResponseMessage("Saving profile...");

    try {
      const profileData = {
        uniqueId: UniqueId,
        fullName,
        // phoneNumber,
        // email,
        bvn,
        investmentExperience :  parseInt(investmentExperience, 10),
        expectation,
        identificationMeans,
        profilePicture,
      };

      const response = await dispatch(createInvestorProfile(profileData));

      if (response.error) {
        throw new Error(`Error creating profile: ${response.error}`);
      }

      if (response.data && response.data.data) {
        const newProfile = response.data.data;
        setProfile(newProfile);
        setResponseMessage("Profile created successfully!");
      } else {
        setResponseMessage("Profile created successfully!");
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      setResponseMessage(`Error creating profile: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-4 rounded-md mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-sm text-primary font-semibold">
            Investor's Profile
          </h1>
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            color="primary"
            startIcon={<AiOutlineEdit />}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-4">
        <div className="bg-white p-4 rounded-md lg:w-1/3 flex flex-col items-center justify-center relative">
          <div className="relative mb-4">
            <div className="w-60 h-60 rounded-full border-4 border-primary overflow-hidden relative group">
              <img
                src={profilePicture || "/images/profileImg.png"}
                alt="Profile"
                className={`w-full h-full object-cover ${
                  isLoading ? "opacity-50" : ""
                }`}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer">
                <div className="flex flex-col items-center">
                  <label
                    htmlFor="fileInput"
                    className="text-white text-2xl cursor-pointer"
                    onClick={handleImageUpload}
                  >
                    <AiOutlineEdit />
                  </label>
                  <button
                    onClick={handleRemoveImage}
                    className="text-white mt-2 text-xl"
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            </div>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {isLoading && (
            <AiOutlineLoading className="text-lime-500 animate-spin mb-2" />
          )}
          <p className="text-center text-primary font-medium text-xl">
            {fullName || "Full Name"}
          </p>
        </div>

        <div className="bg-white p-4 rounded-md lg:w-2/3 max-h-[80vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row lg:gap-4">
              <div className="relative w-full">
                <ReadOnlyTextFieldComponent
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onEdit={() => handleEdit("fullName")}
                />
              </div>
            </div>

             <div className="relative">
              <ReadOnlyTextFieldComponent
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onEdit={() => handleEdit("phoneNumber")}
              />
            </div>

             <div className="relative">
              <ReadOnlyTextFieldComponent
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onEdit={() => handleEdit("email")}
              />
            </div>

            <div className="relative">
              <ReadOnlyTextFieldComponent
                label="BVN"
                value={bvn}
                onChange={(e) => setBvn(e.target.value)}
                onEdit={() => handleEdit("bvn")}
              />
            </div>

            <div className="relative">
              <ReadOnlyTextFieldComponent
                label="Investment Experience"
                value={Number(investmentExperience)}
                onChange={(e) => setInvestmentExperience(e.target.value)}
                onEdit={() => handleEdit("investmentExperience")}
                type="number"
              />
            </div>

            <div className="relative">
              <ReadOnlyTextFieldComponent
                label="Expectation"
                value={expectation}
                onChange={(e) => setExpectation(e.target.value)}
                onEdit={() => handleEdit("expectation")}
              />
            </div>

            <div className="details-section">
              <hr className="my-4 border-primary" />

              <h3 className="block text-sm font-medium text-gray-700 mb-2">
                Means of Identification
              </h3>

              <div className="flex flex-wrap gap-4">
                <div className="w-full sm:w-1/3 px-2 mb-4">
                  <label
                    htmlFor="means-of-id-upload"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Upload Means of Identification
                  </label>
                  {identificationMeans && typeof identificationMeans === "string" ? (
                    <div className="flex items-center border rounded-md border-gray-300 p-2">
                      <span className="block w-full text-sm text-gray-500">
                        {identificationMeans.substring(0, 20) + "..."}
                      </span>
                      <i className="text-gray-500">
                        <AiOutlineCloudUpload />
                      </i>
                    </div>
                  ) : (
                    <div className="flex items-center border rounded-md border-gray-300 p-2">
                      <input
                        type="file"
                        id="means-of-id-upload"
                        accept=".pdf, .jpg, .jpeg, .png,"
                        onChange={(e) =>
                          handleFileUpload(e, setIdentificationMeans, "identificationMeans")
                        }
                        className="block w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0
                      file:text-sm file:font-semibold file:bg-green-50 cursor-pointer file:text-primary hover:file:bg-secondary-100"
                      />
                      <i className="text-gray-500">
                        <AiOutlineCloudUpload />
                      </i>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <InvestorProfileModal
          open={open}
          setOpen={setOpen}
          // fullName={fullName}
          // setFullName={setFullName}
          // phoneNumber={phoneNumber}
          // setPhoneNumber={setPhoneNumber}
          // email={email}
          // setEmail={setEmail}
          bvn={bvn}
          setBvn={setBvn}
          investmentExperience={investmentExperience}
          setInvestmentExperience={setInvestmentExperience}
          expectation={expectation}
          setExpectation={setExpectation}
          identificationMeans={identificationMeans}
          setIdentificationMeans={setIdentificationMeans}
          handleSave={handleSave}
        />

        <ResponseModal
          isOpen={responseModalOpen}
          toggle={() => setResponseModalOpen(false)}
          message={responseMessage}
          status={
            responseMessage.includes("successfully") ? "success" : "error"
          }
          isLoading={isLoading}
        />

        <InfoModal
          isOpen={profileModalOpen}
          toggle={() => setProfileModalOpen(false)}
          title="Complete Your Profile"
          message="Please complete your profile to proceed."
          buttonText="OK"
        />
      </div>
    </div>
  );
};

export default InvestorProfile;
