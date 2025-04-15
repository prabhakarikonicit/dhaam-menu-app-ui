import { ReactNode } from "react";
export interface SearchWithButtonsProps {
  children?: ReactNode;
  onSearch: SearchInputProps["onSearch"];
}
export interface CardProps {
  children: ReactNode;
  addClass?: string;
}
export interface LayoutCProps {
  children: ReactNode;
  viewName?: string;
  addClass?: string;
}

export interface SearchInputProps {
  onSearch: (query: string) => void;
}
