import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { ChatCompletionMessage } from "../../gpt/model";

const ChatMessageCard: React.FC<{ message: ChatCompletionMessage }> = ({
  message,
}) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{message.role}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="prompt">{message.content}</IonCardContent>
    </IonCard>
  );
};

export default ChatMessageCard;
