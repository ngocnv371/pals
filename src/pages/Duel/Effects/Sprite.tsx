import { useState, useEffect } from "react";

interface SpriteProps {
  width: number;
  cols: number;
  duration: number;
  url: string;
  repeat?: boolean;
}

const Sprite: React.FC<SpriteProps> = ({
  width,
  cols,
  duration,
  url,
  repeat,
}) => {
  const tileWidth = width / cols;
  const totalTiles = cols * cols;

  const [tileIndex, setTileIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTileIndex((prevTileIndex) => {
        if (prevTileIndex === totalTiles - 1) {
          if (repeat) {
            return 0;
          }

          clearInterval(timer);
          return 0;
        } else {
          return prevTileIndex + 1;
        }
      });
    }, duration);

    return () => clearInterval(timer);
  }, [totalTiles, repeat]);

  const x = -(tileIndex % width) * tileWidth;
  const y = -Math.floor(tileIndex / width) * tileWidth;
  return (
    <div
      style={{
        backgroundImage: url,
        width: `${tileWidth}px`,
        height: `${tileWidth}px`,
        backgroundPosition: `${x}px ${y}px`,
      }}
    />
  );
};

export default Sprite;
