import RecipesView from "./recipes/RecipesView";
import FiltersView from "./filters/FiltersView";
import LabelsView from "./labels/LabelsView";

export default class Main {
  constructor() {
    this.recipesView = new RecipesView();
    this.filtersView = new FiltersView();
    this.labelsView = new LabelsView();
  }

  initialize() {
    this.displayFiltersElements();
    this.displayLabelsElements();
    this.displayRecipesList();
  }

  displayRecipesList() {
    this.recipesView.displayRecipesList();
  }

  displayFiltersElements() {
    this.filtersView.displayAllFilters();
  }

  displayLabelsElements() {
    this.labelsView.displayAllLabels();
  }
}
