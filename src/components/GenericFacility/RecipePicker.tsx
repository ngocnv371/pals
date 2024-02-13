import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import RecipeIcon from "../RecipeIcon";
import { useMemo, useRef, useState } from "react";
import { getRecipesByFacility } from "../../data/recipes";
import ItemIcon from "../ItemIcon";
import RecipeCard from "../RecipeCard";

const RecipePicker: React.FC<{
  facility: string;
  value?: string;
  onChange?: (value: string) => void;
}> = ({ facility, value, onChange }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [selected, setSelected] = useState("");

  const recipes = useMemo(() => getRecipesByFacility(facility), [facility]);

  if (!recipes?.length) {
    return null;
  }

  function handleConfirm() {
    onChange && onChange(selected);
    modal.current?.dismiss();
  }

  return (
    <>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => modal.current?.present()}
      >
        {Boolean(value) ? (
          <RecipeIcon recipeId={value!} />
        ) : (
          <IonAvatar>
            <IonImg />
          </IonAvatar>
        )}
      </div>
      <IonModal ref={modal}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => modal.current?.dismiss()}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle>Select a recipe</IonTitle>
            <IonButtons slot="end">
              <IonButton
                strong={true}
                onClick={handleConfirm}
                disabled={!selected}
              >
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {recipes.map((i) => (
              <RecipeCard
                key={i.id}
                recipeId={i.id}
                color={i.id == selected ? "primary" : ""}
                onClick={() => setSelected(i.id)}
              />
            ))}
          </div>
        </IonContent>
      </IonModal>
    </>
  );
};

export default RecipePicker;
