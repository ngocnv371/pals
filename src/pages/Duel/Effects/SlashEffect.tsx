import Sprite from "./Sprite";

const SlashEffect: React.FC = () => {
  return (
    <Sprite
      url="url(/effects/slash-sprite.png)"
      width={894}
      cols={5}
      duration={100}
      repeat
    />
  );
};

export default SlashEffect;
