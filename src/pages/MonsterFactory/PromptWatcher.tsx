import { useMemo } from "react";
import { generateMessages } from "./service";
import ChatMessageCard from "./ChatMessage";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentMonsters } from "./factorySlice";

const PromptWatcher: React.FC = () => {
  const monsters = useAppSelector(selectCurrentMonsters);
  const messages = useMemo(
    () => generateMessages(monsters).reverse(),
    [monsters]
  );

  return (
    <div className="prompt-watcher">
      {messages.map((m, idx) => (
        <ChatMessageCard message={m} key={idx} />
      ))}
    </div>
  );
};

export default PromptWatcher;
