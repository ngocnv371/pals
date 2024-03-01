import { IonButton, IonIcon } from "@ionic/react";
import { downloadOutline } from "ionicons/icons";
import "./TargetSign.css";

const TargetSign: React.FC<React.HtmlHTMLAttributes<HTMLIonButtonElement>> = (
  props
) => {
  return (
    <div className="target-sign">
      <div>
        <IonButton {...props}>
          <IonIcon icon={downloadOutline} />
        </IonButton>
      </div>
    </div>
  );
};

export default TargetSign;
