import React, { useState } from "react";
import { ModalFooterProps } from "../../types";

const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  addClass,
  onPrimaryBtnClick,
  onSecondaryBtnClick,
  secondaryBtnLable,
  primaryBtnLable,
}) => {
  return (
    <div
      className={`justify-center absolute bottom-0 right-0 left-0 rounded-b-[12px] flex items-center sm:justify-between mt-4 p-4 bg-background-grey border-b border-b-reloadBorder ${addClass}`}
    >
      <div className="text-[16px]">{children}</div>

      <div className="w-full flex items-center gap-2 sm:w-initial">
        {secondaryBtnLable && onSecondaryBtnClick && (
          <button
            onClick={onSecondaryBtnClick}
            className="w-full sm:w-initial px-4 py-2 bg-white border border-reloadBorder rounded text-cardValue hover:bg-btnBorder"
          >
            {secondaryBtnLable}
          </button>
        )}
        {primaryBtnLable && onPrimaryBtnClick && (
          <button
            onClick={onPrimaryBtnClick}
            className="w-full sm:w-initial px-4 py-2 bg-bgButton border border-bgButton rounded text-whiteColor hover:bg-btnBorder"
          >
            {primaryBtnLable}
          </button>
        )}
      </div>
    </div>
  );
};
export default ModalFooter;
