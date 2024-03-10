import { Monster } from "./model";
import { useEffect, useState } from "react";
import { generateMessages } from "./service";
import { ChatCompletionMessage } from "../../gpt/model";
import ChatMessageCard from "./ChatMessage";
import SmartFillButton from "./SmartFillButton";
import UploadButton from "./UploadButton";

const MonsterPrompt: React.FC<{ monster: Monster }> = ({ monster }) => {
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

  return (
    <div className="monster-prompt">
      <SmartFillButton
        monster={monster}
        onCompleted={(msg) => setGeneratedMessage(msg)}
      />
      <UploadButton />
      {messages.map((m, idx) => (
        <ChatMessageCard message={m} key={idx} />
      ))}
    </div>
  );
};

export default MonsterPrompt;
