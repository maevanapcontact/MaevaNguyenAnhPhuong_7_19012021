import state from "../data/globalState";
import DomManager from "../utils/DomManager";
import RecipesView from "../recipes/RecipesView";
import Url from "../utils/Url";

export default class Label extends DomManager {
  constructor(name, type) {
    super();
    this.name = name;
    this.type = type;
    this.url = new Url();
    this.recipesView = new RecipesView();
    this.removeFilter = this.removeFilter.bind(this);
  }

  createLabel() {
    const elt = this.createGenericElt("button", `label ${this.type}`);
    elt.setAttribute("type", "button");
    const iconElt = this.createGenericElt("span", "far fa-times-circle");
    iconElt.addEventListener("click", this.removeFilter);
    const originalName = this.getOriginalName(this.name, this.type);
    elt.textContent =
      originalName.charAt(0).toUpperCase() + originalName.slice(1);
    elt.appendChild(iconElt);

    return elt;
  }

  getOriginalName(param, type) {
    if (type === "ing")
      return state.globalState.allFormattedIngredients.find(
        (elt) => elt.formattedName === param
      ).name;
    if (type === "app")
      return state.globalState.allFormattedAppliances.find(
        (elt) => elt.formattedName === param
      ).name;
    if (type === "ust")
      return state.globalState.allFormattedUstensils.find(
        (elt) => elt.formattedName === param
      ).name;
  }

  removeFilter(evt) {
    evt.preventDefault();

    let ingParams = state.globalState.ingParams;
    let appParams = state.globalState.appParams;
    let ustParams = state.globalState.ustParams;

    if (this.type === "ing")
      ingParams = ingParams.filter((elt) => elt !== this.name);
    if (this.type === "app")
      appParams = appParams.filter((elt) => elt !== this.name);
    if (this.type === "ust")
      ustParams = ustParams.filter((elt) => elt !== this.name);

    this.url.addParamsToUrl(ingParams, appParams, ustParams);
    this.recipesView.displayRecipes();
    evt.target.parentNode.remove();
  }
}
