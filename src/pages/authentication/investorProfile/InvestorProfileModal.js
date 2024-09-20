import React from "react";
import {
  AiOutlineCloudUpload,
} from "react-icons/ai";
import {
  Modal,
  TextField,
  Button,
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

const InvestorProfileModal = ({
  open,
  setOpen,
  fullName,
  setFullName,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  bvn,
  setBvn,
  investmentExperience,
  setInvestmentExperience,
  expectation,
  setExpectation,
  meansOfId,
  setMeansOfId,
  handleSave,
}) => {
  return (
    <StyledModal open={open} onClose={() => setOpen(false)}>
      <ModalContent>
        <h2 className="text-l text-primary font-semibold mb-4">Edit Profile</h2>

        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone Number"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="BVN"
          variant="outlined"
          value={bvn}
          onChange={(e) => setBvn(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Investment Experience"
          variant="outlined"
          value={investmentExperience}
          onChange={(e) => setInvestmentExperience(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Expectation"
          variant="outlined"
          value={expectation}
          onChange={(e) => setExpectation(e.target.value)}
          margin="normal"
        />

        <div className="details-section">
          <hr className="my-4 border-primary" />
          <div className="flex flex-col mb-4 sm:flex-row sm:space-x-4">
            <div className="flex-1 mb-4 sm:mb-0">
              <label
                htmlFor="means-of-id-upload"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Means of Identification
              </label>
              <div className="flex items-center border rounded-md border-gray-300 p-2">
                <input
                  type="file"
                  id="means-of-id-upload"
                  accept=".pdf, .jpg, .jpeg, .png,"
                  onChange={(e) => setMeansOfId(e.target.files[0])}
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

export default InvestorProfileModal;