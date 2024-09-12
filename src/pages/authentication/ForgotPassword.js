import React, { useState } from 'react';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa'; 
// import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

//   const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setIsModalOpen(true);

      setTimeout(() => {
        setIsModalOpen(false);
        // navigate("/reset-link")

      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center p-4 justify-center bg-gray-100">
      <div className="bg-white rounded-lg p-8 max-w-md relative">
        <h2 className="text-xl font-medium text-primary text-center mb-6">Forgot Password?</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Enter your email to receive reset link
          </label>
          <input
            type="email"
            id="email"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`mt-6 w-full ${isSending ? 'bg-gray-400' : 'bg-primary'} text-white py-3 rounded-md hover:bg-primary-dark focus:outline-none`}
            disabled={isSending}
          >
            {isSending ? (
              <div className="flex items-center justify-center space-x-2">
                <FaSpinner className="animate-spin" /> <span>Sending...</span>
              </div>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <div className="flex flex-col items-center">
              <FaCheckCircle className="text-green-500 text-4xl mb-3" />
              <p className="text-lg font-semibold">Reset Link Sent!</p>
              <p className="text-gray-700 mt-2">Check your inbox to continue.</p>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
