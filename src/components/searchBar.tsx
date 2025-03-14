import React, { useState } from "react";
import "../styling/SearchBar.css";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", query);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
          className="search-input"
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
    </div>
  );
};

export default SearchBar;
