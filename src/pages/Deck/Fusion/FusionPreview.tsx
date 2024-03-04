import { useMemo } from "react";
import { useAppSelector } from "../../../store/hooks";
import { selectMyFusionQueue } from "../duelSlice";
import "./FusionPreview.css";
import { breedChain } from "../../../data/palBreed";
import { Card } from "../Card/Card";

const _FusionPreview: React.FC<{ cards: string[] }> = ({ cards }) => {
  const result = useMemo(() => breedChain(cards), [cards]);

  return (
    <div className="fusion-preview">
      <Card cardId={result} />
    </div>
  );
};

const FusionPreview: React.FC = () => {
  const queue = useAppSelector(selectMyFusionQueue);
  if (!queue || !queue.length) {
    return null;
  }

  return <_FusionPreview cards={queue} />;
};

export default FusionPreview;
