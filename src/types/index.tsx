import {ReactNode} from 'react';
export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (e: React.MouseEvent) => void;
  disabled?: boolean;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export interface PaymentGateway {
  id: string;
  name: string;
  apiKey: string;
  secretKey: string;
  isActive: boolean;
  environment: "sandbox" | "production";
  supportedCurrencies: string[];
  webhookUrl?: string;
  isDefault?: boolean;
}

export interface PreferenceOption {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

// Policy interface
export interface Policy {
  id: string;
  name: string;
  description: string;
  createdOn: string;
  isActive: boolean;
  url?: string;
}

// Props for the PoliciesAndPages component
export interface PoliciesAndPagesProps {
  onSave?: () => void;
  onCancel?: () => void;
  initialPolicies?: Policy[];
}

export interface PaymentTransaction {
  id: string;
  transactionId: string;
  transactionDate: string;
  time: string;
  status: string;
  store: string;
  amount: number;
}

export interface TimeSelectorProps {
    value: string;
    onChange: (value: string) => void;
  }
  
export interface DayScheduleProps {
  day: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

// Define the Location interface
export interface Location {
  id: string;
  name: string;
  description: string;
  type: "Geofence" | "Fixed" | "Percentage";
  createdOn: string;
  isActive: boolean;
}

// Define the City interface
export interface City {
  id: string;
  name: string;
  description: string;
  chargeType: "Fixed" | "Percentage";
  isActive: boolean;
}

// Props for the LocationManagement component
export interface LocationManagementProps {
  onSave?: () => void;
  onCancel?: () => void;
  initialCities?: City[];
  initialGeofences?: Location[];
}

export interface LanguageOption {
  value: string;
  label: string;
  checked?: boolean;
}

export interface CustomerRightsProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

export interface StaffMember {
  id: string;
  name: string;
  createdOn: string;
  time: string;
  status: "Paid" | "Pending" | "Failed";
  description: string;
}

export interface AddStaffProps {
  onClose: () => void;
  onSave: (data: any) => void;
}
export interface Permission {
  id: string;
  name: string;
  enabled: boolean;
  actions: {
    id: string;
    name: string;
    enabled: boolean;
  }[];
  isCollapsible?: boolean;
}

export interface PermissionSectionProps {
  section: Permission;
  onToggle: (sectionId: string, actionId?: string) => void;
  isExpanded: boolean;
  onExpand: () => void;
}

export interface CheckoutProps {
  onClose: () => void;
  onSave: (data: any) => void;
}
// Props for the TaxManagement component
export interface TaxManagementProps {
  onSave?: () => void;
  onCancel?: () => void;
}

// Define the Tax interface
export interface Taxes {
  id: string;
  name: string;
  value: number;
  type: "Fixed" | "Percentage";
  applicableOn: "Marketplace" | "Product" | "Delivery" | "Store";
  enabled: boolean;
  applicableType?: string;
  serviceFeeAppliedOn?: string;
  selectMerchant?: string;
}

export interface Tax {
  id: string;
  name: string;
  value: number;
  type: "Fixed" | "Percentage";
  applicableOn: "Marketplace" | "Product" | "Delivery" | "Store";
  enabled: boolean;
}

export interface BillingItem {
  id: string;
  billNumber: string;
  billType: string;
  status: "Paid" | "Pending" | "Failed";
  amount: number;
  date: string;
  time: string;
}

export interface FileType extends Row {
  name: string;
  format: string;
  altText: string;
  dateAdded: string;
  size: string;
  thumbnail?: string;
  active?: boolean;
  file?: File; // Add actual file reference for potential preview
}

export interface Column {
  field: string;
  headerName: string;
  width?: string;
  renderCell?: (value: any, row: any) => ReactNode;
}

export interface MenuItem {
  icon: React.ReactNode;
  label: string;
  id: string;
}

export interface Row {
  id: string;
  [key: string]: any;
}

export interface DataGridProps {
  columns: Column[];
  rows: Row[];
  pageSize?: number;
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectRow: (id: string) => void;
  selectedRows: string[];
  searchPlaceholder?: string;
  hideToolbar?: boolean;
  showActionColumn?: boolean;
  onEdit?: (row: Row) => void;
  onDelete?: (row: Row) => void;
  onToggle?: (id: string, value: boolean) => void; // Added this line
}

export type FieldType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "select"
  | "textarea"
  | "checkbox"
  | "date"
  | "time"
  | "radio"
  | "file"
  | "image-upload"
  | "custom";

 export interface FieldDefinition {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  helperText?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  rows?: number; // For textarea
  cols?: number; // For textarea
  customRender?: (props: {
    value: any;
    onChange: (value: any) => void;
    disabled?: boolean;
    error?: string;
  }) => ReactNode;
  fullWidth?: boolean; // Add this to allow fields to take full width
  containerClassName?: string; // Custom class for the field container
  inputClassName?: string; // Custom class for the input element
  layout?: "horizontal" | "vertical"; // Field layout - default is vertical
}

export interface BaseItem {
    id?: string;
    isActive?: boolean;
    [key: string]: any;
  }

  export interface CustomModalProps<T extends BaseItem> {
    isOpen: boolean;
    onClose: () => void;
    mode: "add" | "edit" | "view" | "delete" | "confirm";
    fields?: FieldDefinition[];
    item?: T;
    onSave: (item: T) => void;
    title: string;
    subtitle?: string;
    size?: "sm" | "md" | "lg" | "xl" | "full";
    showFooter?: boolean;
    customFooter?: ReactNode;
    confirmText?: string;
    cancelText?: string;
    children?: ReactNode;
    showToggle?: boolean;
    toggleLabel?: string;
    className?: string;
    isLoading?: boolean;
    formLayout?: "standard" | "grid" | "custom"; // Add form layout option
    gridColumns?: number; // Number of columns for grid layout
    additionalButton?: {
      label: string;
      onClick: () => void;
      className?: string;
      disabled?: boolean;
    };
  }

  export interface CardProps {
    title: string;
    description?: string;
    placeholder?: string;
    toggleChecked?: boolean;
    onToggleChange?: (e: React.MouseEvent) => void;
    actionButton?: React.ReactNode; // Added the actionButton property
    children?: React.ReactNode;
    variant?: "default" | "compact";
  }
  export interface DeliveryModeProps {
    onSave?: () => void;
  }

  export interface StoreTimingAvailabilityProps {
    selectedDayOption: string;
    setSelectedDayOption: (option: string) => void;
    selectedTimeOption: string;
    setSelectedTimeOption: (option: string) => void;
  }
  
  // Define option type
  export interface Option {
    id: string;
    label: string;
  }