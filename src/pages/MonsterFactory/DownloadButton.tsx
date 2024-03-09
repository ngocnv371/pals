import { IonButton, IonIcon } from "@ionic/react";
import { download } from "ionicons/icons";
import { useAppSelector } from "../../store/hooks";
import { useCallback } from "react";
import { selectById } from "./beastiarySlice";
import { saveAs } from "file-saver";

const DowloadButton: React.FC<{ monsterId: string }> = ({ monsterId }) => {
  const monster = useAppSelector((state) => selectById(state, monsterId));
  const disabled = !monster.name;

  const handleClick = useCallback(() => {
    if (!monster) {
      console.error("no monster to download");
      return;
    }

    const json = JSON.stringify(monster);
    console.debug("encoded monster", json);
    var blob = new Blob([json], { type: "application/json;charset=utf-8" });
    saveAs(blob, `${monster.name}.json`);
  }, [monster]);

  return (
    <IonButton fill="clear" onClick={handleClick} disabled={disabled}>
      <IonIcon slot="start" icon={download} /> Download
    </IonButton>
  );
};

export default DowloadButton;
