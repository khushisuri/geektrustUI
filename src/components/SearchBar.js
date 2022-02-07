import React from "react";

export const SearchBar = ({ filterResults }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="search by name email or role"
        onChange={(e) => {
          filterResults(e);
        }}
      ></input>
    </div>
  );
};
