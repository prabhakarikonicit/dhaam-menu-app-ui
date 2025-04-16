import React, { forwardRef, useState, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { CategoryFormHandle } from "../types";

type FormData = {
  categoryName: string;
  description: string;
  product: string;
  image: File;
  isActive: boolean;
};

const AddCatagoryForm = forwardRef<CategoryFormHandle>((props, ref) => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
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
  };
  useImperativeHandle(ref, () => ({
    submit: () => {
      handleSubmit(submitEvent)();
    },
  }));
  return (
    <div className="flex flex-col p-4 gap-4 w-full">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Category Name
        </label>
        <input
          type="text"
          placeholder="Category Name"
          {...register("categoryName", {
            required: "Category Name is required",
          })}
          className="border p-2 rounded w-full"
        />
        {errors.categoryName && (
          <p className="text-red-500 text-sm">{errors.categoryName.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          placeholder="Description"
          {...register("description")}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Assign Product
        </label>
        <Select
          options={options}
          onChange={(selected) => setSelectedProduct(selected?.value || "")}
          placeholder="Assign Product"
        />
      </div>

      <div className="flex flex-row gap-1">
        <div
          {...getRootProps()}
          className="border border-dashed p-4 rounded cursor-pointer"
        >
          <input {...getInputProps()} />
          <p>Drag and drop image here, or click to select</p>
          {files.length > 0 && (
            <p className="text-sm text-green-600">{files[0].name}</p>
          )}
        </div>

        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("isActive")} /> Add Sub Category
        </label>
      </div>
    </div>
  );
});
export default AddCatagoryForm;
