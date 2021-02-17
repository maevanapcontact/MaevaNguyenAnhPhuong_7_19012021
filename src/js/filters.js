import state from "./globalState";
import { createGenericElt, createLinkElt } from "./utils";
import { createAllLabels } from "./labels";
import { normalizeText } from "./utils";

const { globalState } = state;

/**
 * DOM Variables
 */
const overlayElt = document.getElementById("overlay");
const ingFiltersListElt = document.getElementById("ing-filter-list");
const appFiltersListElt = document.getElementById("app-filter-list");
const ustFiltersListElt = document.getElementById("ust-filter-list");
const ingBtnElt = document.getElementById("ing-btn");
const appBtnElt = document.getElementById("app-btn");
const ustBtnElt = document.getElementById("ust-btn");

const fillFiltersList = (list) => {
  const ulElt = createGenericElt("ul");
  list.forEach((elt) => {
    const liElt = createGenericElt("li");
    const aElt = createLinkElt("/", elt.name, "filter-tag");
    liElt.appendChild(aElt);
    liElt.addEventListener("click", addFilter(elt.type, elt.name));
    ulElt.appendChild(liElt);
  });
  return ulElt;
};

const addFilter = (type, name) => {
  return function (evt) {
    evt.preventDefault();
    const formattedName = normalizeText(name);

    if (type === "ing") {
      if (!globalState.activeIngFilters.includes(formattedName))
        globalState.activeIngFilters.push(formattedName);
    }
    if (type === "app") {
      if (!globalState.activeAppFilters.includes(formattedName))
        globalState.activeAppFilters.push(formattedName);
    }
    if (type === "ust") {
      if (!globalState.activeUstFilters.includes(formattedName))
        globalState.activeUstFilters.push(formattedName);
    }
    createAllLabels();
    closeAllFilterLists();
    scaleAllFiltersDown();
  };
};

const toggleFilterList = (evt) => {
  evt.preventDefault();
  const targetId = evt.target.id;
  if (evt.target.tagName !== "SPAN") return;

  let listElt;
  if (targetId === "ing-btn") listElt = ingFiltersListElt;
  if (targetId === "app-btn") listElt = appFiltersListElt;
  if (targetId === "ust-btn") listElt = ustFiltersListElt;
  if (evt.target.className === "fas fa-chevron-down") {
    scaleFilterUp(evt);
  } else {
    closeAllFilterLists();
    scaleAllFiltersDown();
  }
};

const openFilterList = (elt, buttonId) => {
  closeAllFilterLists();
  elt.className += " open";
  const buttonElt = document.getElementById(buttonId);
  buttonElt.className = "fas fa-chevron-up";
  overlayElt.style.display = "block";
};

const closeAllFilterLists = () => {
  overlayElt.style.display = "none";

  ingFiltersListElt.classList.remove("open");
  appFiltersListElt.classList.remove("open");
  ustFiltersListElt.classList.remove("open");

  ingBtnElt.className = "fas fa-chevron-down";
  appBtnElt.className = "fas fa-chevron-down";
  ustBtnElt.className = "fas fa-chevron-down";
};

const scaleFilterUp = (evt) => {
  evt.preventDefault();
  scaleAllFiltersDown();
  const parentElt = evt.target.parentNode;
  parentElt.className += " scaled";
  openFilterList(parentElt.childNodes[3], parentElt.childNodes[2].id);
};

const scaleAllFiltersDown = () => {
  const filtersElts = document.querySelectorAll(".filters-elt");
  filtersElts.forEach((elt) => elt.classList.remove("scaled"));
};

const putFiltersToInitialState = () => {
  closeAllFilterLists();
  scaleAllFiltersDown();
};

export {
  fillFiltersList,
  toggleFilterList,
  putFiltersToInitialState,
  scaleFilterUp,
};
