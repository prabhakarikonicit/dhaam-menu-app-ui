import React, { useState, useRef, useEffect } from "react";
import Layout from "../../sharedComponents/layout";
import SearchWithButtons from "../../sharedComponents/searchWithButtons";
import {
  ColumnIcon,
  EmptyCartonImg,
  ExportIcon,
  FilterIcon,
} from "../../assets/images/svgAssets";
import { Modal, ModalBody, ModalHeader } from "../../sharedComponents/Modal";
import { AddOnFormHandle, AddonFormRef } from "../../types";
import NewAddonForm from "../../helperComponents/newAddonForm";
import ProductsTable from "../../helperComponents/ProductsTable";
import SearchInput from "../../sharedComponents/SearchInput";
import Card from "../../sharedComponents/card";
import AddOnTable from "../../helperComponents/AddOnTable";

const AddonsComponent: React.FC = () => {
  const [addOns, setAddOns] = useState([1]); // State to hold add-ons
  const [showNewAddOnFormModal, setShowNewAddOnFormModal] = useState(false);
  const formRef = useRef<AddOnFormHandle>(null); // Ref for the new product form
  const createNewAddon = () => {
    // Implementation for creating a new add-on would go here
    setShowNewAddOnFormModal(true);
  };
  const handleSaveAddon = async () => {
    try {
      const categoryData = await formRef.current?.submit();
      console.log(categoryData);
      setShowNewAddOnFormModal(false);
    } catch (error) {
      console.error("Error saving add-on:", error);
    }
  };
  return (
    <>
      <Layout viewName="Add-ons">
        {addOns.length === 0 ? (
          <>
            <SearchWithButtons
              searchPlaceHolder="Search Add-ons"
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
            <div className="flex flex-col items-center  mt-[72px]">
              <div className="bg-gray-100 rounded-full mb-4 ">
                <div className="text-gray-400 flex items-center justify-center">
                  <EmptyCartonImg />
                </div>
              </div>
              <h3 className="text-[14px] text-lg font-medium  mb-2 text-headding-color">
                No Add-ons Yet
              </h3>
              <p className=" text-center mb-4 text-cardTitle">
                Create add-on groups to allow customers to customise their
                orders and enhance their experience.
              </p>
              <button
                onClick={createNewAddon}
                className="px-4 py-2 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Add
              </button>
            </div>
          </>
        ) : (
          <Card addClass="max-h-[83vh] flex">
            <div className="border border-grey-border rounded-lg w-full flex flex-col">
              <div className="flex items-center justify-between p-2 border-b border-grey-border">
                <div className="text-textHeading text-xs leading-tight font-[500]">
                  Add-ons
                  <span className="font-[700]"> ({addOns.length ?? 0})</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center px-3 py-2 border border-transparent hover:border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 gap-2">
                    <ColumnIcon />
                    <span> Column </span>
                  </button>
                  <button className="flex items-center px-3 py-2 border border-transparent hover:border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 gap-2">
                    <FilterIcon />
                    <span> Filter </span>
                  </button>
                  <button className="flex items-center px-3 py-2 border border-transparent hover:border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 gap-2">
                    <ExportIcon />
                    <span> Export </span>
                  </button>
                  <SearchInput
                    placeHolder="Search Add-ons"
                    onSearch={() => {}}
                  />
                  <button
                    onClick={createNewAddon}
                    className="px-4 py-2 bg-bgButton border border-bgButton rounded text-whiteColor hover:bg-btnBorder"
                  >
                    Create New
                  </button>
                </div>
              </div>
              <AddOnTable />
            </div>
          </Card>
        )}
      </Layout>
      {showNewAddOnFormModal && (
        <Modal addClass="!absolute top-0 right-0 rounded-none h-full w-[52rem]">
          <ModalHeader addClass="w-full">
            <div className="flex items-center justify-between">
              <span>Add New Products</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowNewAddOnFormModal(false);
                  }}
                  className=" px-[8px] py-[6px] justify-center items-center text-center text-[12px] font-semibold leading-[130%] bg-white border border-reloadBorder rounded text-cardValue hover:bg-btnBorder"
                >
                  Discard
                </button>
                <button
                  onClick={handleSaveAddon}
                  className=" px-[8px] py-[6px] justify-center items-center text-center text-[12px] font-semibold leading-[130%] bg-bgButton border border-bgButton rounded text-whiteColor hover:bg-btnBorder"
                >
                  Save
                </button>
              </div>
            </div>
          </ModalHeader>
          <ModalBody addClass="max-h-[88vh]">
            <div className="w-full flex flex-col gap-2">
              <NewAddonForm ref={formRef} />
            </div>
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

export default AddonsComponent;
