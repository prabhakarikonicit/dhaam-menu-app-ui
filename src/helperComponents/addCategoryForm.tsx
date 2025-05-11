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

type AddCategoryFormProps = {
  heading: string;
  onSubmit: (data: {
    category: FormData;
    subCategory?: FormData;
    subSubCategory?: FormData;
  }) => void;
  defaultCategoryData?: FormData;
  defaultSubCategoryData?: FormData;
  defaultSubSubCategoryData?: FormData;
};

const AddCategoryForm = forwardRef<CategoryFormHandle, AddCategoryFormProps>(
  (
    {
      heading,
      onSubmit,
      defaultCategoryData,
      defaultSubCategoryData,
      defaultSubSubCategoryData,
    },
    ref
  ) => {
    const [categoryForm, setCategoryForm] = useState<FormData>(
      defaultCategoryData || {
        name: "",
        description: "",
        product: "",
        image: null,
      }
    );
    const [subCategoryForm, setSubCategoryForm] = useState<FormData>(
      defaultSubCategoryData || {
        name: "",
        description: "",
        product: "",
        image: null,
      }
    );
    const [subSubCategoryForm, setSubSubCategoryForm] = useState<FormData>(
      defaultSubSubCategoryData || {
        name: "",
        description: "",
        product: "",
        image: null,
      }
    );

    const [showSubCategory, setShowSubCategory] = useState(
      !!defaultSubCategoryData
    );
    const [showSubSubCategory, setShowSubSubCategory] = useState(
      !!defaultSubSubCategoryData
    );

    const options = [
      { value: "product1", label: "Product 1" },
      { value: "product2", label: "Product 2" },
      { value: "product3", label: "Product 3" },
    ];

    const handleInputChange =
      (formSetter: any) =>
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        formSetter((prev: FormData) => ({ ...prev, [name]: value }));
      };

    const handleProductSelect =
      (formSetter: any) => (e: ChangeEvent<HTMLSelectElement>) => {
        formSetter((prev: FormData) => ({ ...prev, product: e.target.value }));
      };

    const handleFileChange = (formSetter: any) => (file: File) => {
      formSetter((prev: FormData) => ({ ...prev, image: file }));
    };

    useImperativeHandle(ref, () => ({
      submit: async () => {
        debugger;
        const returnObj = {
          category: categoryForm,
          subCategory: showSubCategory ? subCategoryForm : undefined,
          subSubCategory: showSubSubCategory ? subSubCategoryForm : undefined,
        };
        onSubmit(returnObj);
        return returnObj;
      },
    }));

    const renderForm = (
      label: string,
      formData: FormData,
      formSetter: React.Dispatch<React.SetStateAction<FormData>>,
      showCheckbox?: boolean,
      checkboxLabel?: string,
      onCheckboxChange?: (val: boolean) => void
    ) => (
      <div className="flex flex-col p-4 gap-4 w-full">
        <InputText
          label={`${label} Name`}
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange(formSetter)}
        />
        <InputText
          label="Description"
          name="description"
          placeholder="Write here"
          value={formData.description}
          onChange={handleInputChange(formSetter)}
        />
        <SelectField
          label="Assign Product"
          name="product"
          value={formData.product}
          onChange={handleProductSelect(formSetter)}
          options={options}
          placeholder="Select Product"
        />
        <div className="flex flex-row gap-1 align-center justify-between items-center">
          <FileUpload
            label="Choose a file or drag & drop your image here"
            fileName={formData.image?.name || ""}
            onChange={handleFileChange(formSetter)}
            accept="image/*"
          />
          {showCheckbox && (
            <CheckboxWithLabel
              checked={
                !!onCheckboxChange && checkboxLabel?.includes("Sub Sub")
                  ? showSubSubCategory
                  : showSubCategory
              }
              onChange={(val) => {
                onCheckboxChange?.(val);
              }}
              label={checkboxLabel!}
            />
          )}
        </div>
      </div>
    );

    return (
      <div>
        {renderForm(
          heading,
          categoryForm,
          setCategoryForm,
          true,
          "Add Sub Category",
          setShowSubCategory
        )}
        {showSubCategory && (
          <div className="ml-[73px]">
            {renderForm(
              "Sub Category",
              subCategoryForm,
              setSubCategoryForm,
              true,
              "Add Sub Sub Category",
              setShowSubSubCategory
            )}
          </div>
        )}
        {showSubSubCategory && (
          <div className="ml-[146px]">
            {renderForm(
              "Sub Sub Category",
              subSubCategoryForm,
              setSubSubCategoryForm
            )}
          </div>
        )}
      </div>
    );
  }
);

export default AddCategoryForm;
