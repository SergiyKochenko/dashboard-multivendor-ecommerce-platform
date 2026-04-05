import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({ statusCode, title, message, accentClass = 'text-[#ffcb57]' }) => {
  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full rounded-md bg-[#6a5fdf] p-4 text-[#d0d2d6] shadow-lg shadow-[#5148b21a]">
        <div className="rounded-md border border-[#8f87e6] bg-[#5c51d1] px-4 py-10 md:px-6 text-center">
          <p className={`text-6xl font-black tracking-tight ${accentClass}`}>{statusCode}</p>
          <h1 className="text-3xl font-bold text-white mt-2 mb-3">{title}</h1>
          <p className="text-[#ecebff] max-w-xl mx-auto leading-6 mb-8">{message}</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              to="/"
              className="px-6 py-2 rounded-md bg-[#ea454c] text-white font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d6343b]"
            >
              Go to Home
            </Link>
            <Link
              to="/login"
              className="px-6 py-2 rounded-md bg-[#2f3a55] text-white font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#243048]"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
