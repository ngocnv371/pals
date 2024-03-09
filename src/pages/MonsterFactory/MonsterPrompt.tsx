import { IonButton, IonIcon } from "@ionic/react";
import { copy } from "ionicons/icons";
import { Monster } from "./model";
import { useCallback, useMemo, useState } from "react";
import { generatePrompt } from "./service";

const MonsterPrompt: React.FC<{ monster: Monster }> = ({ monster }) => {
  const [copied, setCopied] = useState(false);
  const prompt = useMemo(() => generatePrompt(monster), [monster]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [prompt]);

  return (
    <>
      <IonButton fill="clear" onClick={handleCopy} disabled={copied}>
        <IonIcon slot="start" icon={copy} /> Copy Prompt
      </IonButton>
      <pre>{prompt}</pre>
    </>
  );
};

export default MonsterPrompt;
