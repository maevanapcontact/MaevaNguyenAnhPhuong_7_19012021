import DataLogic from "./DataLogic";
import RecipesView from "./RecipesView";
import Url from "./Url";

export default class Label {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.url = new Url();
    this.data = new DataLogic();
    this.recipesView = new RecipesView();
    this.removeFilter = this.removeFilter.bind(this);
  }

  createLabel() {
    const elt = document.createElement("button");
    elt.className = `label ${this.type}`;
    elt.setAttribute("type", "button");
    const iconElt = document.createElement("span");
    iconElt.className = "far fa-times-circle";
    iconElt.addEventListener("click", this.removeFilter);
    const originalName = this.getOriginalName(this.name, this.type);
    elt.textContent =
      originalName.charAt(0).toUpperCase() + originalName.slice(1);
    elt.appendChild(iconElt);

    return elt;
  }

  getOriginalName(param, type) {
    if (type === "ing")
      return this.data
        .getFormattedIngredients()
        .find((elt) => elt.formattedName === param).name;
    if (type === "app")
      return this.data
        .getFormattedAppliances()
        .find((elt) => elt.formattedName === param).name;
    if (type === "ust")
      return this.data
        .getFormattedUstensils()
        .find((elt) => elt.formattedName === param).name;
  }

  removeFilter(evt) {
    evt.preventDefault();

    let ingParams = this.url.getParamFromURL("ing");
    let appParams = this.url.getParamFromURL("app");
    let ustParams = this.url.getParamFromURL("ust");

    if (this.type === "ing")
      ingParams = ingParams.filter((elt) => elt !== this.name);
    if (this.type === "app")
      appParams = appParams.filter((elt) => elt !== this.name);
    if (this.type === "ust")
      ustParams = ustParams.filter((elt) => elt !== this.name);

    this.url.addParamsToUrl(ingParams, appParams, ustParams);
    this.recipesView.displayRecipesList();
    evt.target.parentNode.remove();
  }
}
