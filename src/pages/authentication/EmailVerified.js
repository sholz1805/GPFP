import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EmailVerified = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
        <FaCheckCircle className="text-green-500 text-4xl mb-3 mx-auto" />
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Email has been verified!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for verifying your email. You can now log in and enjoy.
        </p>
        <button
          onClick={handleLoginRedirect}
          className="bg-primary text-white py-3 px-6 rounded-md hover:bg-primary-dark transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default EmailVerified;
