import React, { ChangeEvent } from "react";
import { SearchIcon } from "../assets/images/svgAssets";
import { SearchInputProps } from "../types";

const SearchInput: React.FC<SearchInputProps> = ({
  placeHolder = "Search",
  onSearch,
  addClass,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder={placeHolder}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchInput;
