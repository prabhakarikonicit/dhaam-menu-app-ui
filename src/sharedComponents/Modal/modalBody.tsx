import React, { useState } from "react";
import { ModalBodyProps } from "../../types";

const ModalBody: React.FC<ModalBodyProps> = ({ children, addClass }) => {
  return (
    <div
      className={`flex flex-col items-start gap-4 m-4 p-4 self-stretch rounded border border-subMenus bg-store-card mb-20 max-h-[60vh] overflow-auto ${addClass}`}
    >
      {children}
    </div>
  );
};
export default ModalBody;
