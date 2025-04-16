import React, { useState } from "react";
import { ModalHeaderProps } from "../../types";
import { CloseIcon } from "../../assets/images/svgAssets";

const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  addClass,
  closeEvent,
}) => {
  return (
    <div
      className={`rounded-t-[12px] flex items-center justify-between mb-4 p-4 bg-background-grey border-b border-b-reloadBorder ${addClass}`}
    >
      <div className="text-[16px]">{children}</div>
      <button onClick={closeEvent}>
        <CloseIcon />
      </button>
    </div>
  );
};
export default ModalHeader;
