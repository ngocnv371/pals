import { IonIcon } from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import { CardInfo } from "../Card/CardInfo";
import { DeckItem } from "../../pages/Deck/model";

export const GridItem: React.FC<{
  item: DeckItem;
  onClick: () => void;
  selected: boolean;
}> = ({ item: p, selected, onClick }) => {
  return (
    <div
      itemType="deck-item"
      itemID={p.id.toString()}
      key={p.id}
      onClick={onClick}
    >
      <CardInfo cardId={p.type} />
      {selected && (
        <IonIcon icon={checkmarkCircle} size="large" color="primary" />
      )}
    </div>
  );
};
