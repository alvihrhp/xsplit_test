import React, { useState, useEffect, ReactNode } from "react";

interface Props {
  style: string;
  children: ReactNode;
}

const Card: React.FC<Props> = ({ style, children }) => (
  <div className={style}>{children}</div>
);

export default Card;
