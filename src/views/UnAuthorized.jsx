import React from 'react';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

const UnAuthorized = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-red-100 to-red-300">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        <FaLock className="text-red-500 text-5xl mb-4" />
        <h1 className="text-3xl font-bold text-red-600 mb-2">Access Denied</h1>
        <p className="text-gray-700 mb-6 text-center max-w-xs">
          You do not have permission to view this page.<br />
          Please log in with the correct account or contact your administrator if you believe this is a mistake.
        </p>
        <Link
          to="/"
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded shadow transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default UnAuthorized;
