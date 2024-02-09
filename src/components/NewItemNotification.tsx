import { useIonToast } from "@ionic/react";
import { egg } from "ionicons/icons";
import Item from "../models/item";
import getMetadata from "../data/metadata";

function useNewItemNotification() {
  const [toast, dismiss] = useIonToast();

  const present = async (item: Item) => {
    const meta = getMetadata(item.id)!;

    await toast({
      message: `${item.quantity} x ${meta?.name} acquired`,
      icon: egg,
      duration: 3000,
    });
  };

  return { present, dismiss };
}

export default useNewItemNotification;
