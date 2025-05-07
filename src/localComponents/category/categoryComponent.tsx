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
import {
  CategoryFormHandle,
  Category,
  SubCategory,
  SubSubCategory,
} from "../../types";
import MakeCategoryObj from "../../helperComponents/MakeCategoryObj";
import AddCategoryView from "../../helperComponents/addCategoryView";
import AddCatagoryList from "../../helperComponents/addCatagoryList";
import { set } from "react-hook-form";
import { updateCategory } from "../../helperComponents/helperFunctions";
import ProductView from "../../helperComponents/ProductView";

const CategoryComponent: React.FC = () => {
  const formRef = useRef<CategoryFormHandle>(null);
  const subFormRef = useRef<CategoryFormHandle>(null);
  const subSubFormRef = useRef<CategoryFormHandle>(null);
  const subForms = [subFormRef]; // Array of subcategory form references
  const subSubFormsMap: {
    [key: number]: React.RefObject<CategoryFormHandle>[];
  } = {}; // Map to store sub-subcategory form references
  const [categories, setCategories] = useState<Category[]>([
    new MakeCategoryObj(Math.random().toString(36).substring(2, 15))
      .setCategory({
        name: "Beverages",
        description: "Refreshing drinks to energize your day.",
        product: "Coffee",
        image: null,
        isExpanded: false,
      })
      .setSubCategory({
        name: "Hot Beverages",
        description: "Warm drinks to soothe your soul.",
        product: "Tea",
        image: null,
        isExpanded: false,
      })
      .setSubSubCategory({
        name: "Herbal Tea",
        description: "Natural herbal infusions.",
        product: "Chamomile",
        image: null,
        isExpanded: false,
      })
      .build(),
  ]);
  const [selectedSubSubCategory, setSelectedSubSubCategory] =
    useState<SubSubCategory>();
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [addSubCategory, setAddSubCategory] = useState<boolean>(false);
  const [addSubSubCategory, setAddSubSubCategory] = useState<boolean>(false);
  const [indievidualCategoryDetails, setIndievidualCategoryDetails] = useState({
    heading: "",
    parentId: "",
  });
  const handleSubSubCategorySelect = (subSubCat: SubSubCategory) => {
    setSelectedSubSubCategory(subSubCat);
  };
  const addCategory = () => {
    // Implementation for adding a category would go here

    setShowAddCategoryModal(true);
  };
  const addSubCategoryEvent = (id: string) => {
    setIndievidualCategoryDetails({ heading: "Sub Category", parentId: id });
    setIndievidualCategoryModal(true);
  };
  const addSubSubCategoryEvent = (id: string) => {
    // Implementation for adding a subcategory would go here
    debugger;
    setIndievidualCategoryDetails({ heading: "Sub-subcategory", parentId: id });
    setIndievidualCategoryModal(true);
  };
  const [indievidualCategoryModal, setIndievidualCategoryModal] =
    useState(false);
  return (
    <>
      <Layout viewName="Category" addClass="font-inter">
        <SearchWithButtons
          searchPlaceHolder={"Search Category"}
          onSearch={(query) => {
            console.log(query);
            // Handle search query
          }}
        >
          <button className="flex items-center px-3 py-2 border border-transparent hover:border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 gap-2">
            <ReorderIcon />
            <span> Reorder </span>
          </button>

          <button className="flex items-center px-3 py-2 border border-transparent hover:border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 gap-2">
            <ExportIcon />
            <span> Export </span>
          </button>

          <button className="flex items-center px-3 py-2 border border-transparent hover:border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 gap-2">
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
                <h3 className="text-[14px] text-lg font-medium mb-2 text-headding-color">
                  No Categories Yet
                </h3>
                <p className="text-center mb-4 text-cardTitle">
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
              <div>
                <AddCategoryView
                  categoryObj={categories}
                  onAddSubCategoryClick={addSubCategoryEvent}
                  onAddSubSubCategoryClick={addSubSubCategoryEvent}
                  onSubSubCategorySelect={handleSubSubCategorySelect}
                />
              </div>
            )}
          </Card>
          <Card addClass="w-2/3">
            {selectedSubSubCategory ? (
              <ProductView subSubCat={selectedSubSubCategory} />
            ) : (
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
            )}
          </Card>
        </div>
      </Layout>
      {showAddCategoryModal && (
        <Modal>
          <ModalHeader closeEvent={() => setShowAddCategoryModal(false)}>
            Add New Category
          </ModalHeader>
          <ModalBody>
            <AddCatagoryForm
              ref={formRef}
              heading={"Category"}
              onHierarchyCheckBoxChange={setAddSubCategory}
              onSubmit={(data) => {
                console.log("Category Data:", data);
                // setCategoryData(data);
              }}
            />
            {addSubCategory && (
              <div className="ml-[73px]">
                <AddCatagoryForm
                  ref={subFormRef}
                  heading={"Sub Category"}
                  onHierarchyCheckBoxChange={setAddSubSubCategory}
                  onSubmit={(data) => {
                    console.log("Sub Category Data:", data);
                    // setSubCategoryData(data);
                  }}
                />
                {addSubSubCategory && (
                  <div className="ml-[73px]">
                    <AddCatagoryForm
                      ref={subSubFormRef}
                      heading={"Sub Sub Category"}
                      onSubmit={(data) => {
                        console.log("Sub Sub Category Data:", data);
                        // setSubSubCategoryData(data);
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </ModalBody>
          <ModalFooter
            primaryBtnLable="Save"
            onPrimaryBtnClick={async () => {
              try {
                const categoryObj = new MakeCategoryObj(
                  Math.random().toString(36).substring(2, 15)
                );
                // Step 1: Validate and get Category form data
                const categoryData = await formRef.current?.submit();
                if (!categoryData) throw new Error("Category form invalid");
                categoryObj.setCategory(categoryData);

                // Step 2: If subcategory is checked, get its data
                let subCategoryData = null;
                if (addSubCategory) {
                  subCategoryData = await subFormRef.current?.submit();
                  if (!subCategoryData)
                    throw new Error("Subcategory form invalid");
                  categoryObj.setSubCategory(subCategoryData);
                }

                // Step 3: If sub-subcategory is checked, get its data
                let subSubCategoryData = null;
                if (addSubSubCategory) {
                  subSubCategoryData = await subSubFormRef.current?.submit();
                  if (!subSubCategoryData)
                    throw new Error("Sub-subcategory form invalid");
                  categoryObj.setSubSubCategory(subSubCategoryData);
                }

                // Step 4: Build the final category object using MakeCategoryObj
                const finalCategoryObj = categoryObj.build();
                setCategories((prev) => [...prev, finalCategoryObj]);

                console.log("✅ All Form Data:");
                console.log("Category:", [finalCategoryObj]);

                // Optional: Close the modal
                setShowAddCategoryModal(false);
              } catch (error) {
                console.error("❌ Error in form submission:", error);
              }
            }}
          />
        </Modal>
      )}
      {indievidualCategoryModal && (
        <Modal>
          <ModalHeader closeEvent={() => setIndievidualCategoryModal(false)}>
            {indievidualCategoryDetails.heading}
          </ModalHeader>
          <ModalBody addClass="m-initial p-initial self-stretch rounded border border-none bg-white ">
            <AddCatagoryList
              ref={formRef}
              heading={indievidualCategoryDetails.heading}
              parentId={`${indievidualCategoryDetails.parentId}${
                indievidualCategoryDetails.heading == "Sub Category"
                  ? "_sub_"
                  : "_subSub_"
              }`}
              onSubmit={(data) => {
                console.log("Category Data:", data);
                if (indievidualCategoryDetails.heading == "Sub Category") {
                } else if (
                  indievidualCategoryDetails.heading == "Sub Sub Category"
                ) {
                }
              }}
            />
          </ModalBody>
          <ModalFooter
            primaryBtnLable="Save"
            onPrimaryBtnClick={async () => {
              try {
                const categoryData = await formRef.current?.submit();
                if (!categoryData) throw new Error("Category form invalid");
                console.log("✅ Category Data:", categoryData);
                console.log("categoryData", categories);
                debugger;
                // Here you can handle the data as needed
                if (indievidualCategoryDetails.heading == "Sub Category") {
                  setCategories(
                    updateCategory(
                      indievidualCategoryDetails.parentId,
                      "add",
                      categories,
                      {
                        subCategory: categoryData,
                      }
                    )
                  );
                } else if (
                  indievidualCategoryDetails.heading == "Sub-subcategory"
                ) {
                  setCategories(
                    updateCategory(
                      indievidualCategoryDetails.parentId,
                      "add",
                      categories,
                      {
                        subSubCategory: categoryData,
                      }
                    )
                  );
                }
                console.log("✅ All Form Data:");
                setIndievidualCategoryModal(false);
              } catch (error) {
                console.error("❌ Error in form submission:", error);
              }
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default CategoryComponent;
