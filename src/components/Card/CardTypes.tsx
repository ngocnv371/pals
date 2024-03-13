import { IonImg } from "@ionic/react";
import "./CardTypes.css";

const CardTypes: React.FC<{ types: string[]; full?: boolean }> = ({
  types,
  full,
}) => {
  return (
    <div className={`card-types ${full ? "full" : ""}`}>
      {types.map((t) => (
        <IonImg key={t} src={`/types/${full ? "" : "icons/"}${t}.png`} />
      ))}
    </div>
  );
};

export default CardTypes;
