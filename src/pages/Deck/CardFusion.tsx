import { useEffect, useRef } from "react";
import { Card } from "./Card";
import "./CardFusion.css";

const CardFusion: React.FC<{ card1: string; card2: string; card3: string }> = ({
  card1,
  card2,
  card3,
}) => {
  const ref = useRef<HTMLDivElement>();
  // replay animation
  useEffect(() => {
    if (!ref.current) {
      console.debug("ref not found");
      return;
    }

    console.debug("restart animation", card1, card2);
    ref.current?.classList.remove("playing");
    ref.current?.classList.remove("presentingResult");
    ref.current?.classList.remove("presentingBoth");
    setTimeout(() => {
      ref.current?.classList.add("presentingBoth");
    }, 50);
    setTimeout(() => {
      ref.current?.classList.remove("playing");
      ref.current?.classList.remove("presentingResult");
      ref.current?.classList.remove("presentingBoth");
      ref.current?.classList.add("playing");
    }, 1050);
    setTimeout(() => {
      ref.current?.classList.remove("playing");
      ref.current?.classList.remove("presentingResult");
      ref.current?.classList.remove("presentingBoth");
      ref.current?.classList.add("presentingResult");
    }, 3050);
  }, [card1, card2, card3]);

  return (
    <div className="card-fusion" ref={ref as any}>
      <Card cardId={card1} />
      <Card cardId={card2} />
      <Card cardId={card3} />
    </div>
  );
};

export default CardFusion;
