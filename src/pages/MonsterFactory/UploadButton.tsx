import { IonButton, IonIcon } from "@ionic/react";
import { cloudUpload } from "ionicons/icons";
import { useRef } from "react";
import { parseFiles } from "./service";
import { Monster } from "./model";
import { useAppDispatch } from "../../store/hooks";
import { added } from "./beastiarySlice";

const UploadButton: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const files = e.target.files;
    if (!files || !files.length) {
      console.error("no file selected");
      return;
    }

    const items: Monster[] = await parseFiles(files);
    console.debug("parsed", items);
    const validItems = items.filter((i) => i.name && i.description);
    validItems.forEach((i) => dispatch(added(i)));
  };

  return (
    <>
      <IonButton fill="clear" onClick={handleClick}>
        <IonIcon slot="start" icon={cloudUpload} /> Upload
      </IonButton>
      <input
        type="file"
        ref={fileInputRef as any}
        onChange={handleChange}
        multiple
        accept=".json"
        style={{ display: "none" }}
      />
    </>
  );
};

export default UploadButton;
