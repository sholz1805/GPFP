import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
  FaTimesCircle,
} from "react-icons/fa";
import { signupInvestor } from "../../redux/actions/signUpActions";
import { Link } from "react-router-dom";
import "./phoneNumber.css";

const SignupInvestor = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const signupState = useSelector((state) => state.signup);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(!emailRegex.test(value) ? "Invalid email address" : "");
    }

    if (name === "password" || name === "confirmPassword") {
      if (formData.password !== value && name === "confirmPassword") {
        setPasswordError("Passwords do not match");
      } else if (formData.confirmPassword !== value && name === "password") {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phoneNumber: value,
    });

    if (value) {
      const phoneRegex = /^[+][1-9]\d{1,14}$/;
      setPhoneError(!phoneRegex.test(value) ? "Invalid phone number" : "");
    } else {
      setPhoneError("Phone number is required");
    }
  };

  const handleBlur = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    } else {
      setPasswordError("");
    }

    if (!formData.phoneNumber) {
      setPhoneError("Phone number is required");
      return;
    }

    const phoneRegex = /^[+][1-9]\d{1,14}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setPhoneError("Invalid phone number");
      return;
    } else {
      setPhoneError("");
    }

    const realFormData = { ...formData };
    delete realFormData.confirmPassword;

    dispatch(signupInvestor(realFormData))
      .then((response) => {
        setIsModalOpen(true);
        setVerificationEmail(realFormData.email);
      })
      .catch((error) => {
        setIsModalOpen(true);
      });
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg1_.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-6 md:p-8 w-11/12 max-w-sm md:max-w-lg">
        <div className="flex justify-center mb-6">
          <img src="/images/gpfpLogo.svg" alt="Logo" className="h-8 w-auto" />
        </div>

        <h2 className="text-lg md:text-xl font-medium mb-6 text-center text-primary">
          Create Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullname"
              className="block text-gray-700 text-xs md:text-sm font-normal mb-1 md:mb-2"
            >
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Fullname"
              className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="w-full md:w-1/2">
              <label
                htmlFor="email"
                className="block text-gray-700 text-xs md:text-sm font-normal mb-1 md:mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {emailError && (
                <p className="text-red-500 text-xs italic mt-1">{emailError}</p>
              )}
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <label
                htmlFor="phone"
                className="block text-gray-700 text-xs md:text-sm font-normal mb-1 md:mb-2"
              >
                Phone Number
              </label>
              <PhoneInput
                international
                defaultCountry="NG"
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:ring-0 custom-phone-input"
              />
              {phoneError && (
                <p className="text-red-500 text-xs italic mt-1">{phoneError}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
            <div className="w-full md:w-1/2">
              <label
                htmlFor="password"
                className="block text-gray-700 text-xs md:text-sm font-normal mb-1 md:mb-2"
              >
                Create Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                  className={`appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    passwordError ? "border-red-500" : ""
                  }`}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer text-primary"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
                {passwordError && (
                  <p className="text-red-500 text-xs italic mt-1">
                    {passwordError}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-xs md:text-sm font-normal mb-1 md:mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Confirm"
                  className={`appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    passwordError ? "border-red-500" : ""
                  }`}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer text-primary"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
                {passwordError && (
                  <p className="text-red-500 text-xs italic mt-1">
                    {passwordError}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {signupState.loading ? "Signing up..." : "Sign Up"}
          </button>

        </form>

        <div className="mt-6 text-center">
          <p className="text-xs md:text-sm text-gray-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:text-secondary font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            {(
              <div className="flex flex-col items-center">
                {signupState.error ? (
                  <div className="flex flex-col items-center">
                    <FaTimesCircle className="text-red-500 text-4xl mb-3" />
                    <p className="text-lg font-semibold">Error</p>
                    <p className="text-gray-500 mt-2 text-center leading-tight">
                      {signupState.error}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <FaCheckCircle className="text-green-500 text-4xl mb-3" />
                    <p className="text-lg font-semibold">Verify Email</p>
                    <p className="text-gray-500 mt-2 text-center leading-tight">
                      An email has been sent to{" "}
                      <span className="font-bold text-primary">
                        {verificationEmail}
                      </span>
                      <br/>
                      Please check your inbox to verify your email address.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupInvestor;
