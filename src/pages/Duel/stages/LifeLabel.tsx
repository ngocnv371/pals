import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { useAppSelector } from "../../../store/hooks";
import "./LifeLabel.css";
import { heart } from "ionicons/icons";
import { selectMyLife, selectTheirLife } from "../v2/selectors";

export const LifeLabel: React.FC = () => {
  const their = useAppSelector(selectTheirLife);
  const my = useAppSelector(selectMyLife);

  return (
    <div className="life-label">
      <IonCard>
        <table>
          <tbody>
            <tr>
              <td>Com</td>
              <td>
                <IonIcon icon={heart} color="danger" />
                {their}
              </td>
            </tr>
            <tr>
              <td>You</td>
              <td>
                <IonIcon icon={heart} color="danger" />
                {my}
              </td>
            </tr>
          </tbody>
        </table>
      </IonCard>
    </div>
  );
};
