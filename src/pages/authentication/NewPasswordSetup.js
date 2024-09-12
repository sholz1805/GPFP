import React, { useState } from 'react';
import { FaCheckCircle, FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NewPasswordSetup = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); 
    if (password === confirmPassword) {
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
        setIsModalOpen(true);

      
        setTimeout(() => {
          setIsModalOpen(false);
          navigate('/login'); 
        }, 2000);
      }, 2000);
    } else {
      setError('Passwords do not match'); 
    }
  };

  return (
    <div className="min-h-screen flex items-center p-4 justify-center bg-gray-100">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-medium text-primary text-center mb-6">Set New Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="relative mt-2">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className={`w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 text-primary flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mt-4">
            Confirm New Password
          </label>
          <div className="relative mt-2">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              className={`w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 text-primary flex items-center cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <button
            type="submit"
            className={`mt-6 w-full ${isSaving ? 'bg-gray-400' : 'bg-primary'} text-white py-3 rounded-md hover:bg-primary-dark focus:outline-none`}
            disabled={isSaving}
          >
            {isSaving ? (
              <div className="flex items-center justify-center space-x-2">
                <FaSpinner className="animate-spin" /> <span>Saving...</span>
              </div>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        {/* Success Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
              <div className="flex flex-col items-center">
                <FaCheckCircle className="text-green-500 text-4xl mb-3" />
                <p className="text-lg font-semibold">Password Reset Successful!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPasswordSetup;
