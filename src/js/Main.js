import data from "./data";
import Recipe from "./Recipe";

const mainContent = document.getElementById("main-content");

export default class Main {
  initialize() {
    this.createsListOfRecipes();
  }

  createsListOfRecipes() {
    data.recipes.forEach((recipe) => {
      const elt = new Recipe(recipe);
      mainContent.appendChild(elt.createsRecipeElement());
    });
  }
}
