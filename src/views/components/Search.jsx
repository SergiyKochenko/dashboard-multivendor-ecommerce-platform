import React from 'react';

const Search = ({ setParPage, setSearchValue, searchValue, variant = 'dark' }) => {
  const isLight = variant === 'light';

  const inputClass = isLight
    ? 'px-4 py-2.5 outline-none bg-white border border-slate-200 rounded-lg text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition'
    : 'px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]';

  return (
    <div className="flex justify-between items-center gap-3 flex-wrap">
      <select
        onChange={(e) => setParPage(parseInt(e.target.value))}
        className={inputClass}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        className={inputClass}
        type="text"
        placeholder="search"
      />
    </div>
  );
};

export default Search;
