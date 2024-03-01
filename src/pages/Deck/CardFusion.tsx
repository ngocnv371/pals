import { useEffect, useRef } from "react";
import { Card } from "./Card";
import "./CardFusion.css";

const CardFusion: React.FC<{ card1: string; card2: string }> = ({
  card1,
  card2,
}) => {
  const ref = useRef<HTMLDivElement>();
  console.debug("yo", card1, card2);
  // replay animation
  useEffect(() => {
    if (!ref.current?.classList) {
      console.debug("ref not found");
      return;
    }

    console.debug("restart animation", card1, card2);
    ref.current?.classList.remove("playing");
    setTimeout(() => {
      ref.current?.classList.add("playing");
    }, 50);
  }, [card1, card2]);

  return (
    <div className="card-fusion" ref={ref as any}>
      <Card cardId={card1} />
      <Card cardId={card2} />
    </div>
  );
};

export default CardFusion;
