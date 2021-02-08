import LabelsView from "./LabelsView";
import Url from "./Url";

export default class Tag {
  constructor(type, tag) {
    this.name = tag.name;
    this.formattedName = tag.formattedName;
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
  }
}
