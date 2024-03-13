import { forwardRef } from "react";
import { GridComponents } from "react-virtuoso";

export const gridComponents: GridComponents<any> = {
  List: forwardRef(({ style, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        ...style,
      }}
    >
      {children}
    </div>
  )),
  Item: ({ children, ...props }: any) => (
    <div
      {...props}
      style={{
        display: "flex",
        flex: "none",
        padding: "0.3em",
        alignContent: "stretch",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  ),
};

export const ItemWrapper: React.FC<React.PropsWithChildren> = ({
  children,
  ...props
}) => (
  <div
    {...props}
    style={{
      display: "flex",
      flex: 1,
      textAlign: "center",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </div>
);
