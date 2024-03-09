import { IonButton, IonIcon, IonProgressBar } from "@ionic/react";
import { colorWand, refresh } from "ionicons/icons";
import { Monster } from "./model";
import { useCallback, useState } from "react";
import { generateDetail } from "./service";

const SmartFillButton: React.FC<{ monster: Monster }> = ({ monster }) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const handleClick = useCallback(async () => {
    setLoading(true);
    try {
      const msg = await generateDetail(monster, (chat) => setText(chat.text));
      setText(msg.text);
      console.debug("msg", msg);
    } catch (e) {
      //
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
