import DataLogic from "./data/DataLogic";
import state from "./data/globalState";
import FiltersView from "./filters/FiltersView";
import LabelsView from "./labels/LabelsView";
import RecipesView from "./recipes/RecipesView";
import Url from "./utils/Url";

export default class Main {
  constructor() {
    this.dataLogic = new DataLogic();
    this.recipesView = new RecipesView();
    this.filtersView = new FiltersView();
    this.labelsView = new LabelsView();
    this.url = new Url();
  }

  initialize() {
    this.populateInitialGlobalState();
    this.recipesView.displayRecipes();
    this.filtersView.displayAllFilters();
    this.labelsView.displayAllLabels();
    console.log(state.globalState);
  }

  populateInitialGlobalState() {
    this.dataLogic.setAllRecipeIds();
    this.dataLogic.setAllIngredients();
    this.dataLogic.setAllAppliances();
    this.dataLogic.setAllUstensils();
    this.dataLogic.setFormattedIngredients();
    this.dataLogic.setFormattedAppliances();
    this.dataLogic.setFormattedUstensils();
    this.dataLogic.setIngredientsObject();
    this.dataLogic.setAppliancesObject();
    this.dataLogic.setUstensilsObject();

    this.url.setAllParams();
  }
}
