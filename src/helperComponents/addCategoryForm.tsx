import React, { forwardRef, useState, useImperativeHandle } from "react";
import { set, useForm } from "react-hook-form";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { CategoryFormHandle } from "../types";
import { DownloadIcon } from "../assets/images/svgAssets";

type FormData = {
  name: string;
  description: string;
  product: string;
  image: File;
};

const AddCatagoryForm = forwardRef<
  CategoryFormHandle,
  {
    heading: string;
    onHierarchyCheckBoxChange?: (value: boolean) => void;
    onSubmit: (data: FormData) => void;
  }
>(({ heading, onHierarchyCheckBoxChange, onSubmit }, ref) => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>();
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  // const [addSubCategory, setAddSubCategory] = useState<boolean>(false);
  // const [addSubSubCategory, setAddSubSubCategory] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [checked, setChecked] = useState<boolean>(false);
  const options = [
    { value: "product1", label: "Product 1" },
    { value: "product2", label: "Product 2" },
    { value: "product3", label: "Product 3" },
  ];

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      setValue("image", acceptedFiles[0]);

      const currentFormData = getValues();
      currentFormData.image = acceptedFiles[0];
      console.log("Auto-handling after drop:", currentFormData);
    },
  });
  const submitEvent = () => {
    const formData = getValues();
    formData.product = selectedProduct;
    console.log("Custom Event Triggered Data:", formData);
    onSubmit(formData);
  };
  useImperativeHandle(ref, () => ({
    submit: async () => {
      const isValid = await trigger(); // Triggers validation
      if (!isValid) {
        console.warn(`${heading} form is invalid`, errors);
        return Promise.reject(`${heading} form is invalid`);
      }

      const values = getValues();
      values.product = selectedProduct;
      onSubmit?.(values);
      return values;
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
          placeholder="Name"
          {...register("name", {
            required: "Category Name is required",
          })}
          className="border p-2 rounded w-full bg-backgroundWhite"
        />
        {errors.categoryName && (
          <p className="text-red-500 text-sm">{errors.categoryName.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-2 text-[12px] font-medium leading-[130%] font-inter text-paragraphBlack">
          Description
        </label>
        <input
          placeholder="Write here"
          {...register("description")}
          className="border p-2 rounded w-full bg-backgroundWhite"
        />
      </div>
      <div>
        <label className="block mb-2 text-[12px] font-medium leading-[130%] font-inter text-paragraphBlack">
          Assign Product
        </label>
        <Select
          options={options}
          onChange={(selected) => setSelectedProduct(selected?.value || "")}
          placeholder="Select Product"
        />
      </div>

      <div className="flex flex-row gap-1 align-center justify-space-between items-center">
        <div
          {...getRootProps()}
          className="border border-color-reloadBorder border-dashed rounded-[10px] cursor-pointer"
        >
          <input {...getInputProps()} />
          <p className="flex gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-reloadBorder text-[14px] leading-[21px] font-normal font-inter h-16 px-[26px] py-2 items-center  bg-backgroundWhite">
            Choose a file or drag & drop your image here <DownloadIcon />
          </p>
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
              onChange={(e) => {
                onHierarchyCheckBoxChange(e.target.checked);
                setChecked(e.target.checked);
              }}
            />{" "}
            <span>Add Sub {heading}</span>
          </label>
        )}
      </div>
    </div>
  );
});
export default AddCatagoryForm;
