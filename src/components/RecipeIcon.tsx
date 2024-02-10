import { IonAvatar, IonImg } from "@ionic/react";
import { getRecipeById } from "../data/recipes";

const RecipeIcon: React.FC<{ recipeId: string }> = ({ recipeId }) => {
  const recipe = getRecipeById(recipeId);
  if (!recipe) {
    return null;
  }

  const products = recipe.produce as any;
  return (
    <>
      {Object.keys(products).map((k) => (
        <IonAvatar className="borderless-avatar" key={k}>
          <IonImg src={`/items/${k}.png`} />
        </IonAvatar>
      ))}
    </>
  );
};

export default RecipeIcon;
