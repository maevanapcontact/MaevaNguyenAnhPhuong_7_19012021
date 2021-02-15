import DataLogic from "./data/DataLogic";
import RecipesView from "./recipes/RecipesView";
import state from "./data/globalState";

export default class Main {
  constructor() {
    this.dataLogic = new DataLogic();
    this.recipesView = new RecipesView();
  }

  initialize() {
    this.populateInitialGlobalState();
    this.recipesView.displayRecipes();
    console.log(state.globalState);
  }

  populateInitialGlobalState() {
    this.dataLogic.setAllIngredients();
    this.dataLogic.setAllAppliances();
    this.dataLogic.setAllUstensils();
    this.dataLogic.setFormattedIngredients();
    this.dataLogic.setFormattedAppliances();
    this.dataLogic.setFormattedUstensils();
    this.dataLogic.setIngredientsObject();
    this.dataLogic.setAppliancesObject();
    this.dataLogic.setUstensilsObject();
  }
}
