import React from 'react';
import { FaHourglassHalf } from 'react-icons/fa';

const Pending = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-yellow-100 to-yellow-300">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        <FaHourglassHalf className="text-yellow-500 text-5xl mb-4 animate-pulse" />
        <h1 className="text-3xl font-bold text-yellow-600 mb-2">Pending Approval</h1>
        <p className="text-gray-700 mb-6 text-center max-w-xs">
          Your account or request is currently pending approval.<br />
          Please wait for an administrator to review your submission. You will be notified once your status changes.
        </p>
      </div>
    </div>
  );
};

export default Pending;
