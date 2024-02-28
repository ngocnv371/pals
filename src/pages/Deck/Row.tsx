import React from "react";

export const Row: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="row">{children}</div>;
};
