import React, { useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = () => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", query);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-row gap-2 items-center w-full">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
          className="p-4 text-lg rounded-lg w-full bg-[#2b2b2b] focus:outline-1 focus:outline-white"
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="p-4 text-lg rounded-lg focus:outline-1 cursor-pointer">🔍</button>
      </div>
    </div>
  );
};

export default SearchBar;
