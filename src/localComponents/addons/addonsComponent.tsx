import React, { useState, useRef, useEffect } from "react";
import Layout from "../../sharedComponents/layout";
import SearchWithButtons from "../../sharedComponents/searchWithButtons";
import { EmptyCartonImg } from "../../assets/images/svgAssets";

const AddonsComponent: React.FC = () => {
  const [addOns, setAddOns] = useState([]); // State to hold add-ons
  const createNewAddon = () => {
    alert("Create new add-on clicked");
    // Implementation for creating a new add-on would go here
  };
  return (
    <Layout viewName="Add-ons">
      <SearchWithButtons
        onSearch={(query) => {
          console.log(query);
          // Handle search query
        }}
      >
        <button
          onClick={createNewAddon}
          className="px-4 py-2 bg-bgButton border border-bgButton rounded text-whiteColor hover:bg-btnBorder"
        >
          Create New
        </button>
      </SearchWithButtons>
      {addOns.length === 0 ? (
        <div className="flex flex-col items-center  mt-[72px]">
          <div className="bg-gray-100 rounded-full mb-4 ">
            <div className="text-gray-400 flex items-center justify-center">
              <EmptyCartonImg />
            </div>
          </div>
          <h3 className="text-[14px] text-lg font-medium text-gray-700 mb-2 text-headding-color">
            No Add-ons Yet
          </h3>
          <p className="text-gray-500 text-center mb-4 text-cardTitle">
            Create add-on groups to allow customers to customise their orders
            and enhance their experience.
          </p>
          <button
            onClick={createNewAddon}
            className="px-4 py-2 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Add
          </button>
        </div>
      ) : (
        <div>{/* Category list would go here */}</div>
      )}
    </Layout>
  );
};

export default AddonsComponent;
