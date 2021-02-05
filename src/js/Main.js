import DataLogic from "./DataLogic";
import RecipesView from "./RecipesView";
import FiltersView from "./FiltersView";
import LabelsView from "./LabelsView";

export default class Main {
  constructor() {
    this.data = new DataLogic();
    this.recipesView = new RecipesView(this.data.getInitialData());
    this.filtersView = new FiltersView();
    this.labelsView = new LabelsView();
  }

  initialize() {
    this.displayRecipesList();
    this.displayFiltersElements();
    this.displayLabelsElements();
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
