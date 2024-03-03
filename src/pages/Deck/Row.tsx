import React from "react";

export const Row: React.FC<
  React.PropsWithChildren & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ children, className, ...rest }) => {
  return <div className={`row ${className}`}>{children}</div>;
};
