import DataLogic from "../data/DataLogic";
import state from "../data/globalState";
import FiltersView from "../filters/FiltersView";
import Recipe from "./Recipe";

export default class RecipesView {
  constructor() {
    this.data = new DataLogic();
    this.filtersView = new FiltersView();
    this.recipesView = document.getElementById("main-content");
  }

  cleanRecipesView() {
    this.recipesView.innerHTML = "";
  }

  setRecipesListFromUrlParams() {
    if (
      state.globalState.ingParams.length === 0 &&
      state.globalState.appParams.length === 0 &&
      state.globalState.ustParams.length === 0
    )
      state.globalState.recipesToDisplay = state.globalState.recipeIds;
    else {
      let recipesList = [];
      const ingParam = state.globalState.ingParams;
      const appParam = state.globalState.appParams;
      const ustParam = state.globalState.ustParams;

      recipesList = this.getRecipesIdFromParam(ingParam, "ing", recipesList);
      recipesList = this.getRecipesIdFromParam(appParam, "app", recipesList);
      recipesList = this.getRecipesIdFromParam(ustParam, "ust", recipesList);

      state.globalState.recipesToDisplay = recipesList;
    }
  }

  getRecipesIdFromParam(params, type, initialArray) {
    if (params.length === 0) return initialArray;

    let tagObj = {};
    let newArray = initialArray;
    if (type === "ing") tagObj = state.globalState.ingredientsObject;
    if (type === "app") tagObj = state.globalState.appliancesObject;
    if (type === "ust") tagObj = state.globalState.ustensilsObject;

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
    let fullRecipes = state.globalState.initialData;
    fullRecipes = fullRecipes.filter((recipe) => {
      if (state.globalState.recipesToDisplay.includes(recipe.id)) return true;
      else return false;
    });
    return fullRecipes;
  }

  setIngFiltersToDisplay() {
    const displayedRecipes = this.getFullRecipesFromId();
    let ingToDisplay = [];
    displayedRecipes.forEach((recipe) => {
      recipe.ingredients.forEach((ing) => {
        if (!ingToDisplay.includes(ing.ingredient.toLowerCase()))
          ingToDisplay.push(ing.ingredient.toLowerCase());
      });
    });

    state.globalState.ingFiltersToDisplay = this.data.createFormattedNameArray(
      ingToDisplay
    );
  }

  setAppFiltersToDisplay() {
    const displayedRecipes = this.getFullRecipesFromId();
    let appToDisplay = [];
    displayedRecipes.forEach((recipe) => {
      if (!appToDisplay.includes(recipe.appliance.toLowerCase()))
        appToDisplay.push(recipe.appliance.toLowerCase());
    });

    state.globalState.appFiltersToDisplay = this.data.createFormattedNameArray(
      appToDisplay
    );
  }

  setUstFiltersToDisplay() {
    const displayedRecipes = this.getFullRecipesFromId();
    let ustToDisplay = [];
    displayedRecipes.forEach((recipe) => {
      recipe.ustensils.forEach((ust) => {
        if (!ustToDisplay.includes(ust.toLowerCase()))
          ustToDisplay.push(ust.toLowerCase());
      });
    });

    state.globalState.ustFiltersToDisplay = this.data.createFormattedNameArray(
      ustToDisplay
    );
  }

  setAllFiltersToDisplay() {
    this.setIngFiltersToDisplay();
    this.setAppFiltersToDisplay();
    this.setUstFiltersToDisplay();
  }

  displayRecipes() {
    this.cleanRecipesView();
    this.setRecipesListFromUrlParams();
    const recipesToDisplay = this.getFullRecipesFromId();
    recipesToDisplay.forEach((recipe) => {
      const elt = new Recipe(recipe);
      this.recipesView.appendChild(elt.createRecipeElement());
    });
    this.setAllFiltersToDisplay();
    this.filtersView.displayAllFilters();
  }
}
