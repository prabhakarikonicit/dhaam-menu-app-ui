import React, { useState, useRef, useEffect } from "react";
import Layout from "../../sharedComponents/layout";
import { Coffee, MoreVertical, Plus, RefreshCw, Search } from "lucide-react";
import Card from "../../sharedComponents/card";
import {
  SearchIcon,
  NoCatagoryIcon,
  ReorderIcon,
  ExportIcon,
  ImportIcon,
  AddCatagoryImg,
} from "../../assets/images/svgAssets";
import SearchInput from "../../sharedComponents/SearchInput";
import SearchWithButtons from "../../sharedComponents/searchWithButtons";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../sharedComponents/Modal/index";
import AddCatagoryForm from "../../helperComponents/addCategoryForm";
import { CategoryFormHandle } from "../../types";

const CategoryComponent: React.FC = () => {
  const formRef = useRef<CategoryFormHandle>(null);
  const [categories, setCategories] = useState([]);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const addCategory = () => {
    // Implementation for adding a category would go here

    setShowAddCategoryModal(true);
  };
  return (
    <>
      <Layout viewName="Category" addClass="font-inter">
        <SearchWithButtons
          onSearch={(query) => {
            console.log(query);
            // Handle search query
          }}
        >
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 gap-2">
            <ReorderIcon />
            <span> Reorder </span>
          </button>

          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 gap-2">
            <ExportIcon />
            <span> Export </span>
          </button>

          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 gap-2">
            <ImportIcon />
            <span> Import </span>
          </button>
        </SearchWithButtons>

        <div className="flex gap-4">
          <Card addClass="w-1/3">
            <div className="flex justify-between items-start mb-4 border-b border-grey-border pb-2">
              <div>
                <h2 className="text-textHeading text-[14px] leading-[150%] font-medium tracking-normal pb-4">
                  Category
                </h2>
                <p className="text-[12px] text-cardTitle">
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
              <div className="flex flex-col items-center  mt-[72px]">
                <div className="bg-gray-100 rounded-full p-8 mb-4 ">
                  <div className="w-16 h-16 text-gray-400 flex items-center justify-center">
                    <NoCatagoryIcon />
                  </div>
                </div>
                <h3 className="text-[14px] text-lg font-medium text-gray-700 mb-2 text-headding-color">
                  No Categories Yet
                </h3>
                <p className="text-gray-500 text-center mb-4 text-cardTitle">
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
          </Card>
          <Card addClass="w-2/3">
            <div className="mt-[72px]">
              <div className="flex flex-col items-center">
                <AddCatagoryImg />
              </div>
              <div className="my-4">
                <h3 className="text-[14px] text-lg font-medium text-gray-700 mb-2 text-headding-color text-center">
                  Learn More About How Our Menu Works
                </h3>
                <p className=" text-center mb-4 text-cardTitle">
                  Our menu structure is designed to give you complete
                  flexibility and customization. Organize your menu in a way
                  that suits your business and simplifies the browsing
                  experience for your customers. Here's how it works.
                </p>

                <div className="flex justify-center">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
      {showAddCategoryModal && (
        <Modal>
          <ModalHeader closeEvent={() => setShowAddCategoryModal(false)}>
            Add New Category
          </ModalHeader>
          <ModalBody>
            <AddCatagoryForm ref={formRef} />
          </ModalBody>
          <ModalFooter
            primaryBtnLable="Save"
            onPrimaryBtnClick={() => {
              if (formRef.current) {
                formRef.current.submit();
              }
              setShowAddCategoryModal(false);
            }}
            // secondaryBtnLable="Cancel"
            // onSecondaryBtnClick={() => setShowAddCategoryModal(false)}
          ></ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default CategoryComponent;
