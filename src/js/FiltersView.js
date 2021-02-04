import Filter from "./Filter";
import DataLogic from "./DataLogic";

export default class FiltersView {
  constructor() {
    this.filtersView = document.getElementById("filters");
    this.data = new DataLogic();
    this.ingredientsFilter = new Filter(
      "ingredient",
      "Ingrédients",
      this.data.getAllIngredients()
    );
    this.appliancesFilter = new Filter(
      "appliances",
      "Appareils",
      this.data.getAllApplicances()
    );
    this.ustensilsFilter = new Filter(
      "ustensils",
      "Ustensiles",
      this.data.getAllUstensils()
    );
  }

  displayAllFilters() {
    const ingredientsElt = this.ingredientsFilter.createFilterElement();
    const appliancesElt = this.appliancesFilter.createFilterElement();
    const ustensilsElt = this.ustensilsFilter.createFilterElement();

    this.filtersView.appendChild(ingredientsElt);
    this.filtersView.appendChild(appliancesElt);
    this.filtersView.appendChild(ustensilsElt);
  }
}
