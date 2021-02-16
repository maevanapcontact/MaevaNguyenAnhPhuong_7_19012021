import state from "../data/globalState";
import Label from "./Label";
import Url from "../utils/Url";

export default class LabelsView {
  constructor() {
    this.labelsView = document.getElementById("labels");
    this.url = new Url();
  }

  displayAllLabels() {
    this.labelsView.innerHTML = "";
    const ingredientsParams = state.globalState.ingParams;
    const appliancesParams = state.globalState.appParams;
    const ustensilsParams = state.globalState.ustParams;

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
