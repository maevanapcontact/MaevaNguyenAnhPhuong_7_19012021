import LabelsView from "./LabelsView";

export default class Tag {
  constructor(type, name, formattedName) {
    this.name = name;
    this.type = type;
    this.formattedName = formattedName;
    this.labelsView = new LabelsView();
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
    let formattedTag = this.formattedName;
    let url = window.location.href;
    let currentParamName = "";

    if (this.type === "ingredients") currentParamName = "ing";
    if (this.type === "appliances") currentParamName = "app";
    if (this.type === "ustensils") currentParamName = "ust";

    const ingParams = this.getParamFromURL("ing");
    const appParams = this.getParamFromURL("app");
    const ustParams = this.getParamFromURL("ust");
    const currentParams = this.getParamFromURL(currentParamName);

    if (currentParams.includes(formattedTag)) return;
    else {
      if (
        ingParams.length === 0 &&
        appParams.length === 0 &&
        ustParams.length === 0
      ) {
        if (url.includes("index.html?"))
          url += `${currentParamName}=${formattedTag}`;
        else url += `?${currentParamName}=${formattedTag}`;
      } else {
        url += `&${currentParamName}=${formattedTag}`;
      }
    }
    window.history.pushState({}, "", url);
    this.labelsView.displayAllLabels();
  }
}
