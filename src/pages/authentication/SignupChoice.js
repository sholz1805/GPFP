import React, { useState } from 'react';
import { FaUser, FaBriefcase } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 

const SignupChoice = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate(); 

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleJoinClick = () => {
    if (selectedRole === 'developer') {
      navigate('/signup/developer'); 
    } else if (selectedRole === 'investor') {
      navigate('/signup/investor'); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="mb-8">
        <img src="/images/gpfpLogo.svg" alt="Logo" className="h-10 w-auto" />
      </div>
      
      <p className="text-xl font-normal leading-tight mb-8 text-center text-primary">
        Join as a Developer or Investor
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg mb-8">
        <div 
          className={`p-4 border rounded-lg cursor-pointer ${selectedRole === 'developer' ? 'bg-blue-100 border-green-500' : 'bg-white hover:bg-green-100'}`}
          onClick={() => handleRoleSelect('developer')}
        >
          <div className="flex flex-col md:flex-row items-center md:justify-between">
            <div className="flex items-center">
              <div className="p-3" style={{ backgroundColor: '#467D9A', color: 'white', borderRadius: '9999px' }}>
                <FaUser />
              </div>
              <div className="ml-4">
                <p className="text-normal font-semibold leading-tight">Sign Up as a Developer</p>
                <p className="text-gray-600 leading-tight">Create an account to raise funds for your projects</p>
              </div>
            </div>
          </div>
        </div>
        <div 
          className={`p-4 border rounded-lg cursor-pointer ${selectedRole === 'investor' ? 'bg-blue-100 border-green-500' : 'bg-white hover:bg-green-100'}`}
          onClick={() => handleRoleSelect('investor')}
        >
          <div className="flex flex-col md:flex-row items-center md:justify-between">
            <div className="flex items-center ">
              <div className="p-3" style={{ backgroundColor: '#467D9A', color: 'white', borderRadius: '9999px' }}>
                <FaBriefcase />
              </div>
              <div className="ml-4">
                <p className="text-normal font-semibold leading-tight">Sign Up as an Investor</p>
                <p className="text-gray-600 leading-tight">Create an account to invest in projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        className={`w-full max-w-lg py-2 px-4 rounded ${selectedRole ? 'bg-primary hover:bg-secondary text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
        disabled={!selectedRole}
        onClick={handleJoinClick} 
      >
        {selectedRole ? `Join as a ${selectedRole === 'developer' ? 'Developer' : 'Investor'}` : 'Select a Role to Join'}
      </button>
    </div>
  );
};

export default SignupChoice;

