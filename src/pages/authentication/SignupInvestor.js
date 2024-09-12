import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignupInvestor = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/bg1_.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-6 md:p-8 w-11/12 max-w-sm md:max-w-lg">
        
        <div className="flex justify-center mb-6">
          <img src="/images/gpfpLogo.svg" alt="Logo" className="h-8 w-auto" />
        </div>
        
        <h2 className="text-lg md:text-xl font-medium mb-6 text-center text-primary">Create Account</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-gray-700 text-xs md:text-sm font-normal mb-1 md:mb-2">Fullname</label>
            <input type="text" id="fullname" placeholder="Fullname" className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="w-full md:w-1/2">
              <label htmlFor="email" className="block text-gray-700 text-xs md:text-sm font-normal mb-1 md:mb-2">Email</label>
              <input type="email" id="email" placeholder="Email" className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <label htmlFor="phone" className="block text-gray-700 text-xs md:text-sm font-normal mb-1 md:mb-2">Phone Number</label>
              <input type="tel" id="phone" placeholder="Phone Number" className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
            <div className="w-full md:w-1/2">
              <label htmlFor="password" className="block text-gray-700 text-xs md:text-sm font-normal mb-1 md:mb-2">Create Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} id="password" placeholder="Password" className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer text-primary" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-xs md:text-sm font-normal mb-1 md:mb-2">Confirm Password</label>
              <div className="relative">
                <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" placeholder="Confirm" className="appearance-none border rounded w-full py-1 md:py-2 px-2 md:px-3 text-xs md:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer text-primary" onClick={toggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs md:text-sm text-gray-700">
            Already have an account? <a href="/login" className="text-primary hover:text-secondary font-medium">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupInvestor;
