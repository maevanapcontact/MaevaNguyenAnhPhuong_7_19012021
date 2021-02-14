import RecipesView from "./recipes/RecipesView";

export default class Main {
  constructor() {
    this.recipesView = new RecipesView();
  }

  initialize() {
    this.recipesView.displayRecipes();
  }
}
