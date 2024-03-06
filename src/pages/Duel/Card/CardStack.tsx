import { CardInfo } from "../../../components/Card/CardInfo";
import "./CardStack.css";

const CardStack: React.FC = () => {
  return (
    <div className="card-stack">
      <CardInfo cardId="boss_amaterasuwolf" />
      <CardInfo cardId="boss_anubis" />
      <CardInfo cardId="boss_baphomet" />
      <CardInfo cardId="boss_birddragon" />
      <CardInfo cardId="boss_bastet" />
      <CardInfo cardId="boss_berrygoat" />
    </div>
  );
};

export default CardStack;
