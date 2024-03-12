import GenericSprite from "./GenericSprite";

const SlashEffect: React.FC = () => {
  return (
    <div className="animate__animated animate__fadeOut">
      <GenericSprite
        url="url(/effects/slash-sprite.png)"
        tileWidth={894 / 5}
        tileHeight={894 / 5}
        frames={7}
        cols={5}
        duration={50}
      />
    </div>
  );
};

export default SlashEffect;
