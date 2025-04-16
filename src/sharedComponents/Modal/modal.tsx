import React, { useState } from "react";
import { ModalProps } from "../../types";

const Modal: React.FC<ModalProps> = ({ children, addClass }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.5)]`}
    >
      <div
        className={`relative rounded-[12px] text-[12px] gap-2 font-inter bg-backgroundWhite min-w-[30vw] min-h-[40vh] w-1/3 ${addClass}`}
      >
        {children}
      </div>
    </div>
  );
};
export default Modal;
