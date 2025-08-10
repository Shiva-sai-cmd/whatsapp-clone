import React from 'react';
import { IoSearch } from 'react-icons/io5';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <IoSearch className="search-icon" />
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search or start new chat" 
        />
      </div>
    </div>
  );
};

export default SearchBar;