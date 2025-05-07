import React, { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

interface DropdownMenuProps {
  addLabel?: string;
  onAdd?: () => void;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onDisable?: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  addLabel = "Add sub-subcategory",
  onAdd,
  onEdit,
  onDuplicate,
  onDelete,
  onDisable,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (callback?: () => void) => {
    setOpen(false);
    callback?.();
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
      >
        <MoreVertical size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-max text-sm text-gray-700 font-medium z-10 inline-flex p-2 flex-col items-start gap-1 rounded-[6px] border border-grey-border bg-white shadow-[2px_2px_12px_0px_rgba(12,12,13,0.14)]">
          <ul className="divide-y divide-gray-200">
            <li
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex h-[28px] p-2  items-center gap-1 overflow-hidden text-ellipsis text-menuSubHeadingColor font-inter text-[12px] font-medium leading-[130%]"
              onClick={() => handleAction(onAdd)}
            >
              {addLabel}
            </li>
            <li
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex h-[28px] p-2  items-center gap-1 overflow-hidden text-ellipsis text-menuSubHeadingColor font-inter text-[12px] font-medium leading-[130%]"
              onClick={() => handleAction(onEdit)}
            >
              Edit
            </li>
            <li
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex h-[28px] p-2  items-center gap-1 overflow-hidden text-ellipsis text-menuSubHeadingColor font-inter text-[12px] font-medium leading-[130%]"
              onClick={() => handleAction(onDuplicate)}
            >
              Duplicate
            </li>
            <li
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex h-[28px] p-2  items-center gap-1 overflow-hidden text-ellipsis text-menuSubHeadingColor font-inter text-[12px] font-medium leading-[130%]"
              onClick={() => handleAction(onDelete)}
            >
              Delete
            </li>
            <li
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex h-[28px] p-2  items-center gap-1 overflow-hidden text-ellipsis text-menuSubHeadingColor font-inter text-[12px] font-medium leading-[130%]"
              onClick={() => handleAction(onDisable)}
            >
              Disable
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
