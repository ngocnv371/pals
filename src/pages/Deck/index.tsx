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
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { useCallback, useMemo, useState } from "react";
import "./styles.css";
import { Chance } from "chance";
import pals from "../../data/pals.json";
import Pal from "../../models/pal";

const Board: React.FC = () => {
  return (
    <div className="board">
      <Row>
        <Cell></Cell>
        <Cell>
          <Card cardId="pinkcat" />
        </Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>
      </Row>
      <Row>
        <Cell></Cell>
        <Cell>
          <Card cardId="negativekoala" />
        </Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>
      </Row>
      <EmptyRow></EmptyRow>
      <Row>
        <Cell></Cell>
        <Cell></Cell>
        <Cell>
          <Card cardId="suzaku" />
        </Cell>
        <Cell></Cell>
        <Cell></Cell>
      </Row>
      <Row>
        <Cell>
          <Card cardId="woolfox" />
        </Cell>
        <Cell>
          <Card cardId="yeti" />
        </Cell>
        <Cell>
          <Card cardId="swwetssheep" />
        </Cell>
        <Cell>
          <Card cardId="queenbee" />
        </Cell>
        <Cell>
          <Card cardId="ronin" />
        </Cell>
      </Row>
    </div>
  );
};

const Card: React.FC<{ cardId: string }> = ({ cardId }) => {
  const card = useMemo(() => pals.find((f) => f.id == cardId), [cardId]);

  if (!card) {
    return null;
  }

  return (
    <div className="card">
      <IonCard style={{ width: "80px", height: "120px" }}>
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
      className={`hand-card ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      {selected && <IonBadge>{index}</IonBadge>}
      <IonCard style={{ width: "80px", height: "120px" }}>
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
