import data from "./data";
import RecipesView from "./RecipesView";

export default class Main {
  constructor() {
    this.recipesView = new RecipesView(data.recipes);
  }

  initialize() {
    this.displayRecipesList();
  }

  displayRecipesList() {
    this.recipesView.displayRecipesList();
  }
}
