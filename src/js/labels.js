import state from "./globalState";
import { fillRecipesFromFilters } from "./datalogic";
import { createGenericElt, normalizeText } from "./utils";

const labelsElt = document.getElementById("labels");
const { globalState } = state;

const createLabel = (type, name) => {
  const elt = createGenericElt("button", `label ${type}`);
  elt.setAttribute("type", "button");
  const iconElt = createGenericElt("span", "far fa-times-circle");
  iconElt.addEventListener("click", removeFilter(type, name));
  elt.textContent = name;
  elt.appendChild(iconElt);

  return elt;
};

const createLabels = (labelsList, type) => {
  const elt = document.createElement("div");
  labelsList.forEach((label) => {
    const labelElt = createLabel(type, label);
    elt.appendChild(labelElt);
  });
  return elt;
};

const createAllLabels = () => {
  labelsElt.innerHTML = "";
  labelsElt.appendChild(createLabels(globalState.activeIngFilters, "ing"));
  labelsElt.appendChild(createLabels(globalState.activeAppFilters, "app"));
  labelsElt.appendChild(createLabels(globalState.activeUstFilters, "ust"));
};

const removeFilter = (type, name) => {
  return function (evt) {
    evt.preventDefault();
    const formattedName = normalizeText(name);

    if (type === "ing")
      globalState.activeIngFilters = globalState.activeIngFilters.filter(
        (elt) => formattedName !== elt
      );
    if (type === "app")
      globalState.activeAppFilters = globalState.activeAppFilters.filter(
        (elt) => formattedName !== elt
      );
    if (type === "ust")
      globalState.activeUstFilters = globalState.activeUstFilters.filter(
        (elt) => formattedName !== elt
      );
    createAllLabels();
    fillRecipesFromFilters();
  };
};

export { createAllLabels };
