import LabelsView from "./LabelsView";
import Url from "./Url";

export default class Tag {
  constructor(type, name) {
    this.name = name;
    this.type = type;
    this.labelsView = new LabelsView();
    this.url = new Url();
    this.addClickedTag = this.addClickedTag.bind(this);
  }

  createTagElt() {
    const liElt = document.createElement("li");
    const aElt = document.createElement("a");
    aElt.setAttribute("href", "/");
    aElt.setAttribute("title", this.name);
    aElt.className = "filter-tag";
    aElt.textContent = this.name;
    liElt.appendChild(aElt);
    liElt.addEventListener("click", this.addClickedTag);

    return liElt;
  }

  addClickedTag(evt) {
    evt.preventDefault();
    const formattedName = this.name
      .replaceAll(" ", "_")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    let ingParams = this.url.getParamFromURL("ing");
    let appParams = this.url.getParamFromURL("app");
    let ustParams = this.url.getParamFromURL("ust");

    if (this.type === "ingredients" && !ingParams.includes(formattedName))
      ingParams.push(formattedName);
    if (this.type === "appliances" && !appParams.includes(formattedName))
      appParams.push(formattedName);
    if (this.type === "ustensils" && !ustParams.includes(formattedName))
      ustParams.push(formattedName);

    this.url.addParamsToUrl(ingParams, appParams, ustParams);

    this.labelsView.displayAllLabels();
  }
}
