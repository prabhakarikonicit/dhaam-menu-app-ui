import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  ChangeEvent,
} from "react";
import { CategoryFormHandle } from "../types";
import { DownloadIcon } from "../assets/images/svgAssets";
import SelectField from "../sharedComponents/selectField";
import FileUpload from "../sharedComponents/fileUpload";
import CheckboxWithLabel from "../sharedComponents/checkboxWithLabel";
import InputText from "../sharedComponents/InputText";

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
      <InputText
        label={`${heading} Name`}
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleInputChange}
        error={errors.name}
      />

      <InputText
        label="Description"
        name="description"
        placeholder="Write here"
        value={formData.description}
        onChange={handleInputChange}
      />

      <SelectField
        label="Assign Product"
        name="product"
        value={formData.product}
        onChange={handleProductSelect}
        options={options}
        placeholder="Select Product"
      />

      <div className="flex flex-row gap-1 align-center justify-space-between items-center">
        <FileUpload
          label="Choose a file or drag & drop your image here"
          fileName={files[0]?.name}
          onChange={(file) => {
            setFiles([file]);
            setFormData((prev) => ({ ...prev, image: file }));
          }}
          accept="image/*"
        />

        {onHierarchyCheckBoxChange && (
          <CheckboxWithLabel
            checked={checked}
            onChange={(val) => {
              setChecked(val);
              onHierarchyCheckBoxChange(val);
            }}
            label={`Add Sub ${heading}`}
          />
        )}
      </div>
    </div>
  );
});

export default AddCategoryForm;
