import Filter from "./Filter";
import DataLogic from "./DataLogic";

export default class FiltersView {
  constructor() {
    this.filtersView = document.getElementById("filters");
    this.data = new DataLogic();
    this.ingredientsFilter = new Filter(
      "ingredients",
      "Ingrédients",
      this.data.getFormattedIngredients()
    );
    this.appliancesFilter = new Filter(
      "appliances",
      "Appareils",
      this.data.getFormattedAppliances()
    );
    this.ustensilsFilter = new Filter(
      "ustensils",
      "Ustensiles",
      this.data.getFormattedUstensils()
    );
  }

  displayAllFilters() {
    const ingredientsElt = this.ingredientsFilter.createFilterElement();
    const appliancesElt = this.appliancesFilter.createFilterElement();
    const ustensilsElt = this.ustensilsFilter.createFilterElement();

    this.filtersView.appendChild(ingredientsElt);
    this.filtersView.appendChild(appliancesElt);
    this.filtersView.appendChild(ustensilsElt);

    ingredientsElt.addEventListener("click", this.toggleFilterList);
    appliancesElt.addEventListener("click", this.toggleFilterList);
    ustensilsElt.addEventListener("click", this.toggleFilterList);
  }

  toggleFilterList(evt) {
    const ingredientsList = document.getElementById("ingredients-filter");
    const appliancesList = document.getElementById("appliances-filter");
    const ustensilsList = document.getElementById("ustensils-filter");

    const targetId = evt.target.id;
    if (evt.target.tagName === "SPAN") {
      evt.target.className =
        evt.target.className === "fas fa-chevron-down"
          ? "fas fa-chevron-up"
          : "fas fa-chevron-down";
    }
    if (targetId === "ingredients-btn")
      ingredientsList.classList.toggle("open");
    if (targetId === "appliances-btn") appliancesList.classList.toggle("open");
    if (targetId === "ustensils-btn") ustensilsList.classList.toggle("open");
  }
}
