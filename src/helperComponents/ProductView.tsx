import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import {
  SubSubCategory,
  ProductViewProps,
  ProductFormRef,
  CompleteFormData,
  CategoryFormHandle,
} from "../types";
import { Search } from "lucide-react";
import SearchInput from "../sharedComponents/SearchInput";
import NewProductForm from "./newProductForm";
import {
  CategoryIcon,
  DeleteIcon,
  EmptyCartonImg,
  BackArrow,
} from "../assets/images/svgAssets";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../sharedComponents/Modal";
import ProductsTable from "./ProductsTable";
import Card from "../sharedComponents/card";
import DataTableForMobile from "./dataTableMobile";

const ProductView = forwardRef<
  CategoryFormHandle,
  {
    subSubCat: SubSubCategory;
  }
>(({ subSubCat }, ref) => {
  const [showAddProductsModal, setShowAddProductsModal] = useState(false);
  const [showNewProductsFormModal, setShowNewProductsFormModal] =
    useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Espresso",
      price: "$3.99",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Espresso",
      price: "$3.99",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "Espresso",
      price: "$3.99",
      image: "https://via.placeholder.com/50",
    },
  ]);
  const formRef = useRef<ProductFormRef>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<CompleteFormData | null>(
    null
  );
  const [showMobileTable, setShowMobileTable] = useState<boolean>(true);

  useImperativeHandle(ref, () => ({
    submit: async () => {
      setShowAddProductsModal(true);
    },
  }));

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
      <div>
        {" "}
        <div className="border border-grey-border rounded-lg w-full">
          {/* Header with search and add button */}
          <div className="flex items-center justify-between p-2 border-b border-grey-border">
            <div className="text-textHeading text-xs leading-tight font-[500]">
              ({subSubCat?.products?.length ?? 0}) products in{" "}
              <span className="font-[700]">{subSubCat.name}</span>
            </div>
            <div className="flex gap-2">
              <SearchInput placeHolder="Search Products" onSearch={() => {}} />
              <button
                onClick={() => {
                  setShowAddProductsModal(true);
                }}
                className="px-4 py-2 bg-bgButton border border-bgButton rounded text-whiteColor hover:bg-btnBorder"
              >
                Add
              </button>
            </div>
          </div>

          {/* Empty state content */}
          {/* {subSubCat?.products?.length ?? 0 ? ( */}
          {true ? (
            <>
              <div className="hidden sm:block">
                <ProductsTable />
              </div>
              {showMobileTable && (
                <div className="block sm:hidden w-full absolute top-[-4.5rem] right-0">
                  <div
                    className="bg-background-grey h-[60px] flex items-center gap-2 text-textHeading font-inter text-[12px] font-medium leading-[130%]
"
                  >
                    <button
                      onClick={() => {
                        setShowMobileTable(false);
                      }}
                      className=" bg-white border border-gray-300 rounded text-textHeading hover:bg-gray-50 p-[6px]"
                    >
                      <BackArrow />
                    </button>
                    (6) products in <span className="font-[700]">Coffee</span>{" "}
                    (Queenstown Public House)
                  </div>
                  <Card addClass="max-h-[calc(100vh-110px)] overflow-y-auto">
                    <div className="flex lg:hidden items-center justify-between mt-4 gap-4 ">
                      <SearchInput
                        onSearch={() => {}}
                        placeHolder={"Search products"}
                        addClass="grow"
                      />
                      <button
                        onClick={() => {
                          setShowAddProductsModal(true);
                        }}
                        className="px-4 py-2 bg-bgButton border border-bgButton rounded text-whiteColor hover:bg-btnBorder"
                      >
                        Add
                      </button>
                    </div>
                    <DataTableForMobile />
                  </Card>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              {/* Empty box illustration */}
              <div className="mb-4">
                <div className="text-gray-400 flex items-center justify-center">
                  <EmptyCartonImg />
                </div>
              </div>
              <h3 className="text-[14px] text-lg font-medium  mb-2 text-headding-color">
                No products added yet
              </h3>
              <p className=" text-center mb-4 text-cardTitle">
                Add your first product to get started!
              </p>
              <button
                onClick={() => {
                  setShowAddProductsModal(true);
                }}
                className="px-4 py-2 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Add
              </button>
            </div>
          )}
        </div>
      </div>

      {showAddProductsModal && (
        <Modal addClass="!absolute top-0 right-0 rounded-none h-full w-[40rem]">
          <ModalHeader addClass="w-full">
            <div className="flex items-center justify-between">
              <span>
                Add Products in{" "}
                <span className="underline">{subSubCat.name}</span>
              </span>
              <div className="hidden sm:flex gap-2">
                <button
                  onClick={() => {
                    setShowAddProductsModal(false);
                  }}
                  className=" px-[8px] py-[6px] justify-center items-center text-center text-[12px] font-semibold leading-[130%] bg-white border border-reloadBorder rounded text-cardValue hover:bg-btnBorder"
                >
                  Discard
                </button>
                <button
                  onClick={() => {}}
                  className=" px-[8px] py-[6px] justify-center items-center text-center text-[12px] font-semibold leading-[130%] bg-bgButton border border-bgButton rounded text-whiteColor hover:bg-btnBorder"
                >
                  Save
                </button>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="w-full flex flex-col gap-2">
              {/* Add new product button */}
              <button
                className="rounded-[6px] border border-reloadBorder bg-white w-full py-2 text-center font-semibold text-center text-[12px] font-semibold leading-[130%] text-cardValue font-inter"
                onClick={() => {
                  setShowNewProductsFormModal(true);
                }}
              >
                Add new product
              </button>

              {/* Divider with "Or" */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-gray-400 text-sm">Or</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              {/* Search input */}
              <SearchInput placeHolder="Search Product" onSearch={() => {}} />

              {/* Product list */}
              <div className="space-y-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-start justify-between bg-white p-3 rounded-lg shadow-sm border"
                  >
                    {/* Left side */}
                    <div className="flex items-center gap-3">
                      {/* <img
                    src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-md object-cover"
                      /> */}
                      <div
                        // alt={product.name}
                        className="w-12 h-12 rounded-md object-cover"
                      >
                        <CategoryIcon />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-medium leading-[130%] text-textHeading">
                          {product.name}
                        </span>
                        <span className="text-[11px] font-medium leading-[130%] text-cardTitle">
                          {product.price}
                        </span>
                      </div>
                    </div>

                    {/* Delete icon */}
                    <button className="text-red-500 text-xl">
                      <DeleteIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </ModalBody>
          <ModalFooter
            addClass=""
            onPrimaryBtnClick={() => {}}
            onSecondaryBtnClick={() => setShowAddProductsModal(false)}
            secondaryBtnLable="Discard"
            primaryBtnLable="Save"
          />
        </Modal>
      )}
      {showNewProductsFormModal && (
        <Modal addClass="!absolute top-0 right-0 rounded-none h-full w-[52rem]">
          <ModalHeader addClass="w-full">
            <div className="flex items-center justify-between">
              <span>Add New Products</span>
              <div className="hidden sm:flex gap-2">
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
          <ModalFooter
            addClass=""
            onPrimaryBtnClick={() => {
              handleSaveProduct;
            }}
            onSecondaryBtnClick={() => setShowNewProductsFormModal(false)}
            secondaryBtnLable="Discard"
            primaryBtnLable="Save"
          />
        </Modal>
      )}
    </>
  );
});

export default ProductView;
