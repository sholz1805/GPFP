import React, { useState, useEffect, useRef } from "react";
import {
  AiOutlineCloudUpload,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineLoading,
} from "react-icons/ai";
import { Modal, TextField, Button, InputAdornment } from "@mui/material";
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

function InvestorProfile() {
  const [profileImage, setProfileImage] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [bvn, setBvn] = useState("");
  const [investmentExperience, setInvestmentExperience] = useState("");
  const [expectation, setExpectation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editField, setEditField] = useState("");
  const [meansOfId, setMeansOfId] = useState(null);
  const [meansOfIdName, setMeansOfIdName] = useState("");
  const [isFileUploadEditable, setIsFileUploadEditable] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(""); 


  const inputRefs = {
    fullName: useRef(null),
    phoneNumber: useRef(null),
    email: useRef(null),
    bvn: useRef(null),
    investmentExperience: useRef(null),
    expectation: useRef(null),
  };

  useEffect(() => {
    const savedProfileImage = localStorage.getItem("profileImage");
    const savedFullName = localStorage.getItem("fullName");
    const savedPhonenumber = localStorage.getItem("phoneNumber");
    const savedEmail = localStorage.getItem("email");
    const savedBvn = localStorage.getItem("bvn");
    const savedInvestmentExperience = localStorage.getItem(
      "investmentExperience"
    );
    const savedExpectation = localStorage.getItem("expectation");

    if (savedProfileImage) setProfileImage(savedProfileImage);
    if (savedFullName) setFullName(savedFullName);
    if (savedPhonenumber) setPhoneNumber(savedPhonenumber);
    if (savedEmail) setEmail(savedEmail);
    if (savedBvn) setBvn(savedBvn);
    if (savedInvestmentExperience)
      setInvestmentExperience(savedInvestmentExperience);
    if (savedExpectation) setExpectation(savedExpectation);
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

  const handleEdit = (field) => {
    setEditField(field);
    if (inputRefs[field] && inputRefs[field].current) {
      inputRefs[field].current.focus();
    }
    if (field === "meansOfId") {
      setIsFileUploadEditable(true);
    }
    setOpen(true);
  };

  const handleSave = () => {
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("email", email);
    localStorage.setItem("bvn", bvn);
    localStorage.setItem("investmentExperience", investmentExperience);
    localStorage.setItem("expectation", expectation);
    setIsFileUploadEditable(false);
    setOpen(false);
  };

  const getFromLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    const savedMeansOfId = getFromLocalStorage("meansOfId");
    if (savedMeansOfId) {
      setMeansOfId(savedMeansOfId.data);
      setMeansOfIdName(savedMeansOfId.name);
    }
  }, []);

   const handleFileUpload = (event, setFileState, key) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { 
        setFileUploadError("File size exceeds limit");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result;
        setFileState(fileData);
        setFileUploadError(""); 
        saveToLocalStorage(key, { data: fileData, name: file.name });
      };
      reader.readAsDataURL(file);
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
            {fullName || "Investor"}
          </p>
        </div>

        <div className="bg-white p-4 rounded-md lg:w-2/3 max-h-[80vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row lg:gap-4">
              <div className="relative w-full">
                <ReadOnlyTextField
                  fullWidth
                  label="Full name"
                  variant="outlined"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={() => handleEdit("fullName")}
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
                label="Phone number"
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => handleEdit("phoneNumber")}
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
                  label="Investment Experience"
                  variant="outlined"
                  value={investmentExperience}
                  onChange={(e) => setInvestmentExperience(e.target.value)}
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={() => handleEdit("investmentExperience")}
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
                  label="BVN"
                  variant="outlined"
                  value={bvn}
                  onChange={(e) => setBvn(e.target.value)}
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={() => handleEdit("bvn")}
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
                label="Your Expectation"
                variant="outlined"
                multiline
                rows={4}
                value={expectation}
                onChange={(e) => setExpectation(e.target.value)}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => handleEdit("expectation")}
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
              <p className="mb-4">
                Means of Identification(National ID/NIN/Driver's License/Intn'l
                Passport)
              </p>
              <ReadOnlyTextField
                fullWidth
                label="Means of Identification"
                variant="outlined"
                value={meansOfId ? "File Uploaded" : "No File Uploaded"}
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => handleEdit("meansOfId")}
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

          <StyledModal open={open} onClose={() => setOpen(false)}>
            <ModalContent>
              <h2 className="text-l text-primary font-semibold mb-4">
                Edit Profile
              </h2>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                margin="normal"
                ref={inputRefs.fullName}
              />
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                margin="normal"
                ref={inputRefs.phoneNumber}
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
                label="Investment Experience"
                variant="outlined"
                value={investmentExperience}
                onChange={(e) => setInvestmentExperience(e.target.value)}
                margin="normal"
                ref={inputRefs.investmentExperience}
              />
              <TextField
                fullWidth
                label="BVN"
                variant="outlined"
                value={bvn}
                onChange={(e) => setBvn(e.target.value)}
                margin="normal"
                ref={inputRefs.bvn}
              />

              <TextField
                fullWidth
                label="Your Expectation"
                variant="outlined"
                multiline
                rows={4}
                value={expectation}
                onChange={(e) => setExpectation(e.target.value)}
                margin="normal"
                ref={inputRefs.expectation}
              />

              <div className="details-section">
                <hr className="my-4 border-primary" />
                <p className="mb-4 text-xs">
                  Means of Identification(National ID/NIN/Driver's
                  License/Intn'l Passport)
                </p>
                <TextField
                  fullWidth
                  label="Means of Identification"
                  variant="outlined"
                  type="file"
                  accept=".jpeg,.jpg,.png,.pdf"
                  onChange={(e) =>
                    handleFileUpload(
                      e,
                      setMeansOfId,
                      setMeansOfIdName,
                      "meansOfId"
                    )
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineCloudUpload />
                      </InputAdornment>
                    ),
                  }}
                  ref={inputRefs.meansOfId}
                />
                {fileUploadError && <p className="text-red-500 text-sm">{fileUploadError}</p>}
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </ModalContent>
          </StyledModal>
        </div>
      </div>
    </div>
  );
}

export default InvestorProfile;
