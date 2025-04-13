import React, { useState, useRef, useEffect } from "react";
import Layout from "../../sharedComponents/layout/layout";
import { Coffee, MoreVertical, Plus, RefreshCw, Search } from "lucide-react";

const CategoryComponent: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const addCategory = () => {
    // Implementation for adding a category would go here
    alert("Add category clicked");
  };
  return (
    <Layout viewName="Category">
      <div className="bg-[var(--background-color-backgroundWhite)] flex space-x-2 mb-4 justify-between items-center p-4 rounded-lg">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search Category"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <RefreshCw className="h-5 w-5 mr-1" />
            <span>Reorder</span>
          </button>

          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            {/* <FileExport className="h-5 w-5 mr-1" /> */}
            <span>Export</span>
          </button>

          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            {/* <FileImport className="h-5 w-5 mr-1" /> */}
            <span>Import</span>
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="bg-[var(--background-color-backgroundWhite)] w-1/3 border-r border-gray-200">
          <div className="flex justify-between items-center mb-4 p-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Category</h2>
              <p className="text-sm text-gray-500">
                Organise and manage products or services for better
                discoverability and navigation.
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={addCategory}
                className="px-3 py-1 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Add
              </button>
              <button className="p-1 text-gray-500 hover:bg-gray-100 rounded">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>

          {categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-gray-100 rounded-full p-8 mb-4">
                <div className="w-16 h-16 text-gray-400 flex items-center justify-center">
                  <svg
                    className="w-12 h-12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" />
                    <path d="M7 7H17" />
                    <path d="M7 12H17" />
                    <path d="M7 17H13" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No Categories Yet
              </h3>
              <p className="text-gray-500 text-center mb-4">
                Add your first category to organize your menu!
              </p>
              <button
                onClick={addCategory}
                className="px-4 py-2 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Add
              </button>
            </div>
          ) : (
            <div>{/* Category list would go here */}</div>
          )}
        </div>

        <div className="bg-[var(--background-color-backgroundWhite)] w-2/3">
          <div className=" rounded-lg p-4">
            <img
              src="addNewCategory.png"
              alt="Add New Category"
              className="mb-4"
            />

            <h3 className="text-lg font-medium text-gray-700 mb-2 text-center">
              Learn More About How Our Menu Works
            </h3>
            <p className="text-gray-600 text-center text-sm mb-4">
              Our menu structure is designed to give you complete flexibility
              and customization. Organize your menu in a way that suits your
              business and simplifies the browsing experience for your
              customers. Here's how it works.
            </p>

            <div className="flex justify-center">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryComponent;
