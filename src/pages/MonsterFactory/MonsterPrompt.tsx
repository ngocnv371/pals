import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonList,
} from "@ionic/react";
import { copy } from "ionicons/icons";
import { Monster } from "./model";
import { useCallback, useEffect, useState } from "react";
import { generateMessages } from "./service";
import { ChatCompletionMessage } from "../../gpt/model";
import ChatMessageCard from "./ChatMessage";
import SmartFillButton from "./SmartFillButton";

const MonsterPrompt: React.FC<{ monster: Monster }> = ({ monster }) => {
  const [copied, setCopied] = useState(false);
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);
  const [generatedMessage, setGeneratedMessage] =
    useState<ChatCompletionMessage | null>(null);

  useEffect(() => {
    const msgs = generateMessages(monster);
    if (generatedMessage) {
      msgs.push(generatedMessage);
    }
    setMessages(msgs.reverse());
  }, [monster, generatedMessage]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(messages[2].content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [messages]);

  return (
    <div className="monster-prompt">
      <IonButton fill="clear" onClick={handleCopy} disabled={copied}>
        <IonIcon slot="start" icon={copy} /> Copy Prompt
      </IonButton>
      <SmartFillButton
        monster={monster}
        onCompleted={(msg) => setGeneratedMessage(msg)}
      />
      {messages.map((m, idx) => (
        <ChatMessageCard message={m} key={idx} />
      ))}
    </div>
  );
};

export default MonsterPrompt;
