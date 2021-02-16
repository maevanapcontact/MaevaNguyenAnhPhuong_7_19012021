import state from "../data/globalState";
import LabelsView from "../labels/LabelsView";
import RecipesView from "../recipes/RecipesView";
import DomManager from "../utils/DomManager";
import Url from "../utils/Url";
import FiltersView from "./FiltersView";

export default class Filter extends DomManager {
  constructor(type, tag) {
    super();
    this.name = tag.name;
    this.formattedName = tag.formattedName;
    this.type = type;
    this.url = new Url();
    this.filtersView = new FiltersView();
    this.labelsView = new LabelsView();
    this.recipesView = new RecipesView();
    this.addClickedFilter = this.addClickedFilter.bind(this);
  }

  createFilterElt() {
    const liElt = this.createGenericElt("li");
    const aElt = this.createLinkElt("/", this.name, "filter-tag");
    liElt.appendChild(aElt);
    liElt.addEventListener("click", this.addClickedFilter);

    return liElt;
  }

  addClickedFilter(evt) {
    evt.preventDefault();

    let ingParams = state.globalState.ingParams;
    let appParams = state.globalState.appParams;
    let ustParams = state.globalState.ustParams;

    if (this.type === "ingredients" && !ingParams.includes(this.formattedName))
      ingParams.push(this.formattedName);
    if (this.type === "appliances" && !appParams.includes(this.formattedName))
      appParams.push(this.formattedName);
    if (this.type === "ustensils" && !ustParams.includes(this.formattedName))
      ustParams.push(this.formattedName);

    this.url.addParamsToUrl(ingParams, appParams, ustParams);

    this.labelsView.displayAllLabels();
    this.recipesView.displayRecipes();
    this.filtersView.closeAllFilterLists();
    this.filtersView.scaleAllFiltersDown();
  }
}
