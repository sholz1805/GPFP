// import React, { useState } from 'react';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// const SignupDeveloper = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/bg1_.jpg')" }}>
//       <div className="absolute inset-0 bg-black opacity-70"></div>
//       <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 md:p-10 w-11/12 max-w-sm">

//         <div className="flex justify-center mb-8">
//           <img src="/images/gpfpLogo.svg" alt="Logo" className="h-8 w-auto" />
//         </div>

//         <h2 className="text-2xl font-bold mb-8 text-center text-[#467D9A]">Create Account</h2>
//         <form>
//           <div className="mb-4">
//             <label htmlFor="fullname" className="block text-gray-700 text-sm font-bold mb-2">Fullname</label>
//             <input type="text" id="fullname" placeholder="Enter your fullname" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="company" className="block text-gray-700 text-sm font-bold mb-2">Company's Name</label>
//             <input type="text" id="company" placeholder="Enter your company's name" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
//             <input type="email" id="email" placeholder="Enter your email" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
//             <input type="tel" id="phone" placeholder="Enter your phone number" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Create Password</label>
//             <div className="relative">
//               <input type={showPassword ? 'text' : 'password'} id="password" placeholder="Create a password" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//               <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer" onClick={togglePasswordVisibility}>
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </div>
//             </div>
//           </div>
//           <div className="mb-6">
//             <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
//             <div className="relative">
//               <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" placeholder="Confirm your password" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//               <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </div>
//             </div>
//           </div>

//           <button type="submit" className="w-full bg-[#467D9A] hover:bg-[#549BC2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//             Sign Up
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-700">
//             Already have an account? <a href="/signin" className="text-[#467D9A] hover:text-[#549BC2] font-bold">Sign In</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupDeveloper;

import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { signup } from "../../redux/actions/signUpActions";
// import '../../input.css'

const SignupDeveloper = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
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

  let emailTimeout;
  let phoneTimeout;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      clearTimeout(emailTimeout);
    }
    if (name === "phone") {
      clearTimeout(phoneTimeout);
    }

    if (name === "password" || name === "confirmPassword") {
      if (formData.password !== formData.confirmPassword) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(value)) {
        setEmailError("");
      } else {
        setEmailError("Invalid email address");
      }

      emailTimeout = setTimeout(() => {
        setEmailError("");
      }, 5000);
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phoneNumber: value,
    });

    if (value) {
      const phoneRegex = /^[+][1-9]\d{1,14}$/;
      if (phoneRegex.test(value)) {
        setPhoneError("");
      } else {
        setPhoneError("Invalid phone number");
      }
    } else {
      setPhoneError("");
    }

    phoneTimeout = setTimeout(() => {
      setPhoneError("");
    }, 5000);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
  
    const realFormData = { ...formData };
    delete realFormData.confirmPassword;
  
    setPasswordError("");
  
    dispatch(signup(realFormData))
      .then((response) => {
        if (response.type === "SIGNUP_SUCCESS") {
          setVerificationEmail(realFormData.email);
          setIsModalOpen(true);
          
          // setTimeout(() => {
          //   window.location.href = "/verify-email";
          // }, 3000);
        }
      })
      .catch((error) => {
        console.error("Signup failed", error);
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

        <h2 className="text-xl md:text-xl font-medium mb-6 text-center text-primary">
          Create Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="w-full md:w-1/2">
              <label
                htmlFor="full Name"
                className="block text-gray-700 text-xs md:text-sm font-normal mb-1 md:mb-2"
              >
                Fullname
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <label
                htmlFor="company"
                className="block text-gray-700 text-xs md:text-sm font-normal mb-1 md:mb-2"
              >
                Company's Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company's Name"
                className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
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
                style={{ outline: "transparent" }}
                international
                defaultCountry="NG"
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight outline-transparent focus:outline-transparent"
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
                  placeholder="Password"
                  className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer text-primary"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
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

          {signupState.error && (
            <p className="text-red-500 text-xs italic mt-4">
              {signupState.error}
            </p>
          )}
          {signupState.userData && (
            <p className="text-green-500 text-xs italic mt-4">
              Signup successful!
            </p>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs md:text-sm text-gray-700">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary hover:text-secondary font-medium"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <div className="flex flex-col items-center">
              <FaCheckCircle className="text-green-500 text-4xl mb-3" />
              <p className="text-lg font-semibold">Verify Email</p>
              <p className="text-gray-700 mt-2">
                An email has been sent to {verificationEmail}. Please check your
                inbox to verify your email address.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupDeveloper;
