import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import { female, male } from "ionicons/icons";
import WorkSkillsList from "../WorkSkillsList";
import { useAppSelector } from "../../store/hooks";
import { selectPalById } from "../../pages/Deck/deckSlice";
import getPalMetadata from "../../data/palMetadata";

const PalPreview: React.FC<{ palId: string }> = ({ palId }) => {
  const pal = useAppSelector((state) => selectPalById(state.pals, palId));
  if (!pal) {
    return null;
  }

  const meta = getPalMetadata(pal.type);
  if (!meta) {
    return null;
  }

  return (
    <IonCard className="pal-preview">
      <IonCardHeader>
        <IonCardTitle>
          <IonIcon icon={pal.gender == "male" ? male : female} /> {meta.title}{" "}
          Lv
          {pal.level}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{meta.description}</p>
      </IonCardContent>
      <WorkSkillsList skills={meta.workSkills} />
    </IonCard>
  );
};

export default PalPreview;
