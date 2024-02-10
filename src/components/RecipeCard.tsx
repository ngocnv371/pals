import { IonAvatar, IonCard, IonImg } from "@ionic/react";
import { getRecipeById } from "../data/recipes";

const RecipeCard: React.FC<
  { recipeId: string } & Pick<
    React.HtmlHTMLAttributes<HTMLIonAvatarElement>,
    "color" | "onClick"
  >
> = ({ color, recipeId, onClick }) => {
  const recipe = getRecipeById(recipeId);
  if (!recipe) {
    return null;
  }

  const products = recipe.produce as any;
  return (
    <>
      {Object.keys(products).map((k) => (
        <IonCard key={k} color={color} onClick={onClick}>
          <IonImg src={`/items/${k}.png`} />
        </IonCard>
      ))}
    </>
  );
};

export default RecipeCard;
