import { LooseStatus } from "./LooseStatus";
import { TieStatus } from "./TieStatus";
import { UnresolvedStatus } from "./UnresolvedStatus";
import { WinStatus } from "./WinStatus";

const ResultMessage: React.FC<{ result?: number }> = ({ result }) => {
  const unresolved = typeof result == "undefined";
  const win = result! > 0;
  const loose = result! < 0;
  const tie = result! == 0;

  return (
    <>
      {win && <WinStatus />}
      {loose && <LooseStatus />}
      {tie && <TieStatus />}
      {unresolved && <UnresolvedStatus />}
    </>
  );
};

export default ResultMessage;
