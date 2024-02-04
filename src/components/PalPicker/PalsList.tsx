import { useContext } from "react";
import PalAvatar from "./PalAvatar";
import "./PalsList.css";
import AppContext from "../AppContext/Context";
import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";

const PalsList: React.FC<{
  gender?: string;
  selected: string;
  onSelect?: (id: string) => void;
}> = ({ onSelect, gender, selected }) => {
  const { pals } = useContext(AppContext)!;
  const filtered = pals.filter((p) => !gender || p.gender == gender);

  return (
    <div className="pals-list">
      {filtered.length == 0 && (
        <IonItem>
          <IonLabel>No result</IonLabel>
        </IonItem>
      )}
      {filtered.map((p, idx) => (
        <div
          itemType="pal"
          itemID={p.id.toString()}
          key={p.id}
          onClick={() => onSelect && onSelect(p.id)}
          tabIndex={idx + 1}
          style={{ position: "relative" }}
        >
          <PalAvatar palId={p.id} />
          {p.id == selected && (
            <IonIcon icon={checkmarkCircle} size="large" color="primary" />
          )}
        </div>
      ))}
    </div>
  );
};

export default PalsList;
