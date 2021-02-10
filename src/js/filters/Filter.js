import DomManager from "../utils/DomManager";
import FiltersView from "./FiltersView";
import LabelsView from "../labels/LabelsView";
import RecipesView from "../recipes/RecipesView";
import Url from "../utils/Url";

export default class Filter extends DomManager {
  constructor(type, tag) {
    super();
    this.name = tag.name;
    this.formattedName = tag.formattedName;
    this.type = type;
    this.labelsView = new LabelsView();
    this.recipesView = new RecipesView();
    this.url = new Url();
    this.filtersView = new FiltersView();
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

    let ingParams = this.url.getParamFromURL("ing");
    let appParams = this.url.getParamFromURL("app");
    let ustParams = this.url.getParamFromURL("ust");

    if (this.type === "ingredients" && !ingParams.includes(this.formattedName))
      ingParams.push(this.formattedName);
    if (this.type === "appliances" && !appParams.includes(this.formattedName))
      appParams.push(this.formattedName);
    if (this.type === "ustensils" && !ustParams.includes(this.formattedName))
      ustParams.push(this.formattedName);

    this.url.addParamsToUrl(ingParams, appParams, ustParams);

    this.labelsView.displayAllLabels();
    this.recipesView.displayRecipesList();
    this.filtersView.closeAllFilterLists();
    this.filtersView.scaleAllFiltersDown();
  }
}
