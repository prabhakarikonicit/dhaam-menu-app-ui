import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";
import { CategoryFormHandle, FormItem } from "../types";

const AddCategoryList = forwardRef<
  CategoryFormHandle,
  {
    parentId: string;
    heading: string;
    onSubmit: (data: FormItem[]) => void;
    initialData?: FormItem[];
  }
>(({ parentId, heading, onSubmit, initialData }, ref) => {
  const [formEntries, setFormEntries] = useState<FormItem[]>([]);

  // Prefill form entries if editing
  useEffect(() => {
    debugger;
    if (initialData && initialData.length > 0) {
      setFormEntries(initialData);
    } else {
      setFormEntries([
        {
          id: `${parentId}_${Math.random().toString(36).substring(2, 15)}`,
          name: "",
          description: "",
          product: "",
          image: null,
          subSubCategory: heading === "Sub Category" ? [] : undefined,
        },
      ]);
    }
  }, [initialData, heading, parentId]);

  const productOptions = [
    { value: "product1", label: "Product 1" },
    { value: "product2", label: "Product 2" },
    { value: "product3", label: "Product 3" },
  ];

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

  const handleFileChange = (index: number, files: FileList | null) => {
    if (files && files.length > 0) {
      handleInputChange(index, "image", files[0]);
    }
  };

  const addFormEntry = () => {
    const newEntry: FormItem = {
      id: `${parentId}_${Math.random().toString(36).substring(2, 15)}`,
      name: "",
      description: "",
      product: "",
      image: null,
      subSubCategory: heading === "Sub Category" ? [] : undefined,
    };
    setFormEntries([...formEntries, newEntry]);
  };

  const removeFormEntry = () => {
    if (formEntries.length > 1) {
      setFormEntries(formEntries.slice(0, -1));
    }
  };

  const validateForms = () => {
    const invalidEntries = formEntries.filter((entry) => !entry.name);
    return invalidEntries.length === 0;
  };

  useImperativeHandle(ref, () => ({
    submit: async () => {
      if (!validateForms()) {
        console.warn(`${heading} forms contain invalid entries`);
        return Promise.reject(`${heading} forms contain invalid entries`);
      }
      onSubmit?.(formEntries);
      return formEntries;
    },
  }));

  return (
    <div className="w-full">
      {formEntries.map((entry, index) => (
        <div
          key={entry.id}
          className="flex flex-col p-4 gap-4 w-full border border-gray-200 rounded-lg mb-2"
        >
          <div>
            <label className="block mb-2 text-xs font-medium leading-snug text-paragraphBlack">
              {heading} Name
            </label>
            <input
              type="text"
              placeholder="Name"
              value={entry.name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
              className="border p-2 rounded w-full bg-backgroundWhite"
            />
            {!entry.name && (
              <p className="text-red-500 text-xs mt-1">
                {heading} Name is required
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-xs font-medium leading-snug text-paragraphBlack">
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
            <label className="block mb-2 text-xs font-medium leading-snug text-paragraphBlack">
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
            <label className="block mb-2 text-xs font-medium leading-snug text-paragraphBlack">
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
      ))}
    </div>
  );
});

export default AddCategoryList;
