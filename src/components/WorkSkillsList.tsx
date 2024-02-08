import { IonImg, IonItem, IonList } from "@ionic/react";
import WorkSkills from "../models/WorkSkills";

const WorkSkillsList: React.FC<{ skills: WorkSkills }> = ({ skills }) => {
  const keys = Object.keys(skills)

  return (
    <IonList>
      {keys.filter(k => (skills as any)[k]).map((k) => (
        <IonItem key={k}>
          <IonImg src={`/skills/${k}.png`} slot="start" /> {k} {(skills as any)[k]}
        </IonItem>
      ))}
    </IonList>
  );
};

export default WorkSkillsList;
