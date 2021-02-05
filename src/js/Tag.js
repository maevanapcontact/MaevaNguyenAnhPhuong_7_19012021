import LabelsView from "./LabelsView";
import Url from "./Url";

export default class Tag {
  constructor(type, name, formattedName) {
    this.name = name;
    this.type = type;
    this.formattedName = formattedName;
    this.labelsView = new LabelsView();
    this.url = new Url();
    this.addTagInURL = this.addTagInURL.bind(this);
  }

  createTagElt() {
    const liElt = document.createElement("li");
    const aElt = document.createElement("a");
    aElt.setAttribute("href", "/");
    aElt.setAttribute("title", this.name);
    aElt.className = "filter-tag";
    aElt.textContent = this.name;
    liElt.appendChild(aElt);
    liElt.addEventListener("click", this.addTagInURL);

    return liElt;
  }

  getParamFromURL(param) {
    return new URL(window.location.href).searchParams.getAll(param);
  }

  addTagInURL(evt) {
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
