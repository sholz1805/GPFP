import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl md:text-2xl font-medium text-gray-700 mb-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-gray-500 mb-6">
          It might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="inline-flex items-center bg-primary text-white font-medium py-2 px-4 rounded hover:bg-secondary transition duration-300"
        >
          <FaHome className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
