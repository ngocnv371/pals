import { forwardRef } from "react";
import { VirtuosoGridProps } from "react-virtuoso";
import "./SimpleGrid.css";

// Ensure that the component definitions are not declared inline in the component function,
// Otherwise the grid will remount with each render due to new component instances.
export const SimpleGridComponents: VirtuosoGridProps<
  undefined,
  undefined
>["components"] = {
  List: forwardRef(({ style, children, ...props }, ref) => (
    <div ref={ref} {...props} className="simple-grid-list">
      {children}
    </div>
  )),
  Item: ({ children, ...props }) => (
    <div {...props} className="simple-grid-item">
      {children}
    </div>
  ),
};
