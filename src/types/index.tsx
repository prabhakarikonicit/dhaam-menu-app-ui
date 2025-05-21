import { ReactNode } from "react";
export interface SearchWithButtonsProps {
  searchPlaceHolder?: string;
  children?: ReactNode;
  onSearch: SearchInputProps["onSearch"];
  addClass?: string;
}
export interface CardProps {
  children: ReactNode;
  addClass?: string;
}
export interface ModalProps {
  children: ReactNode;
  addClass?: string;
}
export interface ModalHeaderProps {
  children: ReactNode;
  addClass?: string;
  closeEvent?: () => void;
}
export interface ModalBodyProps {
  children: ReactNode;
  addClass?: string;
}
export interface ModalFooterProps {
  children?: ReactNode;
  addClass?: string;
  onPrimaryBtnClick?: () => void;
  onSecondaryBtnClick?: () => void;
  primaryBtnLable?: string;
  secondaryBtnLable?: string;
}
export interface LayoutProps {
  children: ReactNode;
  viewName?: string;
  addClass?: string;
}

export interface SearchInputProps {
  addClass?: string;
  placeHolder?: string;
  onSearch: (query: string) => void;
}
export interface FormData {
  categoryName: string;
  description: string;
  product: string;
  image: File | null;
  isActive: boolean;
}

export interface CategoryFormHandle {
  submit: () => void;
}

export interface CategoryFormItem {
  name: string;
  description: string;
  product: string;
  image: File | null;
}

// Type Definitions
export type Category = {
  id: string;
  name: string;
  description: string;
  product: string;
  image: File | null;
  isExpanded: boolean;
  subCategory?: SubCategory[];
};

export type SubCategory = {
  id: string;
  name: string;
  description: string;
  product: string;
  image: File | null;
  isExpanded: boolean;
  subSubCategories?: SubSubCategory[];
};

export type SubSubCategory = {
  id: string;
  name: string;
  description: string;
  product: string;
  image: File | null;
  isExpanded: boolean;
  products?: Products[];
};

export interface ProductViewProps {
  subSubCat: SubSubCategory;
  onDataChange?: (data: CompleteFormData) => void;
}

export type Products = {
  name: string;
};

// Type for a single uploaded image
export interface UploadedImage {
  name: string;
  size: string;
}

// Type for variant price information
export interface VariantPrice {
  price: string;
  comparePrice: string;
}

// Type for form data
export interface ProductFormData {
  productName: string;
  price: string;
  comparePrice: string;
  chargeTax: boolean;
  description: string;
  category: string;
  addOns: string;
  preparationTime: string;
  sku: string;
  minQuantity: number;
  maxQuantity: string;
  discount: string;
  frequentlyBoughtTogether: string;
  isLive: boolean;
}

// Type for the complete form state including variants
export interface CompleteFormData extends ProductFormData {
  optionName: string;
  variants: Array<{
    name: string;
    price: string;
    comparePrice: string;
  }>;
  images: UploadedImage[];
}

// Type for the form's ref methods
export interface ProductFormRef {
  submitForm: () => CompleteFormData;
  getFormData: () => CompleteFormData;
}
export interface AddonFormRef {
  submitForm: () => CompleteFormData;
}
// Props for the NewProductForm component
export interface NewProductFormProps {
  // Add any props you might need here
  initialData?: Partial<ProductFormData>;
  onDataChange?: (data: CompleteFormData) => void;
}

export interface DropdownMenuProps {
  addLabel?: string;
  onAdd?: () => void;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onDisable?: () => void;
}
export type UpdateAction = "add" | "delete" | "edit";

export type AddPayload = {
  category?: Category[];
  subCategory?: SubCategory[];
  subSubCategory?: SubSubCategory[];
};

export type EditPayload = Partial<Omit<Category, "subCategories">> &
  Partial<Omit<SubCategory, "subSubCategories">> &
  Partial<SubSubCategory>;

export type FormItem = {
  id: string;
  name: string;
  description: string;
  product: string;
  image: any | File | null;
  subSubCategory: [] | undefined;
};

export type AddOnFormHandle = {
  submit: () => void;
};
export type AddOnOption = {
  name: string;
  price: string;
  isDefault: boolean;
};
