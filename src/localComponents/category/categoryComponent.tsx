import React, { useState, useRef, useEffect, use } from "react";
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
  BackArrow,
  CategoryIcon,
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
  UpdateAction,
} from "../../types";
import MakeCategoryObj from "../../helperComponents/MakeCategoryObj";
import AddCategoryView from "../../helperComponents/addCategoryView";
import AddCatagoryList from "../../helperComponents/addCatagoryList";
import { set } from "react-hook-form";
import { updateCategory } from "../../helperComponents/helperFunctions";
import ProductView from "../../helperComponents/ProductView";
import AddCategoryForm from "../../helperComponents/addCategoryForm";
import AddCategoryList from "../../helperComponents/addCatagoryList";
import DataTableForMobile from "../../helperComponents/dataTableMobile";

const CategoryComponent: React.FC = () => {
  const formRef = useRef<CategoryFormHandle>(null);

  const addProductFormRef = useRef<CategoryFormHandle>(null);

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
  const [showMobileTable, setShowMobileTable] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const [indievidualCategoryDetails, setIndievidualCategoryDetails] = useState<{
    heading: string;
    parentId: string;
    preFillData?: Category | SubCategory | SubSubCategory;
    action: UpdateAction;
  }>({
    heading: "",
    parentId: "",
    action: "add",
  });

  const handleSubSubCategorySelect = (subSubCat: SubSubCategory) => {
    setSelectedSubSubCategory(subSubCat);
    setShowMobileTable(true);
  };
  const addCategory = (id: string) => {
    // Implementation for adding a category would go here

    setShowAddCategoryModal(true);
  };
  const editCategory = (id: string, preFillData?: Category) => {
    // Implementation for adding a category would go here
    setIndievidualCategoryDetails({
      heading: "Category",
      parentId: id,
      preFillData: preFillData,
      action: "edit",
    });
    setIndievidualCategoryModal(true);
  };
  const addSubCategoryEvent = (id: string) => {
    setIndievidualCategoryDetails({
      heading: "Sub Category",
      parentId: id,
      action: "add",
    });
    setIndievidualCategoryModal(true);
  };
  const editSubCategoryEvent = (id: string, preFillData?: SubCategory) => {
    setIndievidualCategoryDetails({
      heading: "Sub Category",
      parentId: id,
      preFillData: preFillData,
      action: "edit",
    });
    setIndievidualCategoryModal(true);
  };
  const addSubSubCategoryEvent = (id: string, preFillData?: SubSubCategory) => {
    // Implementation for adding a subcategory would go here

    setIndievidualCategoryDetails({
      heading: "Sub-subcategory",
      parentId: id,
      action: "add",
    });
    setIndievidualCategoryModal(true);
  };
  const editSubSubCategoryEvent = (
    id: string,
    preFillData?: SubSubCategory
  ) => {
    // Implementation for adding a subcategory would go here

    setIndievidualCategoryDetails({
      heading: "Sub-subcategory",
      parentId: id,
      preFillData: preFillData,
      action: "edit",
    });
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
          addClass="hidden sm:flex"
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

        <div className="flex gap-4 relative">
          <Card addClass="w-full lg:w-1/3 md:w-1/2">
            <div className="broder-grey-border pb-2 mb-4 border-b">
              <div className="flex justify-between items-start">
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
                    className="px-3 py-1 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 hidden lg:block"
                  >
                    Add
                  </button>
                  <button className="p-1 text-gray-500 hover:bg-gray-100 rounded">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="flex lg:hidden items-center justify-between mt-4 gap-4">
                <SearchInput
                  onSearch={() => {}}
                  placeHolder={"Search Category"}
                  addClass="grow"
                />
                <button
                  onClick={addCategory}
                  className="px-3 py-1 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Add
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
                  handleAddProductsClick={async (
                    subSubCategory: SubSubCategory
                  ) => {
                    setSelectedSubSubCategory(subSubCategory);
                    const categoryData =
                      await addProductFormRef.current?.submit();
                  }}
                  onEditButtonClick={(
                    obj: Category | SubCategory | SubSubCategory,
                    level: string
                  ) => {
                    console.log(obj, level);
                    if (level === "category") {
                      editCategory(obj.id, obj);
                    } else if (level === "subCategory") {
                      editSubCategoryEvent(obj.id, obj);
                    } else if (level === "subSubCategory") {
                      editSubSubCategoryEvent(obj.id, obj);
                    }
                  }}
                />
              </div>
            )}
          </Card>
          <Card addClass="absolute w-full sm:w-1/2 lg:w-2/3 sm:static ">
            {selectedSubSubCategory ? (
              <ProductView
                ref={addProductFormRef}
                subSubCat={selectedSubSubCategory}
              />
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
            <AddCategoryForm
              ref={formRef}
              heading="Category"
              // defaultCategoryData={existingCategoryData}
              onSubmit={(data) => {
                console.log("Submitted Data:", data);
              }}
            />
          </ModalBody>
          <ModalFooter
            primaryBtnLable="Save"
            onPrimaryBtnClick={async () => {
              try {
                const categoryData = await formRef.current?.submit();
                if (!categoryData) {
                  throw new Error("Form is invalid");
                }

                const typedCategoryData: {
                  category: Category;
                  subCategory?: SubCategory;
                  subSubCategory?: SubCategory;
                } = categoryData;

                const categoryObj = new MakeCategoryObj(
                  Math.random().toString(36).substring(2, 15)
                );

                categoryObj.setCategory(typedCategoryData.category);

                if (typedCategoryData.subCategory) {
                  categoryObj.setSubCategory(typedCategoryData.subCategory);
                }

                if (typedCategoryData.subSubCategory) {
                  categoryObj.setSubSubCategory(
                    typedCategoryData.subSubCategory
                  );
                }

                const finalCategoryObj = categoryObj.build();
                setCategories((prev) => [...prev, finalCategoryObj]);

                console.log("✅ All Form Data:", finalCategoryObj);

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
            <AddCategoryList
              ref={formRef}
              parentId={indievidualCategoryDetails.parentId}
              heading={indievidualCategoryDetails.heading}
              onSubmit={(data) => console.log("Submitted:", data)}
              initialData={[
                {
                  id: indievidualCategoryDetails.preFillData?.id || "",
                  name: indievidualCategoryDetails.preFillData?.name || "",
                  description:
                    indievidualCategoryDetails.preFillData?.description || "",
                  product:
                    indievidualCategoryDetails.preFillData?.product || "",
                  image: indievidualCategoryDetails.preFillData?.image || null,
                  subSubCategory: undefined,
                },
              ]}
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
                if (indievidualCategoryDetails.heading == "Category") {
                  setCategories(
                    updateCategory(
                      indievidualCategoryDetails.parentId,
                      indievidualCategoryDetails.action,
                      categories,
                      {
                        category: categoryData,
                      }
                    )
                  );
                }
                // Here you can handle the data as needed
                else if (indievidualCategoryDetails.heading == "Sub Category") {
                  setCategories(
                    updateCategory(
                      indievidualCategoryDetails.parentId,
                      indievidualCategoryDetails.action,
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
                      indievidualCategoryDetails.action,
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
