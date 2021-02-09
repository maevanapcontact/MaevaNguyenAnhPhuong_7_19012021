import DataLogic from "./DataLogic";
import FiltersView from "./FiltersView";
import Recipe from "./Recipe";
import Url from "./Url";

export default class RecipesView {
  constructor() {
    this.dataLogic = new DataLogic();
    this.url = new Url();
    this.filtersView = new FiltersView();
    this.recipesList = this.dataLogic.getInitialDataId();
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
      this.setRecipesList(this.dataLogic.getInitialDataId());
    else {
      let recipesList = [];
      const ingParam = this.url.getParamFromURL("ing");
      const appParam = this.url.getParamFromURL("app");
      const ustParam = this.url.getParamFromURL("ust");

      recipesList = this.getRecipesIdFromParam(ingParam, "ing", recipesList);
      recipesList = this.getRecipesIdFromParam(appParam, "app", recipesList);
      recipesList = this.getRecipesIdFromParam(ustParam, "ust", recipesList);

      this.setRecipesList(recipesList);
    }
  }

  getRecipesIdFromParam(params, type, initialArray) {
    if (params.length === 0) return initialArray;

    let tagObj = {};
    let newArray = initialArray;
    if (type === "ing") tagObj = this.dataLogic.getIngredientsObject();
    if (type === "app") tagObj = this.dataLogic.getAppliancesObject();
    if (type === "ust") tagObj = this.dataLogic.getUstensilsObject();

    params.forEach((param) => {
      if (newArray.length === 0) newArray = tagObj[param];
      else {
        newArray = newArray.filter((elt) => {
          if (tagObj[param].includes(elt)) return true;
          else return false;
        });
      }
    });
    return newArray;
  }

  getFullRecipesFromId() {
    let fullRecipes = this.dataLogic.getInitialData();
    fullRecipes = fullRecipes.filter((recipe) => {
      if (this.recipesList.includes(recipe.id)) return true;
      else return false;
    });
    return fullRecipes;
  }

  getIngTagsFromRecipes() {
    const ingredients = this.dataLogic.getIngredients(
      this.getFullRecipesFromId()
    );
    return this.dataLogic.createFormattedNameArray(ingredients);
  }

  getAppTagsFromRecipes() {
    const appliances = this.dataLogic.getAppliances(
      this.getFullRecipesFromId()
    );
    return this.dataLogic.createFormattedNameArray(appliances);
  }

  getUstTagsFromRecipes() {
    const ustensils = this.dataLogic.getUstensils(this.getFullRecipesFromId());
    return this.dataLogic.createFormattedNameArray(ustensils);
  }

  updateAllTagsFromRecipes() {
    const ingTags = this.getIngTagsFromRecipes();
    const appTags = this.getAppTagsFromRecipes();
    const ustTags = this.getUstTagsFromRecipes();

    this.filtersView.updateAllTagsLists(ingTags, appTags, ustTags);
  }

  displayRecipesList() {
    this.cleanRecipesView();
    this.setRecipesListFromUrlParams();
    const recipesToDisplay = this.getFullRecipesFromId();
    recipesToDisplay.forEach((recipe) => {
      const elt = new Recipe(recipe);
      this.recipesView.appendChild(elt.createRecipeElement());
    });
    this.updateAllTagsFromRecipes();
  }
}
