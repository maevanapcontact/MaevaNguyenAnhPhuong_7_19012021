import GlobalState from "../data/GlobalState";
import Recipe from "./Recipe";

export default class RecipesView {
  constructor() {
    this.globalState = new GlobalState();
    this.recipesView = document.getElementById("main-content");
  }

  displayRecipes() {
    const recipesToDisplay = this.globalState.getRecipesToDisplay();
    recipesToDisplay.forEach((recipe) => {
      const elt = new Recipe(recipe);
      this.recipesView.appendChild(elt.createRecipeElement());
    });
  }
}
