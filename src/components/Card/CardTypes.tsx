import { IonImg } from "@ionic/react";
import "./CardTypes.css";

const CardTypes: React.FC<{ types: string[] }> = ({ types }) => {
  return (
    <div className="card-types">
      {types.map((t) => (
        <IonImg key={t} src={`/types/icons/${t}.png`} />
      ))}
    </div>
  );
};

export default CardTypes;
