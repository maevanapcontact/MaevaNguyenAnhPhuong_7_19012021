import state from "./globalState";
import { manageFilters } from "./datalogic";
import { createGenericElt, normalizeText } from "./utils";
import { addTagsFilter } from "./filters";

const labelsElt = document.getElementById("labels");
const { globalState } = state;

/**
 * creates a single label element
 * @param   {string}   type  ing, app or ust
 * @param   {string}   name  the label's name
 * @return  {node}
 */
const createLabel = (type, name) => {
  const elt = createGenericElt("button", `label ${type}`);
  elt.setAttribute("type", "button");
  const iconElt = createGenericElt("span", "far fa-times-circle");
  iconElt.addEventListener("click", removeFilter(type, name));
  elt.textContent = name;
  elt.appendChild(iconElt);

  return elt;
};

/**
 * create all the labels of a type
 * @param   {array}   labelsList  the list of labels to create
 * @param   {string}  type  ing, app or ust
 * @return  {node}
 */
const createLabels = (labelsList, type) => {
  const elt = document.createElement("div");
  labelsList.forEach((label) => {
    const labelElt = createLabel(type, label);
    elt.appendChild(labelElt);
  });
  return elt;
};

/**
 * create the labels of all types
 * @return  {void}
 */
const createAllLabels = () => {
  labelsElt.innerHTML = "";
  labelsElt.appendChild(createLabels(globalState.activeIngFilters, "ing"));
  labelsElt.appendChild(createLabels(globalState.activeAppFilters, "app"));
  labelsElt.appendChild(createLabels(globalState.activeUstFilters, "ust"));
};

/**
 * create all the labels of a type
 * @param   {string}  type  ing, app or ust
 * @param   {string}  name  the label's name
 * @return  {node}
 */
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
    manageFilters();
    addTagsFilter();
  };
};

export { createAllLabels };
