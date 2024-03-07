import { useState, useEffect } from "react";

interface SpriteProps {
  tileWidth: number;
  frames: number;
  cols: number;
  duration: number;
  url: string;
  repeat?: boolean;
}

const Sprite: React.FC<SpriteProps> = ({
  tileWidth,
  frames,
  cols,
  duration,
  url,
  repeat,
}) => {
  const [tileIndex, setTileIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTileIndex((prevTileIndex) => {
        if (prevTileIndex === frames - 1) {
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
  }, [frames, repeat]);

  const x = -(tileIndex % cols) * tileWidth;
  const y = -Math.floor(tileIndex / cols) * tileWidth;
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
