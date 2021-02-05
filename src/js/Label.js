import Url from "./Url";

export default class Label {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.url = new Url();
    this.removeFilter = this.removeFilter.bind(this);
  }

  createLabel() {
    const elt = document.createElement("button");
    elt.className = `label ${this.type}`;
    elt.setAttribute("type", "button");
    const iconElt = document.createElement("span");
    iconElt.className = "far fa-times-circle";
    iconElt.addEventListener("click", this.removeFilter);
    elt.textContent = this.name;
    elt.appendChild(iconElt);

    return elt;
  }

  removeFilter(evt) {
    evt.preventDefault();
    const formattedName = this.name
      .replaceAll(" ", "_")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    let ingParams = this.url.getParamFromURL("ing");
    let appParams = this.url.getParamFromURL("app");
    let ustParams = this.url.getParamFromURL("ust");

    if (this.type === "ing")
      ingParams = ingParams.filter((elt) => elt !== formattedName);
    if (this.type === "app")
      appParams = appParams.filter((elt) => elt !== formattedName);
    if (this.type === "ust")
      ustParams = ustParams.filter((elt) => elt !== formattedName);

    this.url.addParamsToUrl(ingParams, appParams, ustParams);
    evt.target.parentNode.remove();
  }
}
