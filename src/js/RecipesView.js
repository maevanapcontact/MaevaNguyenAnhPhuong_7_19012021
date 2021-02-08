import DataLogic from "./DataLogic";
import Recipe from "./Recipe";
import Url from "./Url";

export default class RecipesView {
  constructor() {
    this.dataLogic = new DataLogic();
    this.url = new Url();
    this.recipesList = this.dataLogic.getInitialData();
    this.recipesView = document.getElementById("main-content");
  }

  cleanRecipesView() {
    this.recipesView.innerHTML = "";
  }

  setRecipesList(list) {
    this.recipesList = list;
  }

  setRecipesListFromUrlParams() {
    if (this.url.getAllParamsFromUrl().length === 0)
      this.setRecipesList(this.dataLogic.getInitialData());
    else {
      const ingParam = this.url.getParamFromURL("ing");
      const appParam = this.url.getParamFromURL("app");
      const ustParam = this.url.getParamFromURL("ust");

      this.getRecipesFromParam(ingParam, "ing");
      this.getRecipesFromParam(appParam, "app");
      this.getRecipesFromParam(ustParam, "ust");
    }
  }

  getRecipesFromParam(params, type) {
    let tagObj = {};
    if (type === "ing") tagObj = this.dataLogic.getIngredientsObject();
    if (type === "app") tagObj = this.dataLogic.getAppliancesObject();
    if (type === "ust") tagObj = this.dataLogic.getUstensilsObject();

    console.log(tagObj[params[0]]);
  }

  displayRecipesList() {
    this.cleanRecipesView();
    this.recipesList.forEach((recipe) => {
      const elt = new Recipe(recipe);
      this.recipesView.appendChild(elt.createRecipeElement());
    });
    this.setRecipesListFromUrlParams();
  }
}
