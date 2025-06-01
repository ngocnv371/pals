import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSearchbar,
  IonContent,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { useState, useMemo, useRef } from "react";
import { typedFacilities } from "./utils";
import BlueprintCard from "./BlueprintCard";
import { useAppStore } from "../store/useAppStore";

interface BlueprintPickerProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  value?: string | null;
  onChange: (typeId: string) => void;
}

export default function BlueprintPicker({
  isOpen,
  onDidDismiss,
  onChange,
}: BlueprintPickerProps) {
  const inventory = useAppStore((s) => s.inventory);
  const canConstruct = useAppStore((s) => s.canConstructBuilding);
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLIonSearchbarElement>(null);

  // BUG: inventory changes will influence which can be constructed,
  // but tying this memo to [inventory] causes too many updates.
  // not tying it will causes it to not update when inventory change.
  const filteredFacilities = useMemo(() => {
    let candidates = Object.values(typedFacilities);
    if (search && search.trim()) {
      candidates = candidates.filter((b) =>
        b.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    const filtered = candidates.map((c) => ({
      affordable: canConstruct(c.id),
      blueprint: c,
    }));

    return filtered.sort((a, b) => (a.affordable ? 1 : 0));
  }, [search, canConstruct, inventory]);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDidDismiss}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>Select Blueprint</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            ref={searchInputRef}
            value={search}
            onIonInput={(e) => setSearch(e.detail.value!)}
            placeholder="Search blueprints"
            debounce={100}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {filteredFacilities.map(({ affordable, blueprint }) => (
          <BlueprintCard
            key={blueprint.id}
            id={blueprint.id}
            disabled={!affordable}
            onClick={() => {
              onChange(blueprint.id);
              onDidDismiss();
            }}
          />
        ))}
      </IonContent>
    </IonModal>
  );
}
