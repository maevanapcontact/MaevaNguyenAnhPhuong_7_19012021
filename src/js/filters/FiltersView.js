import Filters from "./Filters";
import DataLogic from "../utils/DataLogic";

export default class FiltersView {
  constructor() {
    this.filtersView = document.getElementById("filters");
    this.data = new DataLogic();
    this.ingredientsFilter = new Filters(
      "ingredients",
      "Ingrédients",
      this.data.getFormattedIngredients()
    );
    this.appliancesFilter = new Filters(
      "appliances",
      "Appareils",
      this.data.getFormattedAppliances()
    );
    this.ustensilsFilter = new Filters(
      "ustensils",
      "Ustensiles",
      this.data.getFormattedUstensils()
    );
    this.toggleFilterList = this.toggleFilterList.bind(this);
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
    evt.preventDefault();
    const targetId = evt.target.id;
    if (evt.target.tagName !== "SPAN") return;

    let listElt;
    if (targetId === "ingredients-btn")
      listElt = document.getElementById("ingredients-filter");
    if (targetId === "appliances-btn")
      listElt = document.getElementById("appliances-filter");
    if (targetId === "ustensils-btn")
      listElt = document.getElementById("ustensils-filter");

    if (evt.target.className === "fas fa-chevron-down")
      this.openFilterList(listElt, targetId);
    else this.closeAllFilterLists();
  }

  openFilterList(elt, buttonId) {
    this.closeAllFilterLists();
    elt.className += " open";
    const buttonElt = document.getElementById(buttonId);
    buttonElt.className = "fas fa-chevron-up";
  }

  closeAllFilterLists() {
    const ingredientsListElt = document.getElementById("ingredients-filter");
    const appliancesListElt = document.getElementById("appliances-filter");
    const ustensilsListElt = document.getElementById("ustensils-filter");
    ingredientsListElt.classList.remove("open");
    appliancesListElt.classList.remove("open");
    ustensilsListElt.classList.remove("open");

    const ingredientsListBtn = document.getElementById("ingredients-btn");
    const appliancesListBtn = document.getElementById("appliances-btn");
    const ustensilsListBtn = document.getElementById("ustensils-btn");
    ingredientsListBtn.className = "fas fa-chevron-down";
    appliancesListBtn.className = "fas fa-chevron-down";
    ustensilsListBtn.className = "fas fa-chevron-down";
  }

  updateTagsListElt(id, filter, list) {
    const tagsElt = document.getElementById(id);
    tagsElt.innerHTML = "";
    const listElt = filter.createFiltersListElt(list);
    tagsElt.appendChild(listElt);
  }

  updateAllTagsLists(ingList, appList, ustList) {
    this.updateTagsListElt(
      "ingredients-filter",
      this.ingredientsFilter,
      ingList
    );
    this.updateTagsListElt("appliances-filter", this.appliancesFilter, appList);
    this.updateTagsListElt("ustensils-filter", this.ustensilsFilter, ustList);
  }
}
