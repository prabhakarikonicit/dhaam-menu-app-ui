import React, { useState, useRef, useEffect } from "react";
import Layout from "../../sharedComponents/layout";
import SearchWithButtons from "../../sharedComponents/searchWithButtons";
import {
  EmptyCartonImg,
  ExportIcon,
  ImportIcon,
} from "../../assets/images/svgAssets";

const ProductComponent: React.FC = () => {
  const [products, setProducts] = useState([]); // State to hold products
  const addProduct = () => {
    alert("Add product clicked");
  };
  return (
    <Layout viewName="Products">
      <SearchWithButtons
        onSearch={(query) => {
          console.log(query);
          // Handle search query
        }}
      >
        <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 gap-2">
          <ExportIcon />
          <span> Export </span>
        </button>

        <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 gap-2">
          <ImportIcon />
          <span> Import </span>
        </button>
        <button
          onClick={addProduct}
          className="px-4 py-2 bg-bgButton border border-bgButton rounded text-whiteColor hover:bg-btnBorder"
        >
          Add Product
        </button>
      </SearchWithButtons>
      {products.length === 0 ? (
        <div className="flex flex-col items-center  mt-[72px]">
          <div className="bg-gray-100 rounded-full mb-4 ">
            <div className="text-gray-400 flex items-center justify-center">
              <EmptyCartonImg />
            </div>
          </div>
          <h3 className="text-[14px] text-lg font-medium text-gray-700 mb-2 text-headding-color">
            No Products Yet
          </h3>
          <p className="text-gray-500 text-center mb-4 text-cardTitle">
            Add your first Product to get started!
          </p>
          <button
            onClick={addProduct}
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

export default ProductComponent;
