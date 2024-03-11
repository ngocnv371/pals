import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { ChatCompletionMessage } from "../GPT/model";
import { copyOutline } from "ionicons/icons";
import { useCallback, useState } from "react";
import "./ChatMessage.css";

const ChatMessageCard: React.FC<{ message: ChatCompletionMessage }> = ({
  message,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [message]);

  return (
    <IonCard className={`chat-message role-${message.role}`}>
      <IonCardHeader>
        <IonCardTitle>{message.role}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="prompt">{message.content}</IonCardContent>
      <IonButton fill="clear" onClick={handleCopy} disabled={copied}>
        <IonIcon slot="start" icon={copyOutline} /> Copy
      </IonButton>
    </IonCard>
  );
};

export default ChatMessageCard;
