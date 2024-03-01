import React from "react";
import { useAppSelector } from "../../store/hooks";
import { Formation } from "../../store/duelSlice";
import { RootState } from "../../store";
import { FormationLine, FormationLineProps } from "./FormationLine";

export function withFormationSelector(
  selector: (state: RootState) => Formation,
  name?: string
) {
  function WrappedComponent(props: Omit<FormationLineProps, "formation">) {
    const value = useAppSelector(selector);
    return <FormationLine formation={value} {...props} />;
  }
  if (name) {
    WrappedComponent.displayName = name;
  }
  return WrappedComponent;
}
