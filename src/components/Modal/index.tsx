import React, { useState, useEffect, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Modal: React.FC<Props> = ({ children }) => {
  return (
    <div className="absolute left-0 top-0 w-full h-full bg-black/75 z-20">
      {children}
    </div>
  );
};

export default Modal;
