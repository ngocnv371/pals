import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonCard,
  IonImg,
  IonBadge,
  IonIcon,
  IonFabButton,
  IonFabList,
  IonFab,
} from "@ionic/react";
import React, { useCallback, useMemo, useState } from "react";
import "./styles.css";
import { Chance } from "chance";
import pals from "../../data/pals.json";
import Pal from "../../models/pal";
import { chevronForward } from "ionicons/icons";
import { useAppSelector } from "../../store/hooks";
import {
  CardStance,
  Formation,
  selectMyDeployed,
  selectMySupports,
  selectTheirDeployed,
  selectTheirHand,
  selectTheirSupports,
} from "../../store/duelSlice";
import { RootState } from "../../store";

const FormationLine: React.FC<{ formation: Formation }> = ({ formation }) => {
  return formation.map((d, idx) => (
    <Cell key={idx}>
      {d && (
        <Card cardId={d.cardId} defensive={d.stance == CardStance.Defensive} />
      )}
    </Cell>
  ));
};

function withFormationSelector(
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

const TheirDeployedFormation = withFormationSelector(
  selectTheirDeployed,
  "TheirDeployedFormation"
);
const MyDeployedFormation = withFormationSelector(
  selectMyDeployed,
  "MyDeployedFormation"
);
const TheirSupportsFormation = withFormationSelector(
  selectTheirSupports,
  "TheirSupportsFormation"
);
const MySupportsFormation = withFormationSelector(
  selectMySupports,
  "MySupportsFormation"
);

const Board: React.FC = () => {
  return (
    <div className="board">
      <Row>
        <TheirSupportsFormation />
      </Row>
      <Row>
        <TheirDeployedFormation />
      </Row>
      <EmptyRow></EmptyRow>
      <Row>
        <MyDeployedFormation />
      </Row>
      <Row>
        <MySupportsFormation />
      </Row>
    </div>
  );
};

const Card: React.FC<{ cardId: string; defensive?: boolean }> = ({
  cardId,
  defensive,
}) => {
  const card = useMemo(() => pals.find((f) => f.id == cardId), [cardId]);

  if (!card) {
    return null;
  }

  return (
    <div className={`card ${defensive ? "defensive" : ""}`}>
      <IonCard>
        <IonImg src={`/pals/${card.content.image}`}></IonImg>
        <p>
          <span className="atk">{card.content.baseAttack}</span>/
          <span className="def">{card.content.defense}</span>
        </p>
      </IonCard>
    </div>
  );
};

const Cell: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="cell">{children}</div>;
};

const Row: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="row">{children}</div>;
};

const EmptyRow: React.FC = () => {
  return <div style={{ height: "120px", width: "80px" }}></div>;
};

const chance = new Chance();
const handCards = chance.pickset(pals, 5);

const PlaceCardsButton: React.FC = () => {
  return (
    <IonFabButton>
      <IonIcon icon={chevronForward} />
    </IonFabButton>
  );
};

const Hand: React.FC = () => {
  const [cards] = useState(handCards);
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

const HandCard: React.FC<{
  cardId: string;
  selected?: boolean;
  index?: number;
  onClick?: () => void;
}> = ({ cardId, selected, index, onClick }) => {
  const card = useMemo(() => pals.find((f) => f.id == cardId), [cardId]);

  if (!card) {
    return null;
  }

  return (
    <div
      className={`card hand-card ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      {selected && <IonBadge>{index}</IonBadge>}
      <IonCard>
        <IonImg src={`/pals/${card.content.image}`}></IonImg>
        <p>
          <span className="atk">{card.content.baseAttack}</span>/
          <span className="def">{card.content.defense}</span>
        </p>
      </IonCard>
    </div>
  );
};

const DeckPage: React.FC = () => {
  const [selected, setSelected] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Deck</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Deck</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Board />
        <Hand />
      </IonContent>
    </IonPage>
  );
};

export default DeckPage;
