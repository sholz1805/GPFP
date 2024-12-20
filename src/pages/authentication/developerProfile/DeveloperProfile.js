import React, { useState, useEffect, useRef } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineLoading,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { MdDashboard } from "react-icons/md";

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
import ProfileModal from "./ProfileModal";
import ResponseModal from "../ResponseModal";
import {
  createDeveloperProfile,
  fetchDeveloperProfile,
} from "../../../redux/actions/profileActions";
import { useDispatch } from "react-redux";
import InfoModal from "../InfoModal";
import { useNavigate } from "react-router-dom";
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

const DeveloperProfile = () => {
  const [open, setOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [representativeEmail, setRepresentativeEmail] = useState("");
  const [representativeName, setRepresentativeName] = useState("");
  const [operationYears, setOperationYears] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [houseNumber, setHouseNumber] = useState(0);
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [briefAboutCompany, setBriefAboutCompany] = useState("");
  const [focusAreas, setFocusAreas] = useState([]);
  const [previousGrant, setPreviousGrant] = useState("");
  const [directorFile, setDirectorFile] = useState("");
  const [cacFile, setCacFile] = useState("");
  const [memartFile, setMemartFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editField, setEditField] = useState("");
  const [profile, setProfile] = useState({});

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const [initialDirectorFile, setInitialDirectorFile] = useState("");
  const [initialCacFile, setInitialCacFile] = useState("");
  const [initialMemartFile, setInitialMemartFile] = useState("");

  useEffect(() => {
    setInitialDirectorFile(directorFile);
    setInitialCacFile(cacFile);
    setInitialMemartFile(memartFile);
  }, [directorFile, cacFile, memartFile]);

  const dispatch = useDispatch();

  const UniqueId = localStorage.getItem("uniqueId");

  const inputRefs = {
    representativeName: useRef(null),
    companyName: useRef(null),
    address: useRef(null),
    representativeEmail: useRef(null),
    operationYears: useRef(null),
    projectsCount: useRef(null),
    houseNumber: useRef(null),
    companyWebsite: useRef(null),
    previousGrant: useRef(null),
    briefAboutCompany: useRef(null),
  };

  useEffect(() => {
    if (UniqueId !== null && UniqueId !== undefined) {
      const fetchUserProfile = async (UniqueId) => {
        try {
          const response = await dispatch(fetchDeveloperProfile(UniqueId));
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
    setCompanyName(userProfile.data.companyName);
    setAddress(userProfile.data.companyAddress);
    setRepresentativeEmail(userProfile.data.representativeEmail);
    setRepresentativeName(userProfile.data.representativeName);
    setOperationYears(parseInt(userProfile.data.operationYears, 10) || 0);
    setProjectsCount(parseInt(userProfile.data.projectsCount, 10) || 0);
    setHouseNumber(parseInt(userProfile.data.houseNumber, 10) || 0);
    setCompanyWebsite(userProfile.data.companyWebsite);
    setBriefAboutCompany(userProfile.data.briefAboutCompany);
    setFocusAreas(userProfile.data.focusArea || []);
    setPreviousGrant(userProfile.data.previousGrant || "");
    setDirectorFile(userProfile.data.companyDirectors);
    setCacFile(userProfile.data.companyCertificate);
    setMemartFile(userProfile.data.companyMemart);
    setProfileImage(userProfile.data.developerProfilePicture);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setIsLoading(true);
      try {
        const response = await CloudinaryUpload(file, "profile_images");
        if (response) {
          setProfileImage(response);
        } else {
          console.error("No secure URL returned from Cloudinary");
        }
      } catch (error) {
        console.error("Error uploading profile image to Cloudinary", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("No file selected or file input is undefined");
    }
  };

  const handleRemoveImage = () => {
    setProfileImage("");
  };

  const handleSave = async () => {
    if (!profileImage) {
      console.error("Profile image is not set. Please upload an image first.");
      return;
    }
    await handleCreateProfile();
    setOpen(false);
  };

  const handleEdit = (field) => {
    setEditField(field);
    if (inputRefs[field] && inputRefs[field].current) {
      inputRefs[field].current.focus();
    }
    setOpen(true);
  };

  const handleFocusAreaChange = (event) => {
    const value = event.target.value;
    setFocusAreas((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
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
      console.log("Profile Image URL:", profileImage);

      const profileData = {
        uniqueId: UniqueId,
        companyAddress: address,
        houseNumber: parseInt(houseNumber, 10),
        companyWebsite,
        representativeName,
        representativeEmail,
        operationYears: parseInt(operationYears, 10),
        projectsCount: parseInt(projectsCount, 10),
        previousGrant,
        focusArea: focusAreas,
        developerProfilePicture: profileImage,
        companyDirectors:
          directorFile === initialDirectorFile
            ? initialDirectorFile
            : directorFile,
        companyCertificate:
          cacFile === initialCacFile ? initialCacFile : cacFile,
        companyMemart:
          memartFile === initialMemartFile ? initialMemartFile : memartFile,
      };

      console.log("Profile Data:", profileData);

      const response = await dispatch(createDeveloperProfile(profileData));

      console.log("API Response:", response);

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

  const navigate = useNavigate();
  const isProfileAvailable = Object.keys(profile).length > 0;
  const handleToDashboard = () => {
    navigate("/developer-dashboard")
  }



  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-4 rounded-md mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-sm text-primary font-semibold">
            Developer's Profile
          </h1>
          <div className="flex justify-between items-center gap-5">
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            color="primary"
            startIcon={<AiOutlineEdit />}
            style={{ textTransform: "none" }}
          >
            Edit Profile
          </Button>
          <Button
            onClick={handleToDashboard}
            variant="contained"
            color="primary"
            startIcon={<MdDashboard />}
            style={{ textTransform: "none" }}
            disabled={!isProfileAvailable}
          >
            Dashboard
          </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-4">
        <div className="bg-white p-4 rounded-md lg:w-1/3 flex flex-col items-center justify-center relative">
          <div className="relative mb-4">
            <div className="w-60 h-60 rounded-full border-4 border-primary overflow-hidden relative group">
              <img
                src={profileImage || "/images/profileImg.png"}
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
            {companyName || "Company's Name"}
          </p>
        </div>

        <div className="bg-white p-4 rounded-md lg:w-2/3 max-h-[80vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row lg:gap-4">
              <div className="relative w-full">
                <ReadOnlyTextFieldComponent
                  label="Company's Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  onEdit={() => handleEdit("companyName")}
                />
              </div>
            </div>

            <div className="relative">
              <ReadOnlyTextFieldComponent
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onEdit={() => handleEdit("address")}
              />
            </div>

            <div className="relative">
              <ReadOnlyTextFieldComponent
                label="Email"
                value={representativeEmail}
                onChange={(e) => setRepresentativeEmail(e.target.value)}
                onEdit={() => handleEdit("representativeEmail")}
              />
            </div>
            <div className="relative">
              <ReadOnlyTextFieldComponent
                label="Representative's Name"
                value={representativeName}
                onChange={(e) => setRepresentativeName(e.target.value)}
                onEdit={() => handleEdit("representativeName")}
              />
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-4">
              <div className="relative w-full">
                <ReadOnlyTextFieldComponent
                  label="Years of Operation"
                  value={Number(operationYears)}
                  onChange={(e) => setOperationYears(parseInt(e.target.value))}
                  onEdit={() => handleEdit("operationYears")}
                  type="number"
                />
              </div>
              <div className="relative w-full">
                <ReadOnlyTextFieldComponent
                  label="Number of Projects"
                  value={Number(projectsCount)}
                  onChange={(e) => setProjectsCount(parseInt(e.target.value))}
                  onEdit={() => handleEdit("projectsCount")}
                  type="number"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-4">
              <div className="relative w-full">
                <ReadOnlyTextFieldComponent
                  label="Company Housing Number"
                  value={Number(houseNumber)}
                  onChange={(e) => setHouseNumber(parseInt(e.target.value))}
                  onEdit={() => handleEdit("houseNumber")}
                  type="number"
                />
              </div>
              <div className="relative w-full">
                <ReadOnlyTextFieldComponent
                  label="Company's website link"
                  value={companyWebsite}
                  onChange={(e) => setCompanyWebsite(e.target.value)}
                  onEdit={() => handleEdit("companyWebsite")}
                />
              </div>
            </div>

            <div className="relative">
              <ReadOnlyTextFieldComponent
                label="Bried about the company"
                value={briefAboutCompany}
                multiline
                rows={4}
                onChange={(e) => setBriefAboutCompany(e.target.value)}
                onEdit={() => handleEdit("briefAboutCompany")}
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Focus Area
              </label>
              <div className="flex flex-wrap gap-4">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={focusAreas && focusAreas.includes("Wind")}
                      onChange={handleFocusAreaChange}
                      value="Wind"
                      disabled
                    />
                  }
                  label="Wind"
                  className="flex items-center"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={focusAreas && focusAreas.includes("Hydro")}
                      onChange={handleFocusAreaChange}
                      value="Hydro"
                      disabled
                    />
                  }
                  label="Hydro"
                  className="flex items-center"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={focusAreas && focusAreas.includes("Gas")}
                      onChange={handleFocusAreaChange}
                      value="Gas"
                      disabled
                    />
                  }
                  label="Gas"
                  className="flex items-center"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={focusAreas && focusAreas.includes("Solar")}
                      onChange={handleFocusAreaChange}
                      value="Solar"
                      disabled
                    />
                  }
                  label="Solar"
                  className="flex items-center"
                />
              </div>
            </div>

            <div className="relative">
              <ReadOnlyTextField
                fullWidth
                label="Have you executed any project that qualifies for grant before?"
                variant="standard"
                select
                value={previousGrant || ""}
                onChange={(e) => setPreviousGrant(e.target.value)}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => handleEdit("previousGrant")}
                      className="absolute right"
                    >
                      <AiOutlineEdit />
                    </Button>
                  ),
                  readOnly: true,
                }}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </ReadOnlyTextField>
            </div>

            <div className="details-section">
              <hr className="my-4 border-primary" />

              <h3 className="block text-sm font-medium text-gray-700 mb-2">
                Document Upload
              </h3>

              <div className="flex flex-wrap gap-4">
                <div className="w-full sm:w-1/3 px-2 mb-4">
                  <label
                    htmlFor="director-upload"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Director/Shareholder
                  </label>
                  {directorFile ? (
                    <div className="flex items-center border rounded-md border-gray-300 p-2">
                      <span className="block w-full text-sm text-gray-500">
                        {directorFile.substring(0, 20) + "..."}
                      </span>
                      <i className="text-gray-500">
                        <AiOutlineCloudUpload />
                      </i>
                    </div>
                  ) : (
                    <div className="flex items-center border rounded-md border-gray-300 p-2">
                      <input
                        type="file"
                        id="director-upload"
                        accept=".pdf, .jpg, .jpeg, .png,"
                        onChange={(e) =>
                          handleFileUpload(e, setDirectorFile, "directorFile")
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

                <div className="w-full sm:w-1/3 px-2 mb-4">
                  <label
                    htmlFor="cac-cert-upload"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CAC Cert
                  </label>
                  <div className="flex items-center justify-center border rounded-md border-gray-300 p-2">
                    <input
                      type="file"
                      id="cac-cert-upload"
                      accept=".pdf, .jpg, .jpeg, .png,"
                      onChange={(e) =>
                        handleFileUpload(e, setCacFile, "cacFile")
                      }
                      className="block w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0
          file:text-sm file:font-semibold file:bg-green-50 cursor-pointer file:text-primary hover:file:bg-secondary-100"
                    />
                    <i className="text-gray-500">
                      <AiOutlineCloudUpload />
                    </i>
                  </div>
                </div>

                <div className="w-full sm:w-1/3 px-2 mb-4">
                  <label
                    htmlFor="memart-upload"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Memart
                  </label>
                  <div className="flex items-center border rounded-md border-gray-300 p-2">
                    <input
                      type="file"
                      id="memart-upload"
                      accept=".pdf, .jpg, .jpeg, .png,"
                      onChange={(e) =>
                        handleFileUpload(e, setMemartFile, "memartFile")
                      }
                      className="block w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0
                      file:text-sm file:font-semibold file:bg-green-50 cursor-pointer file:text-primary hover:file:bg-secondary-100"
                    />
                    <i className="text-gray-500">
                      <AiOutlineCloudUpload />
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfileModal
        open={open}
        setOpen={setOpen}
        companyName={companyName}
        setCompanyName={setCompanyName}
        address={address}
        setAddress={setAddress}
        representativeEmail={representativeEmail}
        setRepresentativeEmail={setRepresentativeEmail}
        representativeName={representativeName}
        setRepresentativeName={setRepresentativeName}
        operationYears={operationYears}
        setOperationYears={setOperationYears}
        projectsCount={projectsCount}
        setProjectsCount={setProjectsCount}
        houseNumber={houseNumber}
        setHouseNumber={setHouseNumber}
        companyWebsite={companyWebsite}
        setCompanyWebsite={setCompanyWebsite}
        briefAboutCompany={briefAboutCompany}
        setBriefAboutCompany={setBriefAboutCompany}
        focusAreas={focusAreas}
        setFocusAreas={setFocusAreas}
        previousGrant={previousGrant}
        setPreviousGrant={setPreviousGrant}
        handleFocusAreaChange={handleFocusAreaChange}
        handleFileUpload={handleFileUpload}
        directorFile={directorFile}
        setDirectorFile={setDirectorFile}
        cacFile={cacFile}
        setCacFile={setCacFile}
        memartFile={memartFile}
        setMemartFile={setMemartFile}
        handleSave={handleSave}
      />
      <ResponseModal
        isOpen={responseModalOpen}
        toggle={() => setResponseModalOpen(false)}
        message={responseMessage}
        status={responseMessage.includes("successfully") ? "success" : "error"}
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
  );
};

export default DeveloperProfile;
