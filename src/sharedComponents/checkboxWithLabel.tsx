import React from "react";

type CheckboxWithLabelProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  checked,
  onChange,
  label,
}) => {
  return (
    <label
      className={`flex p-2 flex-row justify-start items-center gap-2 flex-[1_0_0] rounded-[8px] ${
        checked ? "bg-[#F2ECFC]" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
};

export default CheckboxWithLabel;
