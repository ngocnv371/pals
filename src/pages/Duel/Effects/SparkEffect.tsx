import Sprite from "./Sprite";

const SparkEffect: React.FC = () => {
  return (
    <Sprite
      url="url(/effects/spark-sprite.png)"
      frames={8}
      tileWidth={256}
      cols={4}
      duration={120}
      repeat
    />
  );
};

export default SparkEffect;
