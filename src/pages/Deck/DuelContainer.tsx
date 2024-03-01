import { useEffect } from "react";
import { DuelStage, myCardsDrawed, selectStage } from "../../store/duelSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Board } from "./Board";
import { Hand } from "./Hand";
const DuelContainer: React.FC = () => {
  const stage = useAppSelector(selectStage);
  const dispatch = useAppDispatch();

  // start duel
  useEffect(() => {
    if (stage === DuelStage.Start) {
      dispatch(myCardsDrawed(5));
    }
  }, [stage]);

  return (
    <div className={`duel-container ${stage}`}>
      <Board />
      {stage == DuelStage.MyDrawing && <Hand />}
    </div>
  );
};

export default DuelContainer;
