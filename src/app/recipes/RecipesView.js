import state from "../data/globalState";
import Recipe from "./Recipe";

export default class RecipesView {
  constructor() {
    this.recipesView = document.getElementById("main-content");
  }

  displayRecipes() {
    const recipesToDisplay = state.globalState.recipesToDisplay;
    recipesToDisplay.forEach((recipe) => {
      const elt = new Recipe(recipe);
      this.recipesView.appendChild(elt.createRecipeElement());
    });
  }
}
