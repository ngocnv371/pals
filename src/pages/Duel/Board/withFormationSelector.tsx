import React from "react";
import { useAppSelector } from "../../../store/hooks";
import { Formation } from "../model";
import { RootState } from "../../../store";

export function withFormationSelector<T extends { formation: Formation }>(
  Component: React.FC<T>,
  selector: (state: RootState) => Formation,
  name?: string
) {
  function WrappedComponent(props: Omit<T, "formation">) {
    const value = useAppSelector(selector);
    return <Component formation={value} {...props} />;
  }
  if (name) {
    WrappedComponent.displayName = name;
  }
  return WrappedComponent;
}
