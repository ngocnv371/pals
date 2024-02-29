import { Card } from "./Card";

const CardStack: React.FC = () => {
  return (
    <div className="card-stack">
      <Card cardId="boss_amaterasuwolf" />
      <Card cardId="boss_anubis" />
      <Card cardId="boss_baphomet" />
      <Card cardId="boss_birddragon" />
      <Card cardId="boss_bastet" />
      <Card cardId="boss_berrygoat" />
    </div>
  );
};

export default CardStack;
