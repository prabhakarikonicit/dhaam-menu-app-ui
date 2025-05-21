import React from "react";

import {
  ExportIcon,
  ImportIcon,
  ReorderIcon,
} from "../assets/images/svgAssets";
import SearchInput from "./SearchInput";
import { SearchWithButtonsProps } from "../types";

const SearchWithButtons: React.FC<SearchWithButtonsProps> = ({
  searchPlaceHolder = "Search",
  children,
  onSearch,
  addClass = "",
}) => {
  return (
    <div
      className={`bg-[var(--background-color-backgroundWhite)] flex space-x-2 mb-4 justify-between items-center p-4 rounded-lg ${addClass}`}
    >
      <SearchInput onSearch={onSearch} placeHolder={searchPlaceHolder} />
      <div className="flex items-center space-x-2">{children}</div>
    </div>
  );
};
export default SearchWithButtons;
