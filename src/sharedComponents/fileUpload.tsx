// components/FileUpload.tsx
import React from "react";
import { DownloadIcon } from "../assets/images/svgAssets"; // adjust this import as needed

interface FileUploadProps {
  label: string;
  onChange: (file: File) => void;
  fileName?: string;
  accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  onChange,
  fileName,
  accept = "image/*",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange(file);
  };

  return (
    <div className="border border-color-reloadBorder border-dashed rounded-[10px] cursor-pointer">
      <label className="flex gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-reloadBorder text-[14px] leading-[21px] font-normal font-inter h-16 px-[26px] py-2 items-center bg-backgroundWhite">
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
        {label} <DownloadIcon />
      </label>
      {fileName && <p className="text-sm text-green-600">{fileName}</p>}
    </div>
  );
};

export default FileUpload;
