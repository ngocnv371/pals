import { IonCard, IonImg } from "@ionic/react";
import { useMemo, useState } from "react";
import "./styles.css";

const Box: React.FC<{ disabled: boolean; onClick: () => void }> = ({
  disabled,
  onClick,
}) => {
  return (
    <IonCard disabled={disabled} onClick={onClick}>
      <IonImg src="/icons/question-mark-80.png" />
    </IonCard>
  );
};

const LootBox: React.FC<{ count: number }> = ({ count }) => {
  const items = useMemo(() => Array.from({ length: count }).fill(0), [count]);
  const [selected, setSelected] = useState(false);

  return (
    <div className="loot-box ion-padding">
      {items.map((_, idx) => (
        <Box key={idx} disabled={selected} onClick={() => setSelected(true)} />
      ))}
    </div>
  );
};

export default LootBox;
