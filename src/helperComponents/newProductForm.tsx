import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Info, Upload, GripVertical } from "lucide-react";
import {
  CategoryIcon,
  DeleteIcon,
  DeleteIconGray,
  AddImageIcon,
  PlusIcon,
} from "../assets/images/svgAssets";
import {
  ProductFormRef,
  NewProductFormProps,
  ProductFormData,
  VariantPrice,
  UploadedImage,
  CompleteFormData,
} from "../types";

import SelectField from "../sharedComponents/selectField";
import FileUpload from "../sharedComponents/fileUpload";
import CheckboxWithLabel from "../sharedComponents/checkboxWithLabel";
import InputText from "../sharedComponents/InputText";

// Using forwardRef with TypeScript
const NewProductForm = forwardRef<ProductFormRef, NewProductFormProps>(
  (props, ref) => {
    // Form state
    const [formData, setFormData] = useState<ProductFormData>({
      productName: props.initialData?.productName || "",
      price: props.initialData?.price || "",
      comparePrice: props.initialData?.comparePrice || "",
      chargeTax: props.initialData?.chargeTax || false,
      description: props.initialData?.description || "",
      category: props.initialData?.category || "",
      addOns: props.initialData?.addOns || "",
      preparationTime: props.initialData?.preparationTime || "",
      sku: props.initialData?.sku || "",
      minQuantity: props.initialData?.minQuantity || 1,
      maxQuantity: props.initialData?.maxQuantity || "",
      discount: props.initialData?.discount || "",
      frequentlyBoughtTogether:
        props.initialData?.frequentlyBoughtTogether || "",
      isLive: props.initialData?.isLive || false,
    });

    // Variants state
    const [optionName, setOptionName] = useState<string>("");
    const [variants, setVariants] = useState<string[]>([
      "Small",
      "Medium",
      "Large",
    ]);
    const [variantPrices, setVariantPrices] = useState<
      Record<string, VariantPrice>
    >({
      Small: { price: "", comparePrice: "" },
      Medium: { price: "", comparePrice: "" },
      Large: { price: "", comparePrice: "" },
    });

    // Images state
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([
      { name: "Food.png", size: "2.0 MB" },
      { name: "Food.png", size: "2.0 MB" },
      { name: "Food.png", size: "2.0 MB" },
    ]);

    // Handle input change
    const handleInputChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value, type } = e.target;
      const checked = (e.target as HTMLInputElement).checked;

      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      // Call the onDataChange callback if provided
      if (props.onDataChange) {
        const updatedData = {
          ...formData,
          [name]: type === "checkbox" ? checked : value,
          optionName,
          variants: variants.map((variant) => ({
            name: variant,
            ...variantPrices[variant],
          })),
          images: uploadedImages,
        };
        props.onDataChange(updatedData as CompleteFormData);
      }
    };

    // Handle checkbox change explicitly for the CheckboxWithLabel component
    const handleCheckboxChange = (checked: boolean, name: string) => {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));

      // Call the onDataChange callback if provided
      if (props.onDataChange) {
        const updatedData = {
          ...formData,
          [name]: checked,
          optionName,
          variants: variants.map((variant) => ({
            name: variant,
            ...variantPrices[variant],
          })),
          images: uploadedImages,
        };
        props.onDataChange(updatedData as CompleteFormData);
      }
    };

    // Handle file upload
    const handleFileUpload = (file: File) => {
      const newImage = {
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      };
      setUploadedImages((prev) => [...prev, newImage]);
    };

    // Handle variant price changes
    const handleVariantPriceChange = (
      variant: string,
      field: keyof VariantPrice,
      value: string
    ) => {
      setVariantPrices((prev) => ({
        ...prev,
        [variant]: {
          ...prev[variant],
          [field]: value,
        },
      }));

      // Call the onDataChange callback if provided
      if (props.onDataChange) {
        const updatedVariantPrices = {
          ...variantPrices,
          [variant]: {
            ...variantPrices[variant],
            [field]: value,
          },
        };

        const updatedData = {
          ...formData,
          optionName,
          variants: variants.map((v) => ({
            name: v,
            ...updatedVariantPrices[v],
          })),
          images: uploadedImages,
        };
        props.onDataChange(updatedData as CompleteFormData);
      }
    };

    // Collect all form data
    const collectFormData = (): CompleteFormData => {
      return {
        ...formData,
        optionName,
        variants: variants.map((variant) => ({
          name: variant,
          ...variantPrices[variant],
        })),
        images: uploadedImages,
      };
    };

    // Handle form submission
    const handleSubmit = (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      const formDataJSON = collectFormData();

      console.log("Form Data JSON:", formDataJSON);
      console.log(
        "Form Data JSON (formatted):",
        JSON.stringify(formDataJSON, null, 2)
      );

      // Here you would typically send this to your API
      // fetch('/api/products', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formDataJSON),
      // })

      return formDataJSON;
    };

    // Expose the submit method to parent
    useImperativeHandle(ref, () => ({
      submitForm: handleSubmit,
      getFormData: collectFormData,
    }));

    const removeImage = (index: number) => {
      setUploadedImages(uploadedImages.filter((_, i) => i !== index));
    };

    const addVariantOption = () => {
      // Prompt for new variant name
      const newVariant = prompt("Enter new variant name:");
      if (newVariant && !variants.includes(newVariant)) {
        setVariants([...variants, newVariant]);
        setVariantPrices((prev) => ({
          ...prev,
          [newVariant]: { price: "", comparePrice: "" },
        }));
      }
    };

    const removeVariant = (index: number) => {
      const variantToRemove = variants[index];
      setVariants(variants.filter((_, i) => i !== index));

      // Also remove the pricing data
      const newVariantPrices = { ...variantPrices };
      delete newVariantPrices[variantToRemove];
      setVariantPrices(newVariantPrices);
    };

    // Category options for SelectField
    const categoryOptions = [
      { value: "food", label: "Food" },
      { value: "drinks", label: "Drinks" },
      { value: "desserts", label: "Desserts" },
    ];

    // Add-ons options for SelectField
    const addOnsOptions = [
      { value: "extra1", label: "Extra 1" },
      { value: "extra2", label: "Extra 2" },
    ];

    // Discount options for SelectField
    const discountOptions = [
      { value: "10percent", label: "10% Off" },
      { value: "25percent", label: "25% Off" },
    ];

    // Frequently bought together options for SelectField
    const frequentlyBoughtTogetherOptions = [
      { value: "product1", label: "Product 1" },
      { value: "product2", label: "Product 2" },
    ];

    return (
      <form onSubmit={handleSubmit} className="text-bgButton">
        <div className="space-y-4">
          {/* Product Name */}
          <div className="mb-4">
            <InputText
              label="Product Name"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="Product name"
              required={true}
            />
          </div>

          {/* Price Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <InputText
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Price"
                required={true}
              />
            </div>
            <div>
              <div className="relative">
                <InputText
                  label="Compare-at price"
                  name="comparePrice"
                  value={formData.comparePrice}
                  onChange={handleInputChange}
                  placeholder="Compare price"
                />
                <button
                  type="button"
                  className="absolute right-2 top-8 text-gray-400"
                >
                  <Info size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Charge Tax */}
          <div className="flex items-center mb-4">
            <CheckboxWithLabel
              checked={formData.chargeTax}
              onChange={(checked) => handleCheckboxChange(checked, "chargeTax")}
              label="Charge tax on this product"
            />
            <button type="button" className="text-[12px] underline ml-4">
              Setup Tax
            </button>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-[12px] font-medium mb-1">
              Description
            </label>
            <div className="relative">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Write here"
                className="w-full p-2 border border-gray-300 rounded-md min-h-32"
              ></textarea>
              <button
                type="button"
                className="absolute right-2 bottom-2 text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Category and Add-Ons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <SelectField
                label="Map with Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                options={categoryOptions}
                placeholder="Select category"
              />
            </div>
            <div>
              <SelectField
                label="Select Add-Ons"
                name="addOns"
                value={formData.addOns}
                onChange={handleInputChange}
                options={addOnsOptions}
                placeholder="Select Add-Ons"
              />
            </div>
          </div>

          {/* Preparation Time and SKU */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <InputText
                label="Preparation Time"
                name="preparationTime"
                value={formData.preparationTime}
                onChange={handleInputChange}
                placeholder="Enter time"
              />
            </div>
            <div>
              <InputText
                label="SKU"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                placeholder="SKU"
              />
            </div>
          </div>

          {/* Min and Max Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <InputText
                label="Minimum Quantity to Order"
                name="minQuantity"
                value={formData.minQuantity.toString()}
                onChange={handleInputChange}
                placeholder="1"
                type="number"
              />
            </div>
            <div>
              <InputText
                label="Maximum Quantity to Order"
                name="maxQuantity"
                value={formData.maxQuantity.toString()}
                onChange={handleInputChange}
                placeholder="Enter"
                type="number"
              />
            </div>
          </div>

          {/* Discount and Frequently Bought Together */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <SelectField
                label="Select Discount"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                options={discountOptions}
                placeholder="Select discount"
              />
            </div>
            <div>
              <div className="relative">
                <SelectField
                  label="Frequently Bought Together"
                  name="frequentlyBoughtTogether"
                  value={formData.frequentlyBoughtTogether}
                  onChange={handleInputChange}
                  options={frequentlyBoughtTogetherOptions}
                  placeholder="Select product"
                />
                <button
                  type="button"
                  className="absolute right-8 top-0 text-gray-400"
                >
                  <Info size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <FileUpload
              label="Choose a file or drag & drop your image here"
              onChange={handleFileUpload}
              accept="image/*"
            />

            {/* Uploaded Images */}
            <div className="mt-4 flex justify-between gap-2">
              {uploadedImages.map((image, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between bg-white p-3 rounded-lg shadow-sm border w-full"
                >
                  {/* Left side */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md object-cover">
                      <CategoryIcon />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-medium leading-[130%] text-textHeading">
                        {image.name}
                      </span>
                      <span className="text-[11px] font-medium leading-[130%] text-cardTitle">
                        {image.size}
                      </span>
                    </div>
                  </div>

                  {/* Delete icon */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="text-red-500 text-xl"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Make product live */}
          <div className="flex items-center justify-between py-4 border-t border-b">
            <label className="font-medium">Make this product live</label>
            <div
              className={`w-12 h-6 rounded-full p-1 cursor-pointer ${
                formData.isLive ? "bg-bgButton" : "bg-gray-300"
              }`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, isLive: !prev.isLive }))
              }
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  formData.isLive ? "translate-x-6" : ""
                }`}
              ></div>
            </div>
          </div>

          {/* Variants */}
          <div className="mt-6">
            <h3 className="font-medium mb-4">Variants</h3>

            <div className="mb-4">
              <InputText
                label="Option name"
                name="optionName"
                value={optionName}
                onChange={(e) => setOptionName(e.target.value)}
                placeholder="e.g. Size"
              />
            </div>

            <div className="mb-4">
              <label className="block text-[12px] font-medium mb-1">
                Option values
              </label>
              {variants.map((variant, index) => (
                <div
                  key={index}
                  className="flex items-center mb-2 border border-gray-300 rounded-md p-2"
                >
                  <GripVertical size={20} className="text-gray-400 mr-2" />
                  <span className="flex-grow">{variant}</span>
                  <button
                    type="button"
                    className="text-gray-500"
                    onClick={() => removeVariant(index)}
                  >
                    <DeleteIconGray />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between mb-6">
              <button
                type="button"
                className="flex items-center text-[12px] border bordre-reloadBorder rounded-[6px] px-[8px] py-[6px] text-cardValue"
                onClick={addVariantOption}
              >
                <span className="w-[14px] h-[14px] rounded-full flex items-center justify-center mr-[6px] text-xs">
                  <PlusIcon />
                </span>
                Add another option
              </button>
              <div>
                <button
                  type="button"
                  className="text-maroon px-4 py-1 border border-gray-300 rounded-md mr-2"
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="px-4 py-1 bg-bgButton text-white rounded-md"
                >
                  Done
                </button>
              </div>
            </div>
          </div>

          {/* Variant Pricing */}
          <div className="space-y-4 mt-4">
            {variants.map((variant, index) => (
              <div
                key={index}
                className="flex items-center p-2 border border-reloadBorder rounded-md gap-2"
              >
                <span className="flex-shrink-0">
                  <AddImageIcon />
                </span>
                <span className="flex-grow mx-[10px] w-[123px]">{variant}</span>
                <InputText
                  label=""
                  name={`${variant}-price`}
                  value={variantPrices[variant]?.price || ""}
                  onChange={(e) =>
                    handleVariantPriceChange(variant, "price", e.target.value)
                  }
                  placeholder="Price"
                />
                <InputText
                  label=""
                  name={`${variant}-comparePrice`}
                  value={variantPrices[variant]?.comparePrice || ""}
                  onChange={(e) =>
                    handleVariantPriceChange(
                      variant,
                      "comparePrice",
                      e.target.value
                    )
                  }
                  placeholder="Compare Price"
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    );
  }
);

// Add display name for the component
NewProductForm.displayName = "NewProductForm";

export default NewProductForm;
