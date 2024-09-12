import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const EmailVerified = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token'); 
  const [verificationStatus, setVerificationStatus] = useState(null); 

  useEffect(() => {
    if (!token) {
      navigate('*');  
      return;
    }

    const verifyEmail = async () => {
      try {
        
        const response = await axios.get(
          `https://greenpower-stage-71fa5ec0b66d.herokuapp.com/auth/verify-email?token=${token}`
        );
        
        setVerificationStatus('success'); 
      } catch (error) {
        setVerificationStatus('failure'); 
      }
    };

    verifyEmail();  
  }, [token, navigate]);

  const handleLoginRedirect = () => {
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
        {verificationStatus === 'success' ? (
          <>
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
          </>
        ) : verificationStatus === 'failure' ? (
          <>
            <FaExclamationCircle className="text-red-500 text-4xl mb-3 mx-auto" />
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Verification Failed</h2>
            <p className="text-gray-600 mb-6">
              The email verification link is invalid or expired. Please try again.
            </p>
          </>
        ) : (
          <p className="text-gray-600 mb-6">Verifying your email...</p>
        )}
      </div>
    </div>
  );
};

export default EmailVerified;
