import React from 'react';

const SearchInput = () => {
  return (
    <input
      type="text"
      className="bg-transparent border border-gray-300 rounded-full py-1 px-4 focus:outline-none w-80"
      placeholder="Search..."
    />
  );
};

export default SearchInput;
