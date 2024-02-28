import React from "react";
import { useAppSelector } from "../../store/hooks";
import { Formation } from "../../store/duelSlice";
import { RootState } from "../../store";
import { FormationLine } from "./FormationLine";

export function withFormationSelector(
  selector: (state: RootState) => Formation,
  name?: string
) {
  function WrappedComponent() {
    const value = useAppSelector(selector);
    return <FormationLine formation={value} />;
  }
  if (name) {
    WrappedComponent.displayName = name;
  }
  return WrappedComponent;
}
