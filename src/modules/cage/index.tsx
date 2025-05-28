import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import OpenEggButton from "./OpenEggButton";
import { useCage } from "./useCage";
import { VirtuosoGrid, VirtuosoGridProps } from "react-virtuoso";
import { forwardRef } from "react";
import BeastCard from "./BeastCard";
import "./styles.css";

// Ensure that the component definitions are not declared inline in the component function,
// Otherwise the grid will remount with each render due to new component instances.
const gridComponents: VirtuosoGridProps<undefined, undefined>["components"] = {
  List: forwardRef(({ style, children, ...props }, ref) => (
    <div ref={ref} {...props} className="grid-list">
      {children}
    </div>
  )),
  Item: ({ children, ...props }) => (
    <div {...props} className="grid-item">
      {children}
    </div>
  ),
};

const ItemWrapper: React.FC<React.PropsWithChildren> = ({
  children,
  ...props
}) => (
  <div {...props} className="grid-item-wrapper">
    {children}
  </div>
);

export default function CagePage() {
  const { beasts } = useCage();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <OpenEggButton />
          </IonButtons>
          <IonTitle>Cage</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <VirtuosoGrid
          style={{ height: "100%" }}
          totalCount={beasts.length}
          components={gridComponents}
          itemContent={(index) => (
            <ItemWrapper>
              <BeastCard id={beasts[index].id} />
            </ItemWrapper>
          )}
        />
      </IonContent>
    </IonPage>
  );
}
