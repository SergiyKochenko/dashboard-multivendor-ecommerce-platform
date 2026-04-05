import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

const UnAuthorized = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="px-2 lg:px-7 py-5">
      <div
        className={`w-full rounded-md bg-[#6a5fdf] p-4 text-[#d0d2d6] shadow-lg shadow-[#5148b21a] transition-all duration-500 ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}
      >
        <div className="rounded-md border border-[#8f87e6] bg-[#5c51d1] px-4 py-8 md:px-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:shadow-[#2f2a7b38]">
          <FaLock className="text-[#ffcb57] text-5xl mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-[#ecebff] mb-6 max-w-xl leading-6">
            You do not have permission to view this page. Please log in with the correct account or contact your
            administrator if you believe this is a mistake.
          </p>
        <Link
          to="/"
          className="px-6 py-2 rounded-md bg-[#ea454c] text-white font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d6343b] hover:shadow-md hover:shadow-[#7f1f2547]"
        >
          Go to Home
        </Link>
        </div>
      </div>
    </div>
  );
};

export default UnAuthorized;
