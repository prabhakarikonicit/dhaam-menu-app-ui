import React, { useState, useEffect } from "react";

interface ToggleSwitchProps {
  id?: string;
  checked?: boolean; // controlled value
  onChange?: (checked: boolean) => void; // controlled handler
  onToggle?: (checked: boolean) => void; // optional side effect
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  id,
  checked,
  onChange,
  onToggle,
}) => {
  const isControlled = checked !== undefined;

  const [internalChecked, setInternalChecked] = useState<boolean>(false);

  // Sync internal state with controlled prop when needed
  useEffect(() => {
    if (isControlled) {
      setInternalChecked(checked);
    }
  }, [checked]);

  const toggle = () => {
    const newValue = !internalChecked;

    if (!isControlled) {
      setInternalChecked(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }

    if (onToggle) {
      onToggle(newValue);
    }
  };

  const isOn = isControlled ? checked : internalChecked;

  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={isOn}
      onClick={toggle}
      className={`w-14 h-7 rounded-full relative cursor-pointer transition-all duration-300 ${
        isOn ? "bg-bgButton" : "bg-gray-200"
      }`}
    >
      <span
        className={`w-5 h-5 rounded-full bg-white absolute top-1 transition-all ${
          isOn ? "right-[0.2rem]" : "right-[2rem]"
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;
