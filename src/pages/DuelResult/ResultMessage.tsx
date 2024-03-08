import { DuelResult } from "../Duel/model";
import { LooseStatus } from "./LooseStatus";
import { TieStatus } from "./TieStatus";
import { UnresolvedStatus } from "./UnresolvedStatus";
import { WinStatus } from "./WinStatus";

const statusComponents = {
  win: WinStatus,
  loose: LooseStatus,
  tie: TieStatus,
  unresolved: UnresolvedStatus,
};

const ResultMessage: React.FC<{ result: DuelResult }> = ({ result }) => {
  const StatusComponent = statusComponents[result];
  if (!StatusComponent) {
    return null;
  }

  return <StatusComponent />;
};

export default ResultMessage;
