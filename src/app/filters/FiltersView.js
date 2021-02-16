import state from "../data/globalState";
import Filters from "./Filters";

export default class FiltersView {
  constructor() {
    this.filtersView = document.getElementById("filters");
    this.overlay = document.getElementById("overlay");
    this.ingredientsFilter;
    this.appliancesFilter;
    this.ustensilsFilter;
    this.toggleFilterList = this.toggleFilterList.bind(this);
    this.openFilterList = this.openFilterList.bind(this);
    this.scaleFilterUp = this.scaleFilterUp.bind(this);
    this.closeAllFilterLists = this.closeAllFilterLists.bind(this);
    this.putFiltersToInitialState = this.putFiltersToInitialState.bind(this);
    this.manageInputChange = this.manageInputChange.bind(this);
  }

  cleanFilters() {
    this.filtersView.innerHTML = "";
  }

  createAllFilters() {
    this.ingredientsFilter = new Filters(
      "ingredients",
      "Ingrédients",
      state.globalState.ingFiltersToDisplay
    );
    this.appliancesFilter = new Filters(
      "appliances",
      "Appareils",
      state.globalState.appFiltersToDisplay
    );
    this.ustensilsFilter = new Filters(
      "ustensils",
      "Ustensiles",
      state.globalState.ustFiltersToDisplay
    );
  }

  displayAllFilters() {
    this.cleanFilters();
    this.createAllFilters();
    const ingredientsElt = this.ingredientsFilter.createFilterElement();
    const appliancesElt = this.appliancesFilter.createFilterElement();
    const ustensilsElt = this.ustensilsFilter.createFilterElement();

    this.filtersView.appendChild(ingredientsElt);
    this.filtersView.appendChild(appliancesElt);
    this.filtersView.appendChild(ustensilsElt);

    ingredientsElt.addEventListener("click", this.toggleFilterList);
    appliancesElt.addEventListener("click", this.toggleFilterList);
    ustensilsElt.addEventListener("click", this.toggleFilterList);

    ingredientsElt.firstElementChild.addEventListener(
      "focus",
      this.scaleFilterUp
    );
    appliancesElt.firstElementChild.addEventListener(
      "focus",
      this.scaleFilterUp
    );
    ustensilsElt.firstElementChild.addEventListener(
      "focus",
      this.scaleFilterUp
    );

    this.overlay.addEventListener("click", this.putFiltersToInitialState);

    ingredientsElt.firstElementChild.addEventListener(
      "input",
      this.manageInputChange
    );
    appliancesElt.firstElementChild.addEventListener(
      "input",
      this.manageInputChange
    );
    ustensilsElt.firstElementChild.addEventListener(
      "input",
      this.manageInputChange
    );
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

    if (evt.target.className === "fas fa-chevron-down") {
      this.scaleFilterUp(evt);
      this.openFilterList(listElt, targetId);
    } else {
      this.closeAllFilterLists();
      this.scaleAllFiltersDown();
    }
  }

  openFilterList(elt, buttonId) {
    this.closeAllFilterLists();
    elt.className += " open";
    const buttonElt = document.getElementById(buttonId);
    buttonElt.className = "fas fa-chevron-up";
    this.overlay.style.display = "block";
  }

  closeAllFilterLists() {
    this.overlay.style.display = "none";
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

  putFiltersToInitialState() {
    this.closeAllFilterLists();
    this.scaleAllFiltersDown();
  }

  scaleFilterUp(evt) {
    evt.preventDefault();
    this.scaleAllFiltersDown();
    const parentElt = evt.target.parentNode;
    parentElt.className += " scaled";
    this.openFilterList(parentElt.childNodes[2], parentElt.childNodes[1].id);
  }

  scaleAllFiltersDown() {
    const filtersElts = document.querySelectorAll(".filters-elt");
    filtersElts.forEach((elt) => elt.classList.remove("scaled"));
  }

  manageInputChange(evt) {
    const targetValue = evt.target.value;
    const filtersList = this.getFiltersList(evt.target.placeholder);
    if (targetValue.length > 0) {
      filtersList.forEach((aElt) => {
        if (this.normalizeText(aElt.textContent).includes(targetValue))
          aElt.parentNode.style.display = "block";
        else aElt.parentNode.style.display = "none";
      });
    } else {
      filtersList.forEach((aElt) => (aElt.parentNode.style.display = "block"));
    }
  }

  normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  getFiltersList(filterType) {
    let listId = "";
    if (filterType === "Ingrédients") listId = "ingredients-filter";
    if (filterType === "Appareils") listId = "appliances-filter";
    if (filterType === "Ustensiles") listId = "ustensils-filter";

    return document.querySelectorAll(`#${listId} li a`);
  }
}
