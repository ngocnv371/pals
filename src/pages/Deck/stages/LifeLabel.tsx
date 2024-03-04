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

export const LifeLabel: React.FC = () => {
  const their = useAppSelector((state) => state.duel.their.life);
  const my = useAppSelector((state) => state.duel.my.life);

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
