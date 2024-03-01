import React from "react";
import { useAppSelector } from "../../store/hooks";
import { DuelStage, Formation } from "../../store/duelSlice";
import { RootState } from "../../store";
import { FormationLine, FormationLineProps } from "./FormationLine";
import {
  AttackingFormationLine,
  AttackingFormationLineProps,
} from "./AttackingFormationLine";

export function withAttackingFormationSelector(
  selector: (state: RootState) => Formation,
  name?: string
) {
  function WrappedComponent(
    props: Omit<AttackingFormationLineProps, "formation">
  ) {
    const value = useAppSelector(selector);
    return <AttackingFormationLine formation={value} {...props} />;
  }
  if (name) {
    WrappedComponent.displayName = name;
  }
  return WrappedComponent;
}

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
