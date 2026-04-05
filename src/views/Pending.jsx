import React, { useEffect, useState } from 'react';
import { FaHourglassHalf } from 'react-icons/fa';

const Pending = () => {
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
          <FaHourglassHalf className="text-[#ffcb57] text-5xl mb-4 animate-pulse" />
          <h1 className="text-3xl font-bold text-white mb-2">Pending Approval</h1>
          <p className="text-[#ecebff] mb-2 max-w-xl leading-6">
            Your account is currently pending review. You can still access limited features while we verify your
            submission.
          </p>
          <p className="text-[#dfe2ff] text-sm max-w-xl">
            Please wait for an administrator decision. You will automatically gain full access once your status is
            updated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pending;
