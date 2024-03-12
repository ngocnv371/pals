import { useState, useEffect } from "react";

interface GenericSpriteProps {
  tileWidth: number;
  tileHeight: number;
  frames: number;
  cols: number;
  duration: number;
  url: string;
  repeat?: boolean;
}

const GenericSprite: React.FC<GenericSpriteProps> = ({
  tileWidth,
  tileHeight,
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
  const y = -Math.floor(tileIndex / cols) * tileHeight;
  return (
    <div
      style={{
        backgroundImage: url,
        width: `${tileWidth}px`,
        height: `${tileHeight}px`,
        backgroundPosition: `${x}px ${y}px`,
      }}
    />
  );
};

export default GenericSprite;
