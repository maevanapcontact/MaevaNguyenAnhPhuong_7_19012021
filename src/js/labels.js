import state from "./state";
import { completeSearch } from "./search";
import { createGenericElt, normalizeText } from "./utils";

/**
 * Dom Variables
 */
const labelsElt = document.getElementById("labels");

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
  labelsElt.appendChild(createLabels(state.ingLabels, "ing"));
  labelsElt.appendChild(createLabels(state.appLabels, "app"));
  labelsElt.appendChild(createLabels(state.ustLabels, "ust"));
};

/**
 * Remove a label
 * @param   {string}  type  ing, app or ust
 * @param   {string}  name  the label's name
 * @return  {node}
 */
const removeFilter = (type, name) => {
  return function (evt) {
    evt.preventDefault();
    const formattedName = normalizeText(name);

    if (type === "ing")
      state.ingLabels = state.ingLabels.filter((elt) => formattedName !== elt);
    if (type === "app")
      state.appLabels = state.appLabels.filter((elt) => formattedName !== elt);
    if (type === "ust")
      state.ustLabels = state.ustLabels.filter((elt) => formattedName !== elt);
    createAllLabels();
    completeSearch();
  };
};

export { createAllLabels };
