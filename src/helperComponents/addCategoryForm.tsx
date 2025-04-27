import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  ChangeEvent,
} from "react";
import { CategoryFormHandle } from "../types";
import { DownloadIcon } from "../assets/images/svgAssets";

type FormData = {
  name: string;
  description: string;
  product: string;
  image: File | null;
};

const AddCategoryForm = forwardRef<
  CategoryFormHandle,
  {
    heading: string;
    onHierarchyCheckBoxChange?: (value: boolean) => void;
    onSubmit: (data: FormData) => void;
  }
>(({ heading, onHierarchyCheckBoxChange, onSubmit }, ref) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    product: "",
    image: null,
  });
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [files, setFiles] = useState<File[]>([]);
  const [checked, setChecked] = useState<boolean>(false);

  const options = [
    { value: "product1", label: "Product 1" },
    { value: "product2", label: "Product 2" },
    { value: "product3", label: "Product 3" },
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setFiles([file]);
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleProductSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, product: e.target.value }));
  };

  const validate = (): boolean => {
    const newErrors: { name?: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = "Category Name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(ref, () => ({
    submit: async () => {
      const isValid = validate();
      if (!isValid) {
        console.warn(`${heading} form is invalid`, errors);
        return Promise.reject(`${heading} form is invalid`);
      }
      onSubmit?.(formData);
      return formData;
    },
  }));

  return (
    <div className="flex flex-col p-4 gap-4 w-full">
      <div>
        <label className="block mb-2 text-[12px] font-medium leading-[130%] font-inter text-paragraphBlack">
          {heading} Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className="border p-2 rounded w-full bg-backgroundWhite"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <label className="block mb-2 text-[12px] font-medium leading-[130%] font-inter text-paragraphBlack">
          Description
        </label>
        <input
          type="text"
          name="description"
          placeholder="Write here"
          value={formData.description}
          onChange={handleInputChange}
          className="border p-2 rounded w-full bg-backgroundWhite"
        />
      </div>

      <div>
        <label className="block mb-2 text-[12px] font-medium leading-[130%] font-inter text-paragraphBlack">
          Assign Product
        </label>
        <select
          value={formData.product}
          onChange={handleProductSelect}
          className="border p-2 rounded w-full bg-backgroundWhite"
        >
          <option value="">Select Product</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-row gap-1 align-center justify-space-between items-center">
        <div className="border border-color-reloadBorder border-dashed rounded-[10px] cursor-pointer">
          <label className="flex gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-reloadBorder text-[14px] leading-[21px] font-normal font-inter h-16 px-[26px] py-2 items-center bg-backgroundWhite">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            Choose a file or drag & drop your image here <DownloadIcon />
          </label>
          {files.length > 0 && (
            <p className="text-sm text-green-600">{files[0].name}</p>
          )}
        </div>

        {onHierarchyCheckBoxChange && (
          <label
            className={`flex p-2 flex-row justify-start items-center gap-2 flex-[1_0_0] rounded-[8px] ${
              checked ? "bg-[#F2ECFC]" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
                onHierarchyCheckBoxChange(e.target.checked);
              }}
            />{" "}
            <span>Add Sub {heading}</span>
          </label>
        )}
      </div>
    </div>
  );
});

export default AddCategoryForm;
