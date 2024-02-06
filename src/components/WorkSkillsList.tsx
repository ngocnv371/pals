import { IonImg, IonItem, IonList } from "@ionic/react";
import WorkSkills from "../models/WorkSkills";
import farming from "../assets/skills/farming.png";
import cooling from "../assets/skills/cooling.png";
import gathering from "../assets/skills/gathering.png";
import generatingElectricity from "../assets/skills/generatingElectricity.png";
import handiwork from "../assets/skills/handiwork.png";
import kindling from "../assets/skills/kindling.png";
import lumbering from "../assets/skills/lumbering.png";
import medicineProduction from "../assets/skills/medicineProduction.png";
import mining from "../assets/skills/mining.png";
import planting from "../assets/skills/planting.png";
import transporting from "../assets/skills/transporting.png";
import watering from "../assets/skills/watering.png";

const WorkSkillsList: React.FC<{ skills: WorkSkills }> = ({ skills }) => {
  const m = {
    farming: farming,
    cooling: cooling,
    gathering: gathering,
    generatingElectricity: generatingElectricity,
    handiwork: handiwork,
    kindling: kindling,
    lumbering: lumbering,
    medicineProduction: medicineProduction,
    mining: mining,
    planting: planting,
    transporting: transporting,
    watering: watering,
  };

  return (
    <IonList>
      {Object.keys(m).filter(k => (skills as any)[k]).map((k) => (
        <IonItem key={k}>
          <IonImg src={(m as any)[k]} slot="start" /> {k} {(skills as any)[k]}
        </IonItem>
      ))}
    </IonList>
  );
};

export default WorkSkillsList;
