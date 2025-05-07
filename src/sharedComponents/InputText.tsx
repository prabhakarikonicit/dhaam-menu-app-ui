import React from "react";

interface InputTextProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}

const InputText: React.FC<InputTextProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  error = "",
  type = "text",
  required = false,
  disabled = false,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-[12px] font-medium leading-[130%] font-inter text-paragraphBlack"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="border p-2 rounded w-full bg-backgroundWhite"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputText;
