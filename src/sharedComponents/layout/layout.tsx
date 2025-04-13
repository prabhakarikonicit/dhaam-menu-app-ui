import React, { useState } from "react";

interface LayoutCProps {
  children: React.ReactNode;
  viewName?: string;
  addClass?: string;
}
const Layout: React.FC<LayoutCProps> = ({ children, viewName, addClass }) => {
  const [selectedVenue, setSelectedVenue] = useState("Queenstown Public House");

  return (
    <div className={`p-4 max-w-7xl mx-auto font-inter ${addClass}`}>
      <div className="flex justify-between items-center mb-4">
        <h5 className="font-inter font-semibold text-[20px] leading-[150%] tracking-normal text-cardValue">
          {viewName}
        </h5>

        <div className="relative">
          <select
            className="appearance-none border border-gray-300 rounded-lg py-2 px-4 pr-8 bg-white text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedVenue}
            onChange={(e) => setSelectedVenue(e.target.value)}
          >
            <option>Queenstown Public House</option>
            <option>Other Venues...</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default Layout;
