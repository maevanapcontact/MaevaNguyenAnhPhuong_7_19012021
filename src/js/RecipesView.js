import Recipe from "./Recipe";

export default class RecipesView {
  constructor(data) {
    this.recipesView = document.getElementById("main-content");
    this.recipesList = data;
  }

  displayRecipesList() {
    this.recipesView.innerHTML = "";
    this.recipesList.forEach((recipe) => {
      const elt = new Recipe(recipe);
      this.recipesView.appendChild(elt.createRecipeElement());
    });
  }
}
