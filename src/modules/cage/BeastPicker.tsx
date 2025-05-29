import {
  IonCard,
  IonCardContent,
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
import { VirtuosoGrid } from "react-virtuoso";
import { useCage } from "./useCage";
import BeastCard from "./BeastCard";
import { SimpleGridComponents } from "../shared/SimpleGrid";
import { Beast } from "./types";

interface BeastPickerProps {
  value?: string | null;
  onChange: (id: string) => void;
  filter?: (beast: Beast) => boolean;
}

export default function BeastPicker({
  value,
  onChange,
  filter,
}: BeastPickerProps) {
  const { beasts } = useCage();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLIonSearchbarElement>(null);

  const selectedBeast = useMemo(
    () => beasts.find((b) => b.id === value),
    [beasts, value]
  );

  const filteredBeasts = useMemo(() => {
    let candidates = beasts;
    if (filter) {
      candidates = candidates.filter(filter);
    }
    if (!search) return candidates;
    return candidates.filter((b) =>
      (b.name || b.id).toLowerCase().includes(search.toLowerCase())
    );
  }, [beasts, search, filter]);

  return (
    <>
      {selectedBeast ? (
        <div onClick={() => setShowModal(true)} className="cursor-pointer">
          <BeastCard id={selectedBeast.id} className="margin-h-auto" />
        </div>
      ) : (
        <IonCard onClick={() => setShowModal(true)} className="cursor-pointer">
          <IonCardContent>Tap to select</IonCardContent>
        </IonCard>
      )}

      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setShowModal(false)}>Cancel</IonButton>
            </IonButtons>
            <IonTitle>Select Beast</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar
              ref={searchInputRef}
              value={search}
              onIonInput={(e) => setSearch(e.detail.value!)}
              placeholder="Search beasts"
              debounce={100}
            />
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <VirtuosoGrid
            style={{ height: "100%" }}
            totalCount={filteredBeasts.length}
            components={SimpleGridComponents}
            itemContent={(index) => (
              <div
                onClick={() => {
                  onChange(filteredBeasts[index].id);
                  setShowModal(false);
                }}
                className="cursor-pointer"
              >
                <BeastCard id={filteredBeasts[index].id} />
              </div>
            )}
          />
        </IonContent>
      </IonModal>
    </>
  );
}
