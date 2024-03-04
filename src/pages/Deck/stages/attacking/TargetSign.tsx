import { IonButton, IonIcon } from "@ionic/react";
import { locateOutline } from "ionicons/icons";
import "./TargetSign.css";

const TargetSign: React.FC<React.HtmlHTMLAttributes<HTMLIonButtonElement>> = (
  props
) => {
  return (
    <div className="target-sign">
      <div>
        <IonButton {...props} fill="clear">
          <IonIcon icon={locateOutline} size="large" />
        </IonButton>
      </div>
    </div>
  );
};

export default TargetSign;
