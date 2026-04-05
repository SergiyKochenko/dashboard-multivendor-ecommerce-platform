import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaBan, FaRegCommentDots, FaSignOutAlt, FaStoreAlt, FaUserCog } from 'react-icons/fa';
import { logout } from '../store/Reducers/authReducer';

const Deactive = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role, userInfo, loader } = useSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onLogout = () => {
    dispatch(logout({ navigate, role }));
  };

  return (
    <div className="px-2 lg:px-7 py-5">
      <div
        className={`w-full rounded-md bg-[#6a5fdf] p-4 text-[#d0d2d6] shadow-lg shadow-[#5148b21a] transition-all duration-500 ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}
      >
        <div className="rounded-md border border-[#8f87e6] bg-[#5c51d1] px-4 py-5 md:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#bdb8ff] bg-[#ecebff] px-3 py-1 text-sm font-semibold text-[#2e2a73]">
            <FaBan />
            Account Status: Deactive
          </div>

          <h1 className="mt-4 text-2xl font-bold text-white md:text-3xl">
            Your seller account is currently deactivated
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#ecebff] md:text-base">
            You still have access to support and your profile, but selling features are temporarily locked.
            Reach out to support for reactivation details and next steps.
          </p>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="rounded-md border border-[#857bdc] bg-[#584dc8] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2f2a7b38]">
            <h2 className="text-base font-bold text-[#f5f6ff]">Available right now</h2>
            <ul className="mt-4 space-y-3 text-sm text-[#dfe2ff]">
              <li className="flex items-center gap-2">
                <FaRegCommentDots className="text-[#ffcb57]" />
                Contact admin support
              </li>
              <li className="flex items-center gap-2">
                <FaUserCog className="text-[#ffcb57]" />
                Review and update profile information
              </li>
              <li className="flex items-center gap-2">
                <FaStoreAlt className="text-[#ffcb57]" />
                Access order records that remain visible
              </li>
            </ul>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                to="/seller/dashboard/chat-support"
                className="inline-flex items-center justify-center rounded-md bg-[#ffb400] px-4 py-2 text-sm font-semibold text-[#312b00] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f0aa00] hover:shadow-md hover:shadow-[#ffb40055]"
              >
                Contact Support
              </Link>

              <Link
                to="/seller/dashboard/profile"
                className="inline-flex items-center justify-center rounded-md border border-[#c9c5ff] bg-[#7168de] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#655bd6] hover:shadow-md hover:shadow-[#2925694f]"
              >
                Open Profile
              </Link>
            </div>
          </div>

          <div className="rounded-md border border-[#857bdc] bg-[#584dc8] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2f2a7b38]">
            <h2 className="text-base font-bold text-[#f5f6ff]">Account summary</h2>
            <div className="mt-4 space-y-2 text-sm text-[#dfe2ff]">
              <p>
                <span className="font-semibold">Shop:</span> {userInfo?.shopInfo?.shopName || 'Not provided'}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {userInfo?.email || 'Not available'}
              </p>
              <p>
                <span className="font-semibold">Current status:</span>{' '}
                <span className="rounded bg-[#ecebff] px-2 py-1 text-xs font-bold uppercase text-[#2e2a73]">
                  {userInfo?.status || 'deactive'}
                </span>
              </p>
            </div>

            <div className="mt-6 rounded-md border border-dashed border-[#a89ff7] bg-[#665ccf] p-4 text-sm text-[#f0f1ff]">
              If this status looks incorrect, contact support and include your registered email for faster verification.
            </div>

            <button
              type="button"
              onClick={onLogout}
              disabled={loader}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#ea454c] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d6343b] hover:shadow-md hover:shadow-[#7f1f2547] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaSignOutAlt />
              {loader ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deactive;
