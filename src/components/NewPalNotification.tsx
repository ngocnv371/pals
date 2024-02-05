import { useCallback, useContext } from "react";
import AppContext from "./AppContext/Context";
import { getPalMetadata } from "./AppContext/meta";
import { IonAvatar, IonImg, useIonToast } from "@ionic/react";
import Pal from "../models/pal";
import { hourglass, egg, } from "ionicons/icons";

function useNewPalNotification() {
  const [toast, dismiss] = useIonToast();
  const { pals } = useContext(AppContext)!;

  const present = useCallback(async (pal: Pal) => {
    const meta = getPalMetadata(pal.specieId)!;

    await toast({
      message: `${meta?.name} Lv${pal.level} acquired`,
      icon: egg,
      duration: 3000,
    });
  }, [pals])

  return { present, dismiss };
}

export default useNewPalNotification;
