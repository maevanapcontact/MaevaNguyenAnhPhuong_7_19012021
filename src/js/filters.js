import { createGenericElt, createLinkElt } from "./utils";

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
    const aElt = createLinkElt("/", elt, "filter-tag");
    liElt.appendChild(aElt);
    ulElt.appendChild(liElt);
  });
  return ulElt;
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
