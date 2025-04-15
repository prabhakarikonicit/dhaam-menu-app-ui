import React, { useState } from "react";
import { CardProps } from "../types";

const Card: React.FC<CardProps> = ({ children, addClass }) => {
  return (
    <div
      className={`rounded-[12px] text-[12px] p-4 gap-2 font-inter bg-backgroundWhite ${addClass}`}
    >
      {children}
    </div>
  );
};
export default Card;
