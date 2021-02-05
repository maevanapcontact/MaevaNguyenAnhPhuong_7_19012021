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
    this.labelsView.innerHTML = "";
    const ingredientsParams = this.getParamFromURL("ing");
    const appliancesParams = this.getParamFromURL("app");
    const ustensilsParams = this.getParamFromURL("ust");

    const ingredientsOriginalName = this.getLabelOriginalName(
      ingredientsParams,
      this.data.getAllIngredients
    );
    const appliancesOriginalName = this.getLabelOriginalName(
      appliancesParams,
      this.data.getAllApplicances
    );
    const ustensilsOriginalName = this.getLabelOriginalName(
      ustensilsParams,
      this.data.getAllUstensils
    );

    this.labelsView.appendChild(
      this.createLabels(ingredientsOriginalName, "ing")
    );
    this.labelsView.appendChild(
      this.createLabels(appliancesOriginalName, "app")
    );
    this.labelsView.appendChild(
      this.createLabels(ustensilsOriginalName, "ust")
    );
  }

  getLabelOriginalName(paramsArray, getTags) {
    const originalData = getTags();
    let originalNamesArray = [];
    originalData.forEach((elt) => {
      paramsArray.forEach((param) => {
        if (param === elt.formattedName) originalNamesArray.push(elt.name);
      });
    });
    return originalNamesArray;
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
