import { IonFab } from "@ionic/react";
import React, { useCallback, useMemo, useState } from "react";
import { PlaceCardsButton } from "./PlaceCardsButton";
import { HandCard } from "./HandCard";
import { useAppSelector } from "../../store/hooks";
import { getPalMetadataById } from "../../data/palMetadata";

export const Hand: React.FC = () => {
  const hand = useAppSelector((state) => state.duel.my.hand);
  const cards = useMemo(() => hand.map(getPalMetadataById), [hand]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const handleSelectCard = useCallback(
    (cardId: string) => {
      if (selectedCards.includes(cardId)) {
        // unselect
        setSelectedCards((items) => items.filter((i) => i != cardId));
      } else {
        // add select
        setSelectedCards((items) => items.concat(cardId));
      }
    },
    [selectedCards]
  );

  return (
    <div className="hand">
      <IonFab slot="fixed" horizontal="end" vertical="bottom">
        {selectedCards.length > 0 && <PlaceCardsButton />}
      </IonFab>
      {cards.map((c) => {
        const idx = selectedCards.indexOf(c.id);
        const selected = idx >= 0;
        const index = selected ? idx + 1 : undefined;
        return (
          <HandCard
            key={c.id}
            cardId={c.id}
            selected={selected}
            index={index}
            onClick={() => handleSelectCard(c.id)}
          />
        );
      })}
    </div>
  );
};
