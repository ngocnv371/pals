import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonModal,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { settings } from "ionicons/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import Filter from "../../models/filter";

interface FilterProps extends Filter {}

const FilterButton: React.FC<{
  value: FilterProps;
  onChange: (value: FilterProps) => void;
}> = ({ value, onChange }) => {
  const ref = useRef<HTMLIonModalElement>();
  const [localValue, setLocalValue] = useState(value);

  // clone props
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleApply = useCallback(() => {
    ref.current?.dismiss();
    onChange(localValue);
  }, [localValue]);

  return (
    <>
      <IonButton id="filter-button">
        <IonIcon icon={settings} />
      </IonButton>
      <IonModal
        trigger="filter-button"
        ref={ref as any}
        initialBreakpoint={0.25}
        breakpoints={[0, 0.25, 0.5, 0.75]}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => ref.current?.dismiss()}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle>Filter</IonTitle>
            <IonButtons slot="end">
              <IonButton strong onClick={handleApply}>
                Apply
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonSearchbar
            placeholder="Search"
            value={localValue.query}
            onIonChange={(evt) =>
              setLocalValue((old) => ({
                ...old,
                query: evt.detail.value || "",
              }))
            }
          ></IonSearchbar>
          <IonItem>
            <IonSelect
              label="Sort"
              value={value.sort}
              onIonChange={(evt) =>
                setLocalValue((old) => ({ ...old, sort: evt.detail.value }))
              }
            >
              <IonSelectOption value="name">Name</IonSelectOption>
              <IonSelectOption value="attack">Attack</IonSelectOption>
              <IonSelectOption value="defense">Defense</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonToggle
              checked={value.asc}
              onIonChange={(evt) =>
                setLocalValue((old) => ({ ...old, asc: evt.detail.checked }))
              }
            >
              Ascendingg
            </IonToggle>
          </IonItem>
        </IonContent>
      </IonModal>
    </>
  );
};

export default FilterButton;
