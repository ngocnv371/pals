import { useAppSelector } from "../../store/hooks";
import CardFusion from "./CardFusion";

const FusionVisualizer: React.FC = () => {
  const [c1, c2] = useAppSelector((state) => state.duel.my.fusingCards);

  if (!c1 || !c2) {
    return null;
  }

  return <CardFusion card1={c1} card2={c2} />;
};

export default FusionVisualizer;
