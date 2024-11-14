import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const TableSerachBar = ({ onSearch, placeholder = "Search..." }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); 
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md p-2 w-full">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder={placeholder}
        className="outline-none border-none rounded-sm text-sm p-1 w-full"
      />
      <button onClick={() => onSearch(query)} className="ml-2">
        <FaSearch className="text-primary"/>
      </button>
    </div>
  );
};

export default TableSerachBar;