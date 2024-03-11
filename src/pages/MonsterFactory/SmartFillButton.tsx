import { IonButton, IonIcon } from "@ionic/react";
import { colorWand } from "ionicons/icons";
import { Monster } from "./model";
import { useCallback, useState } from "react";
import { extractInfo, generateDetail } from "./service";
import { useAppDispatch } from "../../store/hooks";
import { updated } from "./beastiarySlice";
import { ChatCompletionMessage } from "../GPT/model";

const SmartFillButton: React.FC<{
  monster: Monster;
  onCompleted?: (message: ChatCompletionMessage) => void;
}> = ({ monster, onCompleted }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleClick = useCallback(async () => {
    setLoading(true);
    try {
      const msg = await generateDetail(monster);
      onCompleted && onCompleted(msg);
      const info = extractInfo(msg);
      if (!info) {
        console.error("failed to generate info", info);
        return;
      }

      dispatch(
        updated({
          id: monster.id,
          changes: info,
        })
      );
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
