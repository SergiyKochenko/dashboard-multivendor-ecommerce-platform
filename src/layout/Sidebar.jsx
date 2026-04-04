import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getNav } from '../navigation/index';
import { BiLogOutCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/Reducers/authReducer';
import logo from '../assets/logo.png';

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [popupActive, setPopupActive] = useState(false);
  const popupTimerRef = useRef(null);

  const handleLogout = () => {
    setShowLogoutPopup(true);
    requestAnimationFrame(() => setPopupActive(true));
  };

  const confirmLogout = () => {
    setPopupActive(false);
    if (popupTimerRef.current) {
      clearTimeout(popupTimerRef.current);
    }
    popupTimerRef.current = setTimeout(() => {
      setShowLogoutPopup(false);
      dispatch(logout({ navigate, role }));
    }, 180);
  };

  const closeLogoutPopup = () => {
    setPopupActive(false);
    if (popupTimerRef.current) {
      clearTimeout(popupTimerRef.current);
    }
    popupTimerRef.current = setTimeout(() => {
      setShowLogoutPopup(false);
    }, 180);
  };

  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState([]);
  useEffect(() => {
    const navs = getNav(role);
    setAllNav(navs);
  }, [role]);

  useEffect(() => {
    return () => {
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
    };
  }, []);
  // console.log(allNav)

  return (
    <div>
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed duration-200 ${!showSidebar ? 'invisible' : 'visible'} w-screen h-screen bg-[#8cbce780] top-0 left-0 z-10`}
      ></div>

      <div
        className={`w-[260px] fixed bg-[#e6e7fb] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${showSidebar ? 'left-0' : '-left-[260px] lg:left-0'} `}
      >
        <div className="h-[70px] flex justify-center items-center">
          <Link to="/" className="w-[180px] h-[50px]">
            <img className="w-full h-full" src={logo} alt="" />
          </Link>
        </div>

        <div className="px-[16px]">
          <ul>
            {allNav.map((n, i) => (
              <li key={i}>
                <Link
                  to={n.path}
                  className={`${pathname === n.path ? 'bg-blue-600 shadow-indigo-500/50 text-white duration-500' : 'text-[#030811] font-bold duration-200 '} px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1 `}
                >
                  <span>{n.icon}</span>
                  <span>{n.title}</span>
                </Link>
              </li>
            ))}

            <li>
              <button
                onClick={handleLogout}
                className="text-[#030811] font-bold duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1"
              >
                <span>
                  <BiLogOutCircle />
                </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {showLogoutPopup && (
        <div
          className={`fixed inset-0 z-[80] flex items-center justify-center px-4 transition-all duration-200 ${
            popupActive ? 'bg-[#101539bf] opacity-100' : 'bg-[#10153900] opacity-0'
          }`}
          onClick={closeLogoutPopup}
        >
          <div
            className={`w-full max-w-[420px] rounded-xl bg-white shadow-2xl border border-[#e4e6ff] overflow-hidden transform transition-all duration-200 ${
              popupActive ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-gradient-to-r from-[#eef0ff] to-[#f7f8ff] border-b border-[#e4e6ff]">
              <h3 className="text-lg font-bold text-[#232857]">Confirm Logout</h3>
              <p className="text-sm text-[#565f92] mt-1">
                {role === 'admin'
                  ? 'You are logging out from the Admin dashboard.'
                  : 'You are logging out from the Seller dashboard.'}
              </p>
            </div>

            <div className="px-6 py-5">
              <p className="text-sm text-[#30386b]">Are you sure you want to continue?</p>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={closeLogoutPopup}
                  className="px-4 py-2 rounded-md border border-[#cfd3f2] text-[#4f588f] font-semibold hover:bg-[#f3f5ff] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 rounded-md bg-[#3640a8] text-white font-semibold hover:bg-[#2d368b] transition-all shadow-lg shadow-[#3640a82e]"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Sidebar;
