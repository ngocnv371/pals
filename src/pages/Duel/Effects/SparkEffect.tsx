import Sprite from "./Sprite";

const SparkEffect: React.FC = () => {
  return (
    <div className="animate__animated animate__fadeOut animate__slower">
      <Sprite
        url="url(/effects/spark-sprite.png)"
        frames={8}
        tileWidth={256}
        cols={4}
        duration={120}
      />
    </div>
  );
};

export default SparkEffect;
