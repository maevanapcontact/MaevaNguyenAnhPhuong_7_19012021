import DataLogic from "./DataLogic";
import RecipesView from "./RecipesView";
import FiltersView from "./FiltersView";

export default class Main {
  constructor() {
    this.data = new DataLogic();
    this.recipesView = new RecipesView(this.data.getInitialData());
    this.filtersView = new FiltersView();
  }

  initialize() {
    this.displayRecipesList();
    this.displayFiltersElements();
  }

  displayRecipesList() {
    this.recipesView.displayRecipesList();
  }

  displayFiltersElements() {
    this.filtersView.displayAllFilters();
  }
}
