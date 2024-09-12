import React, { useState, useEffect, useRef } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineLoading,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import {
  Modal,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalContent = styled("div")({
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "80%",
  maxWidth: "600px",
  maxHeight: "85vh",
  overflowY: "auto",
});

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

function DeveloperProfile() {
  const [profileImage, setProfileImage] = useState("");
  const [representativeName, setRepresentativeName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [yearsOfOperation, setYearsOfOperation] = useState("");
  const [noOfProjects, setNoOfProjects] = useState("");
  const [companyHousing, setCompanyHousing] = useState("");
  const [companyWeb, setCompanyWeb] = useState("");
  const [executedGrantProject, setExecutedGrantProject] = useState("");
  const [focusAreas, setFocusAreas] = useState([]);
  const [briefAboutCompany, setBriefAboutCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editField, setEditField] = useState("");
  const [directorFile, setDirectorFile] = useState(null);
  const [cacFile, setCacFile] = useState(null);
  const [memartFile, setMemartFile] = useState(null);

  const inputRefs = {
    representativeName: useRef(null),
    companyName: useRef(null),
    address: useRef(null),
    email: useRef(null),
    yearsOfOperation: useRef(null),
    noOfProjects: useRef(null),
    companyHousing: useRef(null),
    companyWeb: useRef(null),
    executedGrantProject: useRef(null),
    briefAboutCompany: useRef(null),
  };

  useEffect(() => {
    const savedProfileImage = localStorage.getItem("profileImage");
    const savedRepresentativeName = localStorage.getItem("representativeName");
    const savedCompanyName = localStorage.getItem("companyName");
    const savedAddress = localStorage.getItem("address");
    const savedEmail = localStorage.getItem("email");
    const savedYearsOfOperation = localStorage.getItem("yearsOfOperation");
    const savedNoOfProjects = localStorage.getItem("noOfProjects");
    const savedCompanyHousing = localStorage.getItem("companyHousing");
    const savedCompanyWeb = localStorage.getItem("companyWeb");
    const savedExecutedGrantProject = localStorage.getItem(
      "executedGrantProject"
    );
    const savedFocusAreas = localStorage.getItem("focusAreas");
    const savedBriefAboutCompany = localStorage.getItem("briefAboutCompany");

    if (savedProfileImage) setProfileImage(savedProfileImage);
    if (savedRepresentativeName) setRepresentativeName(savedRepresentativeName);
    if (savedCompanyName) setCompanyName(savedCompanyName);
    if (savedAddress) setAddress(savedAddress);
    if (savedEmail) setEmail(savedEmail);
    if (savedYearsOfOperation) setYearsOfOperation(savedYearsOfOperation);
    if (savedNoOfProjects) setNoOfProjects(savedNoOfProjects);
    if (savedCompanyHousing) setCompanyHousing(savedCompanyHousing);
    if (savedCompanyWeb) setCompanyWeb(savedCompanyWeb);
    if (savedExecutedGrantProject)
      setExecutedGrantProject(savedExecutedGrantProject);
    if (savedFocusAreas) setFocusAreas(JSON.parse(savedFocusAreas));
    if (savedBriefAboutCompany) setBriefAboutCompany(savedBriefAboutCompany);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("profileImage", reader.result);
        setIsLoading(false);
      };
      reader.onerror = () => {
        console.error("Error reading file");
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("No file selected or file input is undefined");
    }
  };

  const handleRemoveImage = () => {
    setProfileImage("");
    localStorage.removeItem("profileImage");
  };

  const handleSave = () => {
    localStorage.setItem("representativeName", representativeName);
    localStorage.setItem("companyName", companyName);
    localStorage.setItem("address", address);
    localStorage.setItem("email", email);
    localStorage.setItem("yearsOfOperation", yearsOfOperation);
    localStorage.setItem("noOfProjects", noOfProjects);
    localStorage.setItem("companyHousing", companyHousing);
    localStorage.setItem("companyWeb", companyWeb);
    localStorage.setItem("executedGrantProject", executedGrantProject);
    localStorage.setItem("focusAreas", JSON.stringify(focusAreas));
    localStorage.setItem("briefAboutCompany", briefAboutCompany);
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

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    setDirectorFile(getFromLocalStorage("directorFile"));
    setCacFile(getFromLocalStorage("cacFile"));
    setMemartFile(getFromLocalStorage("memartFile"));
  }, []);

  const handleFileUpload = (event, setFileState, key) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result;
        setFileState(fileData);
        saveToLocalStorage(key, fileData);
      };
      reader.readAsDataURL(file);
    }
  };

  const getFromLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-4 rounded-md mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-sm text-primary font-semibold">
            Developer's Profile
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
                <ReadOnlyTextField
                  fullWidth
                  label="Company's Name"
                  variant="outlined"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={() => handleEdit("companyName")}
                        className="absolute right"
                      >
                        <AiOutlineEdit />
                      </Button>
                    ),
                    readOnly: true,
                  }}
                />
              </div>
            </div>

            <div className="relative">
              <ReadOnlyTextField
                fullWidth
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => handleEdit("address")}
                      className="absolute right"
                    >
                      <AiOutlineEdit />
                    </Button>
                  ),
                  readOnly: true,
                }}
              />
            </div>

            <div className="relative">
              <ReadOnlyTextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => handleEdit("email")}
                      className="absolute right"
                    >
                      <AiOutlineEdit />
                    </Button>
                  ),
                  readOnly: true,
                }}
              />
            </div>
            <div className="relative">
              <ReadOnlyTextField
                fullWidth
                label="Representative's Name"
                variant="outlined"
                value={representativeName}
                onChange={(e) => setRepresentativeName(e.target.value)}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => handleEdit("representativeName")}
                      className="absolute right"
                    >
                      <AiOutlineEdit />
                    </Button>
                  ),
                  readOnly: true,
                }}
              />
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-4">
              <div className="relative w-full">
                <ReadOnlyTextField
                  fullWidth
                  label="Years of Operation"
                  variant="outlined"
                  value={yearsOfOperation}
                  onChange={(e) => setYearsOfOperation(e.target.value)}
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={() => handleEdit("yearsOfOperation")}
                        className="absolute right"
                      >
                        <AiOutlineEdit />
                      </Button>
                    ),
                    readOnly: true,
                  }}
                />
              </div>
              <div className="relative w-full">
                <ReadOnlyTextField
                  fullWidth
                  label="Number of Projects"
                  variant="outlined"
                  value={noOfProjects}
                  onChange={(e) => setNoOfProjects(e.target.value)}
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={() => handleEdit("noOfProjects")}
                        className="absolute right"
                      >
                        <AiOutlineEdit />
                      </Button>
                    ),
                    readOnly: true,
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-4">
              <div className="relative w-full">
                <ReadOnlyTextField
                  fullWidth
                  label="Company Housing Number"
                  variant="outlined"
                  value={companyHousing}
                  onChange={(e) => setCompanyHousing(e.target.value)}
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={() => handleEdit("companyHousing")}
                        className="absolute right"
                      >
                        <AiOutlineEdit />
                      </Button>
                    ),
                    readOnly: true,
                  }}
                />
              </div>
              <div className="relative w-full">
                <ReadOnlyTextField
                  fullWidth
                  label="Company's Website's link"
                  variant="outlined"
                  value={companyWeb}
                  onChange={(e) => setCompanyWeb(e.target.value)}
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={() => handleEdit("companyWeb")}
                        className="absolute right"
                      >
                        <AiOutlineEdit />
                      </Button>
                    ),
                    readOnly: true,
                  }}
                />
              </div>
            </div>

            <div className="relative">
              <ReadOnlyTextField
                fullWidth
                label="Brief about the company"
                variant="outlined"
                multiline
                rows={4}
                value={briefAboutCompany}
                onChange={(e) => setBriefAboutCompany(e.target.value)}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => handleEdit("briefAboutCompany")}
                      className="absolute right"
                    >
                      <AiOutlineEdit />
                    </Button>
                  ),
                  readOnly: true,
                }}
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
                      checked={focusAreas.includes("Wind")}
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
                      checked={focusAreas.includes("Hydro")}
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
                      checked={focusAreas.includes("Gas")}
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
                      checked={focusAreas.includes("Solar")}
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
                variant="outlined"
                select
                value={executedGrantProject}
                onChange={(e) => setExecutedGrantProject(e.target.value)}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => handleEdit("executedGrantProject")}
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
                  <div className="flex items-center border rounded-md border-gray-300 p-2">
                    <input
                      type="file"
                      id="director-upload"
                      accept=".pdf"
                      onChange={(e) =>
                        handleFileUpload(e, setDirectorFile, "directorFile")
                      }
                      className="block w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-2 file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white rounded-md"
                    />
                    <i className="text-gray-500">
                      <AiOutlineCloudUpload />
                    </i>
                  </div>
                </div>

                <div className="w-full sm:w-1/3 px-2 mb-4">
                  <label
                    htmlFor="cac-cert-upload"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CAC Cert
                  </label>
                  <div className="flex items-center border rounded-md border-gray-300 p-2">
                    <input
                      type="file"
                      id="cac-cert-upload"
                      accept=".pdf"
                      onChange={(e) =>
                        handleFileUpload(e, setCacFile, "cacFile")
                      }
                      className="block w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-2 file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white rounded-md"
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
                      accept=".pdf"
                      onChange={(e) =>
                        handleFileUpload(e, setMemartFile, "memartFile")
                      }
                      className="block w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-2 file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white rounded-md"
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

      <StyledModal open={open} onClose={() => setOpen(false)}>
        <ModalContent>
          <h2 className="text-l text-primary font-semibold mb-4">
            Edit Profile
          </h2>

          <TextField
            fullWidth
            label="Company's Name"
            variant="outlined"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            margin="normal"
            ref={inputRefs.companyName}
          />
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            margin="normal"
            ref={inputRefs.address}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            ref={inputRefs.email}
          />
          <TextField
            fullWidth
            label="Representative's Name"
            variant="outlined"
            value={representativeName}
            onChange={(e) => setRepresentativeName(e.target.value)}
            margin="normal"
            ref={inputRefs.representativeName}
          />
          <TextField
            fullWidth
            label="Years of Operation"
            variant="outlined"
            value={yearsOfOperation}
            onChange={(e) => setYearsOfOperation(e.target.value)}
            margin="normal"
            ref={inputRefs.yearsOfOperation}
          />
          <TextField
            fullWidth
            label="Number of Projects"
            variant="outlined"
            value={noOfProjects}
            onChange={(e) => setNoOfProjects(e.target.value)}
            margin="normal"
            ref={inputRefs.noOfProjects}
          />
          <TextField
            fullWidth
            label="Company's Housing Number"
            variant="outlined"
            value={companyHousing}
            onChange={(e) => setCompanyHousing(e.target.value)}
            margin="normal"
            ref={inputRefs.companyHousing}
          />
          <TextField
            fullWidth
            label="Company's Website"
            variant="outlined"
            value={companyWeb}
            onChange={(e) => setCompanyWeb(e.target.value)}
            margin="normal"
            ref={inputRefs.companyWeb}
          />
          <TextField
            fullWidth
            label="Brief about the company"
            variant="outlined"
            multiline
            rows={4}
            value={briefAboutCompany}
            onChange={(e) => setBriefAboutCompany(e.target.value)}
            margin="normal"
            ref={inputRefs.briefAboutCompany}
          />
          <FormGroup>
            <label className="block text-sm font-medium text-gray-700">
              Focus Area
            </label>
            <div className="flex flex-wrap gap-4">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={focusAreas.includes("Wind")}
                    onChange={handleFocusAreaChange}
                    value="Wind"
                  />
                }
                label="Wind"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={focusAreas.includes("Hydro")}
                    onChange={handleFocusAreaChange}
                    value="Hydro"
                  />
                }
                label="Hydro"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={focusAreas.includes("Gas")}
                    onChange={handleFocusAreaChange}
                    value="Gas"
                  />
                }
                label="Gas"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={focusAreas.includes("Solar")}
                    onChange={handleFocusAreaChange}
                    value="Solar"
                  />
                }
                label="Solar"
              />
            </div>
          </FormGroup>
          <TextField
            fullWidth
            label="Have you executed any project that qualifies for grant before?"
            variant="outlined"
            select
            value={executedGrantProject}
            onChange={(e) => setExecutedGrantProject(e.target.value)}
            margin="normal"
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>

          <div className="details-section">
            <hr className="my-4 border-primary" />
            <div className="flex flex-col mb-4 sm:flex-row sm:space-x-4">
              <div className="flex-1 mb-4 sm:mb-0">
                <label
                  htmlFor="director-upload"
                  className="block text-sm font-medium text-gray-700"
                >
                  Director/Shareholder
                </label>
                <div className="flex items-center border rounded-md border-gray-300 p-2">
                  <input
                    type="file"
                    id="director-upload"
                    accept=".pdf"
                    onChange={(e) =>
                      handleFileUpload(e, setDirectorFile, "directorFile")
                    }
                    className="block w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-2 file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white rounded-md"
                  />
                  <i className="text-gray-500">
                    <AiOutlineCloudUpload />
                  </i>
                </div>
              </div>

              <div className="flex-1 mb-4 sm:mb-0">
                <label
                  htmlFor="cac-cert-upload"
                  className="block text-sm font-medium text-gray-700"
                >
                  CAC Cert
                </label>
                <div className="flex items-center border rounded-md border-gray-300 p-2">
                  <input
                    type="file"
                    id="cac-cert-upload"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, setCacFile, "cacFile")}
                    className="block w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-2 file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white rounded-md"
                  />
                  <i className="text-gray-500">
                    <AiOutlineCloudUpload />
                  </i>
                </div>
              </div>

              <div className="flex-1 mb-4 sm:mb-0">
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
                    accept=".pdf"
                    onChange={(e) =>
                      handleFileUpload(e, setMemartFile, "memartFile")
                    }
                    className="block w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-2 file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white rounded-md"
                  />
                  <i className="text-gray-500">
                    <AiOutlineCloudUpload />
                  </i>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </ModalContent>
      </StyledModal>
    </div>
  );
}

export default DeveloperProfile;
