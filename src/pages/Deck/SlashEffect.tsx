import { IonImg } from "@ionic/react";
import { useEffect, useState } from "react";

const SlashEffect: React.FC = () => {
  const size = 894,
    tileSize = 894 / 5;

  const [tileIndex, setTileIndex] = useState(0);

  const duration = 100;
  const totalTiles = 5 * 5;

  useEffect(() => {
    const timer = setInterval(() => {
      setTileIndex((prevTileIndex) => {
        if (prevTileIndex === totalTiles - 1) {
          return 0;
        } else {
          return prevTileIndex + 1;
        }
      });
    }, duration);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(/effects/slash-sprite.png)`,
        width: `${tileSize}px`,
        height: `${tileSize}px`,
        backgroundPosition: `-${(tileIndex % size) * tileSize}px -${
          Math.floor(tileIndex / size) * tileSize
        }px`,
      }}
    />
  );
};

export default SlashEffect;
