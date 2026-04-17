import React from 'react';
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';

const Pagination = ({ pageNumber, setPageNumber, totalItem, parPage, showItem, variant = 'dark' }) => {
  let totalPage = Math.ceil(totalItem / parPage);
  let startPage = pageNumber;
  const isLight = variant === 'light';

  let dif = totalPage - pageNumber;
  if (dif <= showItem) {
    startPage = totalPage - showItem;
  }
  let endPage = startPage < 0 ? showItem : showItem + startPage;

  if (startPage <= 0) {
    startPage = 1;
  }

  const createBtn = () => {
    const btns = [];
    for (let i = startPage; i < endPage; i++) {
      btns.push(
        <li
          key={`page-${i}`}
          onClick={() => setPageNumber(i)}
          className={`w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer transition-colors ${
            isLight
              ? pageNumber === i
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700'
              : pageNumber === i
                ? 'bg-indigo-300 shadow-lg shadow-indigo-300/50 text-white'
                : 'bg-slate-600 hover:bg-indigo-400 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]'
          }`}
        >
          {i}
        </li>
      );
    }
    return btns;
  };
  return (
    <ul className="flex gap-3">
      {pageNumber > 1 && (
        <li
          onClick={() => setPageNumber(pageNumber - 1)}
          className={`w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer transition-colors ${
            isLight
              ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              : 'bg-slate-300 text-[#000000]'
          }`}
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </li>
      )}
      {createBtn()}
      {pageNumber < totalPage && (
        <li
          onClick={() => setPageNumber(pageNumber + 1)}
          className={`w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer transition-colors ${
            isLight
              ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              : 'bg-slate-300 text-[#000000]'
          }`}
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
