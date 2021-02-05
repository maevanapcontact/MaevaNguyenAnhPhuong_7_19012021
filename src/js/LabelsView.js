import DataLogic from "./DataLogic";
import Label from "./Label";

export default class LabelsView {
  constructor() {
    this.labelsView = document.getElementById("labels");
    this.data = new DataLogic();
  }

  getParamFromURL(param) {
    return new URL(window.location.href).searchParams.getAll(param);
  }

  displayAllLabels() {
    const ingredientsParams = this.getParamFromURL("ing");
    const appliancesParams = this.getParamFromURL("app");
    const ustensilsParams = this.getParamFromURL("ust");

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
