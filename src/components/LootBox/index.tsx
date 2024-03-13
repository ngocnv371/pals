import { useMemo, useState } from "react";
import "./styles.css";
import { CardInfo } from "../Card/CardInfo";

const Box: React.FC<{
  disabled: boolean;
  selected: boolean;
  onClick: () => void;
}> = ({ selected, ...props }) => {
  return <CardInfo cardId="anubis" hidden={!selected} {...props} />;
};

const LootBox: React.FC<{ count: number }> = ({ count }) => {
  const items = useMemo(() => Array.from({ length: count }).fill(0), [count]);
  const [selected, setSelected] = useState(-1);
  const selectedClass = useMemo(
    () => (selected >= 0 ? `selected-${selected}` : ""),
    [selected]
  );

  return (
    <div className={`loot-box ion-padding ${selectedClass}`}>
      {items.map((_, idx) => (
        <Box
          key={idx}
          disabled={selected >= 0}
          selected={selected == idx}
          onClick={() => setSelected(idx)}
        />
      ))}
    </div>
  );
};

export default LootBox;
