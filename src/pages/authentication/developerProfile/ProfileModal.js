import React from "react";
import {
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

const ProfileModal = ({
  open,
  setOpen,
  companyName,
  setCompanyName,
  address,
  setAddress,
  setRepresentativeEmail,
  representativeEmail,
  representativeName,
  setRepresentativeName,
  operationYears,
  setOperationYears,
  projectsCount,
  setProjectsCount,
  houseNumber,
  setHouseNumber,
  companyWebsite,
  setCompanyWebsite,
  briefAboutCompany,
  setBriefAboutCompany,
  focusAreas,
  setFocusAreas,
  previousGrant,
  setPreviousGrant,
  handleFocusAreaChange,
  handleFileUpload,
  handleSave,
  directorFile,
  setDirectorFile,
  cacFile,
  setCacFile,
  memartFile,
  setMemartFile,
}) => {
  return (
    <StyledModal open={open} onClose={() => setOpen(false)}>
      <ModalContent>
        <h2 className="text-l text-primary font-semibold mb-4">Edit Profile</h2>

        <TextField
          fullWidth
          label="Company's Name"
          variant="outlined"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={representativeEmail}
          onChange={(e) => setRepresentativeEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Representative's Name"
          variant="outlined"
          value={representativeName}
          onChange={(e) => setRepresentativeName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Years of Operation"
          variant="outlined"
          value={operationYears}
          onChange={(e) => setOperationYears(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Number of Projects"
          variant="outlined"
          value={projectsCount}
          onChange={(e) => setProjectsCount(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Company's Housing Number"
          variant="outlined"
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Company's Website"
          variant="outlined"
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
          margin="normal"
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
        />
        
        <FormGroup>
          <label className="block text-sm font-medium text-gray-700">Focus Area</label>
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
          value={previousGrant}
          onChange={(e) => setPreviousGrant(e.target.value)}
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
                   accept=".pdf, .jpg, .jpeg, .png,"
                  onChange={(e) => handleFileUpload(e, setDirectorFile)}
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
                   accept=".pdf, .jpg, .jpeg, .png,"
                  onChange={(e) => handleFileUpload(e, setCacFile)}
                  className="block w-full text-sm text-gray-500 file:mr-2 file:py-1 file:px-2 file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white rounded-md"
                />
                <i className="text-gray-500">
                  <AiOutlineCloudUpload/>
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
                   accept=".pdf, .jpg, .jpeg, .png,"
                  onChange={(e) => handleFileUpload(e, setMemartFile)}
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
  );
};

export default ProfileModal;