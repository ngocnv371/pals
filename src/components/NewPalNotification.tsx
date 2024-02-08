import { useIonToast } from "@ionic/react";
import Pal from "../models/pal";
import { egg } from "ionicons/icons";
import getPalMetadata from "../data/palMetadata";

function useNewPalNotification() {
  const [toast, dismiss] = useIonToast();

  const present = async (pal: Pal) => {
    console.debug('present', pal)
    const meta = getPalMetadata(pal.type)!;

    await toast({
      message: `${meta?.title} Lv${pal.level} acquired`,
      icon: egg,
      duration: 3000,
    });
  };

  return { present, dismiss };
}

export default useNewPalNotification;
