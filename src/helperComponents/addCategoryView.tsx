import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Image,
  MoreVertical,
  Plus,
} from "lucide-react";
import {
  AddCatagoryImg,
  CategoryIcon,
  MinusIcon,
  PlusIcon,
} from "../assets/images/svgAssets";

interface SubSubCategory {
  subSubCategoryName: string;
  description: string;
}

interface SubCategory {
  subCategoryName: string;
  description: string;
  subSubCategories: SubSubCategory[];
}

interface Category {
  categoryName: string;
  description: string;
  subCategories: SubCategory[];
}

export default function AddCategoryView({ categoryObj }: any) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  const toggleExpand = (key: string): void => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  debugger;
  return (
    <div className="max-w-lg mx-auto p-4 rounded-[12px] border border-[#DBDBDB] bg-[#F7F7F7]">
      {categoryObj?.map((category: Category) => {
        const categoryKey = `category-${category.categoryName}`;

        return (
          <div key={category.categoryName} className="mb-2">
            {/* Category */}
            <div className="flex items-center p-3 rounded-lg">
              <button
                className={`mr-3 rounded-full ${
                  category.subCategories?.length > 0
                    ? "cursor-pointer"
                    : "cursor-default opacity-50"
                }`}
                onClick={() => {
                  if (category.subCategories?.length > 0) {
                    toggleExpand(categoryKey);
                  }
                }}
              >
                {expandedItems[categoryKey] ? <MinusIcon /> : <PlusIcon />}
              </button>

              <div className="rounded-lg mr-3">
                <CategoryIcon />
              </div>

              <div className="flex-grow w-0">
                <h2 className="truncate text-[#1D3796] font-inter text-[13px] font-medium leading-[150%]">
                  {category.categoryName}
                </h2>
                <p className="truncate text-[#949494] font-inter text-[12px] font-normal leading-[130%]">
                  {category.description}
                </p>
              </div>

              <button>
                <MoreVertical size={20} />
              </button>
            </div>

            {/* SubCategories */}
            {expandedItems[categoryKey] && (
              <div className="pl-10 border-l-2 border-gray-200 ml-6">
                {category.subCategories?.map((subCategory: SubCategory) => {
                  const subKey = `subcategory-${subCategory.subCategoryName}`;

                  return (
                    <div key={subCategory.subCategoryName} className="mb-2">
                      <div className="flex items-center p-3 rounded-lg">
                        <button
                          className={`mr-3 rounded-full ${
                            subCategory.subSubCategories?.length > 0
                              ? "cursor-pointer"
                              : "cursor-default opacity-50"
                          }`}
                          onClick={() => {
                            if (subCategory.subSubCategories?.length > 0) {
                              toggleExpand(subKey);
                            }
                          }}
                        >
                          {expandedItems[subKey] ? <MinusIcon /> : <PlusIcon />}
                        </button>
                        <div className="rounded-lg mr-3">
                          <CategoryIcon />
                        </div>
                        <div className="flex-grow w-0">
                          <h2 className="truncate text-[#1D3796] font-inter text-[13px] font-medium leading-[150%]">
                            {subCategory.subCategoryName}
                          </h2>
                          <p className="truncate text-[#949494] font-inter text-[12px] font-normal leading-[130%]">
                            {subCategory.description}
                          </p>
                        </div>
                        <button>
                          <MoreVertical size={20} />
                        </button>
                      </div>

                      {/* SubSubCategory */}
                      {expandedItems[subKey] && (
                        <div className="pl-10 border-l-2 border-gray-200 ml-6">
                          {subCategory.subSubCategories?.map(
                            (item: SubSubCategory) => (
                              <div
                                key={item.subSubCategoryName}
                                className="flex items-center p-3 rounded-lg"
                              >
                                <div className="rounded-lg mr-3">
                                  <CategoryIcon />
                                </div>
                                <div className="flex-grow w-0">
                                  <h2 className="truncate text-[#1D3796] font-inter text-[13px] font-medium leading-[150%]">
                                    {item.subSubCategoryName}
                                  </h2>
                                  <p className="truncate text-[#949494] font-inter text-[12px] font-normal leading-[130%]">
                                    {item.description}
                                  </p>
                                </div>
                                <button>
                                  <MoreVertical size={20} />
                                </button>
                              </div>
                            )
                          )}

                          {/* Add SubSubCategory Button */}
                          <div className="flex items-center justify-start pl-4 text-gray-700 cursor-pointer">
                            <Plus size={16} className="mr-2" />
                            <span className="text-[12px]">
                              Add sub-subcategory
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Add SubCategory Button */}
                <div className="flex items-center justify-start pl-4 text-gray-700 cursor-pointer">
                  <Plus size={16} className="mr-2" />
                  <span className="text-[12px]">Add subcategory</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
