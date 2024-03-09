import { IonButton, IonIcon } from "@ionic/react";
import { colorWand } from "ionicons/icons";
import { Monster } from "./model";
import { useCallback, useState } from "react";
import { generateDetail } from "./service";
import { useAppDispatch } from "../../store/hooks";
import { updated } from "./beastiarySlice";

const SmartFillButton: React.FC<{ monster: Monster }> = ({ monster }) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const handleClick = useCallback(async () => {
    setLoading(true);
    try {
      const msg = await generateDetail(monster);
      const description = msg.choices[0].text;
      setText(description);
      dispatch(updated({ id: monster.id, changes: { description } }));
    } catch (e) {
      console.error("failed to fill", e);
    } finally {
      setLoading(false);
    }
  }, [monster]);

  return (
    <IonButton fill="clear" onClick={handleClick} disabled={loading}>
      <IonIcon slot="start" icon={colorWand}></IonIcon>
      Smart Fill
    </IonButton>
  );
};

export default SmartFillButton;
