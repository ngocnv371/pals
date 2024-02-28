import React from "react";

export const Cell: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="cell">{children}</div>;
};
