import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonImg,
  IonItem,
  IonList,
} from "@ionic/react";
import { useContext } from "react";
import AppContext from "../AppContext/Context";
import { getPalMetadata, getPalMetadataEx } from "../AppContext/meta";
import { female, male } from "ionicons/icons";
import WorkSkillsList from "../WorkSkillsList";

const PalPreview: React.FC<{ palId: string }> = ({ palId }) => {
  const { pals } = useContext(AppContext)!;
  const pal = pals.find((p) => p.id == palId);
  if (!pal) {
    return null;
  }

  const meta = getPalMetadata(pal.specieId);
  if (!meta) {
    return null;
  }

  const metaEx = getPalMetadataEx(meta.name);
  if (!metaEx) {
    return null;
  }

  return (
    <IonCard className="pal-preview">
      <IonCardHeader>
        <IonCardTitle>
          <IonIcon icon={pal.gender == "male" ? male : female} /> {meta.name} Lv
          {pal.level}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{metaEx.content.description}</p>
      </IonCardContent>
      <WorkSkillsList skills={metaEx.content.workSkills}/>
    </IonCard>
  );
};

export default PalPreview;
