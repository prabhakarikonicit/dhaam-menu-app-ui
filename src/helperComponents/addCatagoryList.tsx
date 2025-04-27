import React, { forwardRef, useState, useImperativeHandle } from "react";
import { CategoryFormHandle } from "../types";
import { defaultSubSubCategory } from "./MakeCategoryObj";

// Define types
type FormItem = {
  id: string;
  name: string;
  description: string;
  product: string;
  image: File | null;
  subSubCategory: [] | undefined;
};

const AddCategoryList = forwardRef<
  CategoryFormHandle,
  {
    parentId: string;
    heading: string;
    onSubmit: (data: FormItem[]) => void;
  }
>(({ parentId, heading, onSubmit }, ref) => {
  // State for managing multiple form entries
  const [formEntries, setFormEntries] = useState<FormItem[]>([
    {
      id: `${parentId}_${Math.random().toString(36).substring(2, 15)}`,
      name: "",
      description: "",
      product: "",
      image: null,
      subSubCategory: heading === "Sub Category" ? [] : undefined,
    },
  ]);

  // Available product options
  const productOptions = [
    { value: "product1", label: "Product 1" },
    { value: "product2", label: "Product 2" },
    { value: "product3", label: "Product 3" },
  ];

  // Handle input changes for a specific form entry and field
  const handleInputChange = (
    index: number,
    field: keyof FormItem,
    value: any
  ) => {
    const updatedEntries = [...formEntries];
    updatedEntries[index] = {
      ...updatedEntries[index],
      [field]: value,
    };
    setFormEntries(updatedEntries);
  };

  // Handle file selection
  const handleFileChange = (index: number, files: FileList | null) => {
    if (files && files.length > 0) {
      handleInputChange(index, "image", files[0]);
    }
  };

  // Add a new form entry
  const addFormEntry = () => {
    let newEntry: FormItem = {
      id: `${parentId}_${Math.random().toString(36).substring(2, 15)}`,
      name: "",
      description: "",
      product: "",
      image: null,
      subSubCategory: heading === "Sub Category" ? ([] as []) : undefined,
    };

    setFormEntries([...formEntries, newEntry]);
  };

  // Remove the last form entry
  const removeFormEntry = () => {
    if (formEntries.length > 1) {
      setFormEntries(formEntries.slice(0, -1));
    }
  };

  // Validate form entries
  const validateForms = () => {
    // Basic validation - check if required fields are filled
    const invalidEntries = formEntries.filter((entry) => !entry.name);
    return invalidEntries.length === 0;
  };

  // Implement imperative handle to return all form data
  useImperativeHandle(ref, () => ({
    submit: async () => {
      if (!validateForms()) {
        console.warn(`${heading} forms contain invalid entries`);
        return Promise.reject(`${heading} forms contain invalid entries`);
      }

      // Call onSubmit with all form data
      onSubmit?.(formEntries);
      return formEntries;
    },
  }));

  return (
    <div className="w-full">
      {formEntries.map((entry, index) => (
        <>
          <div
            key={index}
            className="flex flex-col p-4 gap-4 w-full border border-gray-200 rounded-lg mb-2"
          >
            <div>
              <label className="block mb-2 text-xs font-medium leading-snug font-inter text-paragraphBlack">
                {heading} Name
              </label>
              <input
                type="text"
                placeholder="Name"
                value={entry.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
                className="border p-2 rounded w-full bg-backgroundWhite"
              />
              {!entry.name && (
                <p className="text-red-500 text-xs mt-1">
                  {heading} Name is required
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-xs font-medium leading-snug font-inter text-paragraphBlack">
                Description
              </label>
              <input
                placeholder="Write here"
                value={entry.description}
                onChange={(e) =>
                  handleInputChange(index, "description", e.target.value)
                }
                className="border p-2 rounded w-full bg-backgroundWhite"
              />
            </div>

            <div>
              <label className="block mb-2 text-xs font-medium leading-snug font-inter text-paragraphBlack">
                Assign Product
              </label>
              <select
                value={entry.product}
                onChange={(e) =>
                  handleInputChange(index, "product", e.target.value)
                }
                className="border p-2 rounded w-full bg-backgroundWhite"
              >
                <option value="">Select Product</option>
                {productOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-xs font-medium leading-snug font-inter text-paragraphBlack">
                Upload Image
              </label>
              <div className="border border-dashed rounded-lg p-2 cursor-pointer bg-backgroundWhite">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(index, e.target.files)}
                  className="hidden"
                  id={`file-upload-${index}`}
                />
                <label
                  htmlFor={`file-upload-${index}`}
                  className="flex flex-col items-center justify-center h-16 cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-reloadBorder text-sm">
                    Choose a file or drag & drop your image here
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 12V4M8 4L5 7M8 4L11 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 13H13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  {entry.image && (
                    <p className="text-sm text-green-600 mt-1">
                      {entry.image.name}
                    </p>
                  )}
                </label>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      addFormEntry();
                    } else {
                      removeFormEntry();
                    }
                  }}
                  className="rounded"
                />
                <span className="text-sm">Add More</span>
              </label>
            </div>
          </div>
        </>
      ))}
    </div>
  );
});

export default AddCategoryList;
