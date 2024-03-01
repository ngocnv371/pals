import React from "react";

export const Cell: React.FC<
  React.PropsWithChildren & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ children, ...rest }) => {
  return (
    <div className="cell" {...rest}>
      {children}
    </div>
  );
};
