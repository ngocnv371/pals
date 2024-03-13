import { IonIcon } from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import { CardInfo } from "../Card/CardInfo";
import "./GridItem.css";

export const GridItem: React.FC<{
  id: string;
  type: string;
  onClick: () => void;
  selected: boolean;
}> = ({ id, type, selected, onClick }) => {
  return (
    <div
      className="grid-item"
      itemType="grid-item"
      itemID={id.toString()}
      key={id}
      onClick={onClick}
    >
      <CardInfo cardId={type} />
      {selected && (
        <IonIcon
          className="marker"
          icon={checkmarkCircle}
          size="large"
          color="primary"
        />
      )}
    </div>
  );
};
