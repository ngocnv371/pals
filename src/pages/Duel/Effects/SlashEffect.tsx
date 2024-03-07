import Sprite from "./Sprite";

const SlashEffect: React.FC = () => {
  return (
    <Sprite
      url="url(/effects/slash-sprite.png)"
      tileWidth={894 / 5}
      frames={7}
      cols={5}
      duration={50}
      repeat
    />
  );
};

export default SlashEffect;
