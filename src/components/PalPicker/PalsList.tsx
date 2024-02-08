import PalAvatar from "./PalAvatar";
import "./PalsList.css";
import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import { useAppSelector } from "../../store/hooks";
import { selectAllPals, selectPalsByGender } from "../../store/palsSlice";

const PalsList: React.FC<{
  gender?: string;
  selected: string;
  onSelect?: (id: string) => void;
}> = ({ onSelect, gender, selected }) => {
  const filtered = useAppSelector((state) => gender ?
    selectPalsByGender(state.pals, gender) : selectAllPals(state.pals)
  );

  if (filtered.length == 0) {
    return <p>No result</p>;
  }

  return (
    <div className="pals-list">
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
