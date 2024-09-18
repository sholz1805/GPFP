import React, { useEffect, useState, useRef } from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EmailVerified = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const hasRunEffect = useRef(false); 

  useEffect(() => {
    if (!code || verificationStatus !== null || hasRunEffect.current) return;

    hasRunEffect.current = true; 

    setIsVerifying(true);

    const verifyEmail = async () => {
      try {
        const response = await axios.get(`https://greenpower-stage-71fa5ec0b66d.herokuapp.com/auth/verify-email/${code}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('API response:', response.data);

        if (response.data.status) {
          console.log('Email verification successful!');
          setVerificationStatus('success');
        } else {
          console.log('Email verification failed:', response.data.message);
          setVerificationStatus('failure');
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('Verification error: 404 Not Found');
          navigate('*');
        } else {
          console.error('Verification error:', error);
          setVerificationStatus('failure');
        }
      } finally {
        setIsVerifying(false);
      }
    };

    verifyEmail();
  }, [code, navigate, verificationStatus]);

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