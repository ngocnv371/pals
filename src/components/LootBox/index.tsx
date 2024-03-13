import { useMemo, useState } from "react";
import "./styles.css";
import { CardInfo } from "../Card/CardInfo";

const Box: React.FC<
  {
    disabled: boolean;
    selected: boolean;
    onClick: () => void;
  } & any
> = ({ selected, ...props }) => {
  return <CardInfo cardId="anubis" hidden={!selected} {...props} />;
};

const LootBox: React.FC<{ count: number }> = ({ count }) => {
  const items = useMemo(() => Array.from({ length: count }).fill(0), [count]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const selected = useMemo(() => selectedIndex >= 0, [selectedIndex]);
  const selectedClass = useMemo(
    () => (selected ? `selected-${selectedIndex}` : ""),
    [selectedIndex, selected]
  );

  return (
    <div className={`loot-box ion-padding ${selectedClass}`}>
      {items.map((_, idx) =>
        idx == selectedIndex ? (
          <CardInfo
            key={idx}
            cardId="anubis"
            className="animate__animated animate__flipInY"
          />
        ) : (
          <Box
            key={idx}
            className="animate__animated animate__zoomInDown"
            disabled={selectedIndex >= 0}
            selected={selectedIndex == idx}
            onClick={() => setSelectedIndex(idx)}
          />
        )
      )}
    </div>
  );
};

export default LootBox;
