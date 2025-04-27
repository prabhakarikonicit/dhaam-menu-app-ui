import { ReactNode } from "react";
export interface SearchWithButtonsProps {
  children?: ReactNode;
  onSearch: SearchInputProps["onSearch"];
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
  closeEvent: () => void;
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
};
