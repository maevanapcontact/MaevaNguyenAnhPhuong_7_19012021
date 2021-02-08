import Label from "./Label";
import Url from "./Url";

export default class LabelsView {
  constructor() {
    this.labelsView = document.getElementById("labels");
    this.url = new Url();
  }

  displayAllLabels() {
    this.labelsView.innerHTML = "";
    const ingredientsParams = this.url.getParamFromURL("ing");
    const appliancesParams = this.url.getParamFromURL("app");
    const ustensilsParams = this.url.getParamFromURL("ust");

    this.labelsView.appendChild(this.createLabels(ingredientsParams, "ing"));
    this.labelsView.appendChild(this.createLabels(appliancesParams, "app"));
    this.labelsView.appendChild(this.createLabels(ustensilsParams, "ust"));
  }

  createLabels(labelsList, type) {
    const elt = document.createElement("div");
    labelsList.forEach((label) => {
      const labelElt = new Label(label, type);
      elt.appendChild(labelElt.createLabel());
    });
    return elt;
  }
}
