import GenericSprite from "./GenericSprite";

const FireEffect: React.FC = () => {
  return (
    <div className="animate__animated animate__fadeOut animate__slower">
      <GenericSprite
        url="url(/effects/fire-sprite.png)"
        frames={9}
        tileWidth={200}
        tileHeight={381 / 3}
        cols={3}
        duration={120}
      />
    </div>
  );
};

export default FireEffect;
