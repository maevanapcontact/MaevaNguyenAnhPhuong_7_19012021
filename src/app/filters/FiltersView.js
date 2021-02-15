import state from "../data/globalState";
import Filters from "./Filters";
// import DataLogic from "../data/DataLogic";

export default class FiltersView {
  constructor() {
    this.filtersView = document.getElementById("filters");
    // this.data = new DataLogic();
    this.ingredientsFilter;
    this.appliancesFilter;
    this.ustensilsFilter;
    this.toggleFilterList = this.toggleFilterList.bind(this);
    this.openFilterList = this.openFilterList.bind(this);
    this.scaleFilterUp = this.scaleFilterUp.bind(this);
    // this.manageInputChange = this.manageInputChange.bind(this);
  }

  createAllFilters() {
    this.ingredientsFilter = new Filters(
      "ingredients",
      "Ingrédients",
      state.globalState.allFormattedIngredients
    );
    this.appliancesFilter = new Filters(
      "appliances",
      "Appareils",
      state.globalState.allFormattedAppliances
    );
    this.ustensilsFilter = new Filters(
      "ustensils",
      "Ustensiles",
      state.globalState.allFormattedUstensils
    );
  }

  displayAllFilters() {
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

    // ingredientsElt.firstElementChild.addEventListener(
    //   "input",
    //   this.manageInputChange
    // );
    // appliancesElt.firstElementChild.addEventListener(
    //   "input",
    //   this.manageInputChange
    // );
    // ustensilsElt.firstElementChild.addEventListener(
    //   "input",
    //   this.manageInputChange
    // );
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

  // manageIngInputChange(evt) {
  //   const inputValue = evt.target.value;
  //   const filtersList = document.querySelectorAll("#ingredients-filter a");
  //   let filtersToShow = filtersList.map((elt) =>
  //     elt.textContent.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  //   );
  //   const filtersList = document.querySelectorAll("#ingredients-filter a");
  //   console.log(filtersList);
  // }

  //   manageInputChange(evt) {
  //     console.log(this);
  //   }

  //   updateTagsListElt(id, filter, list) {
  //     const tagsElt = document.getElementById(id);
  //     tagsElt.innerHTML = "";
  //     const listElt = filter.createFiltersListElt(list);
  //     tagsElt.appendChild(listElt);

  //     return filter;
  //   }

  //   updateAllTagsLists(ingList, appList, ustList) {
  //     const newIngredientsFilter = this.updateTagsListElt(
  //       "ingredients-filter",
  //       this.ingredientsFilter,
  //       ingList
  //     );
  //     const newAppliancesFilter = this.updateTagsListElt(
  //       "appliances-filter",
  //       this.appliancesFilter,
  //       appList
  //     );
  //     const newUstensilsFilter = this.updateTagsListElt(
  //       "ustensils-filter",
  //       this.ustensilsFilter,
  //       ustList
  //     );

  //     console.log(this);
  //     console.log(newIngredientsFilter);

  //     this.ingredientsFilter = newIngredientsFilter;
  //     this.appliancesFilter = newAppliancesFilter;
  //     this.ustensilsFilter = newUstensilsFilter;
  //   }

  //   getIngredientsFilter() {
  //     return this.ingredientsFilter;
  //   }
}
