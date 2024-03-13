import { IonButton, IonIcon, useIonRouter } from "@ionic/react";
import { search } from "ionicons/icons";
import { useAppDispatch } from "../../store/hooks";
import { duelStarted } from "../Duel/store/thunk-actions";
import { useMemo, useState } from "react";

const FindMatchButton: React.FC<{ onClick?: () => void; label?: string }> = ({
  onClick,
  label,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useIonRouter();
  const dispatch = useAppDispatch();
  const finalLabel = useMemo(() => (label ? label : "Find Match"), [label]);

  const handleFind = () => {
    setLoading(true);
    onClick && onClick();
    setTimeout(() => {
      setLoading(false);
      dispatch(duelStarted());
      router.push("/duel");
    }, 1200);
  };

  return (
    <IonButton size="large" onClick={handleFind} disabled={loading}>
      <IonIcon slot="start" icon={search} />
      {finalLabel}
    </IonButton>
  );
};

export default FindMatchButton;
