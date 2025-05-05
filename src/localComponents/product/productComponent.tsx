import React, { useState, useRef, useEffect } from "react";
import Layout from "../../sharedComponents/layout";
import SearchWithButtons from "../../sharedComponents/searchWithButtons";
import {
  EmptyCartonImg,
  ExportIcon,
  ImportIcon,
} from "../../assets/images/svgAssets";
import { Modal, ModalBody, ModalHeader } from "../../sharedComponents/Modal";
import NewProductForm from "../../helperComponents/newProductForm";
import { CompleteFormData, ProductFormRef } from "../../types";
import ProductsTable from "../../helperComponents/ProductsTable";

const ProductComponent: React.FC = () => {
  const [products, setProducts] = useState([]); // State to hold products
  const [showNewProductsFormModal, setShowNewProductsFormModal] =
    useState(false);
  const formRef = useRef<ProductFormRef>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<CompleteFormData | null>(
    null
  );

  // Function to handle external form submission
  const handleSaveProduct = () => {
    if (formRef.current) {
      setIsSubmitting(true);

      try {
        const formData = formRef.current.submitForm();
        setSubmittedData(formData);
        setFormSubmitted(true);

        // Example API call
        // await fetch('/api/products', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(formData),
        // });

        // Show success message or redirect
        console.log("Form submitted successfully:", formData);
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle error state
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Optional: Track form changes
  const handleFormDataChange = (data: CompleteFormData) => {
    console.log("Form data changed:", data);
    // You could use this to enable/disable the save button based on form validity
  };

  return (
    <>
      <Layout viewName="Products">
        <SearchWithButtons
          searchPlaceHolder="Search Products"
          onSearch={(query) => {
            console.log(query);
            // Handle search query
          }}
        >
          <button className="flex items-center px-3 py-2 border border-transparent hover:border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 gap-2">
            <ExportIcon />
            <span> Export </span>
          </button>

          <button className="flex items-center px-3 py-2 border border-transparent hover:border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 gap-2">
            <ImportIcon />
            <span> Import </span>
          </button>
          <button
            onClick={() => setShowNewProductsFormModal(true)}
            className="px-4 py-2 bg-bgButton border border-bgButton rounded text-whiteColor hover:bg-btnBorder"
          >
            Add Product
          </button>
        </SearchWithButtons>
        {/* {products.length === 0 ? ( */}
        {false ? (
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
              onClick={() => setShowNewProductsFormModal(true)}
              className="px-4 py-2 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              Add
            </button>
          </div>
        ) : (
          <ProductsTable />
        )}
      </Layout>
      {showNewProductsFormModal && (
        <Modal addClass="!absolute top-0 right-0 rounded-none h-full w-[52rem]">
          <ModalHeader addClass="w-full">
            <div className="flex items-center justify-between">
              <span>Add New Products</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowNewProductsFormModal(false);
                  }}
                  className=" px-[8px] py-[6px] justify-center items-center text-center text-[12px] font-semibold leading-[130%] bg-white border border-reloadBorder rounded text-cardValue hover:bg-btnBorder"
                >
                  Discard
                </button>
                <button
                  onClick={handleSaveProduct}
                  className=" px-[8px] py-[6px] justify-center items-center text-center text-[12px] font-semibold leading-[130%] bg-bgButton border border-bgButton rounded text-whiteColor hover:bg-btnBorder"
                >
                  Save
                </button>
              </div>
            </div>
          </ModalHeader>
          <ModalBody addClass="max-h-[88vh]">
            <div className="w-full flex flex-col gap-2">
              <NewProductForm ref={formRef} />
            </div>
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

export default ProductComponent;
