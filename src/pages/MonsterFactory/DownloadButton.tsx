import { IonButton, IonIcon } from "@ionic/react";
import { download } from "ionicons/icons";
import { useAppSelector } from "../../store/hooks";
import { useCallback } from "react";
import { selectById } from "./beastiarySlice";
import { saveAs } from "file-saver";

const DowloadButton: React.FC<{ monsterId: string }> = ({ monsterId }) => {
  const monster = useAppSelector((state) => selectById(state, monsterId));

  const handleClick = useCallback(() => {
    saveAs(JSON.stringify(monster), `${monster.name}.json`, {
      autoBom: true,
    });
  }, [monster]);

  return (
    <IonButton fill="clear" onClick={handleClick}>
      <IonIcon slot="start" icon={download} /> Download
    </IonButton>
  );
};

export default DowloadButton;
