import state from "./state";
import { completeSearch } from "./search";
import { createGenericElt, createLinkElt, normalizeText } from "./utils";

import { createAllLabels } from "./labels";

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
const ingInputElt = document.getElementById("ing-input");
const appInputElt = document.getElementById("app-input");
const ustInputElt = document.getElementById("ust-input");

/**
 * Creates a single filter element
 * @param   {string} type ing, app or ust
 * @param   {string} name the filter's content
 * @returns {node}
 */
const createFilterElt = (type, name) => {
  const liElt = createGenericElt("li");
  const aElt = createLinkElt("/", name, "filter-tag");
  liElt.appendChild(aElt);
  liElt.addEventListener("click", addFilter(type, name));

  return liElt;
};

/**
 * add a filter onClick
 * @param   {string}    type  ing, app or ust
 * @param   {string}    name  the filter's name
 * @return  {void}
 */
const addFilter = (type, name) => {
  return function (evt) {
    evt.preventDefault();
    const formattedName = normalizeText(name);

    if (type === "ing") {
      if (!state.ingLabels.includes(formattedName))
        state.ingLabels.push(formattedName);
    }
    if (type === "app") {
      if (!state.appLabels.includes(formattedName))
        state.appLabels.push(formattedName);
    }
    if (type === "ust") {
      if (!state.ustLabels.includes(formattedName))
        state.ustLabels.push(formattedName);
    }
    putFiltersToInitialState();
    createAllLabels();
    completeSearch();
  };
};

/**
 * creates a list element with all filters of a type
 * @param   {array} list  list of filters to display
 * @return  {node}
 */
const createFiltersList = (listElt, list) => {
  listElt.innerHTML = "";
  list.forEach((elt) => {
    const liElt = createFilterElt(elt.type, elt.name);
    listElt.appendChild(liElt);
  });
};

/**
 * Fills the filters list with data from state
 * @returns {void}
 */
const fillAllFilterLists = () => {
  createFiltersList(ingFiltersListElt, state.displayedIng);
  createFiltersList(appFiltersListElt, state.displayedApp);
  createFiltersList(ustFiltersListElt, state.displayedUst);
};

/**
 * Display the initial filters
 * @returns {void}
 */
const initializeFilters = () => {
  fillAllFilterLists();
  ingBtnElt.addEventListener("click", toggleFilterList);
  appBtnElt.addEventListener("click", toggleFilterList);
  ustBtnElt.addEventListener("click", toggleFilterList);
  overlayElt.addEventListener("click", putFiltersToInitialState);

  ingInputElt.addEventListener("focus", scaleFilterUp);
  appInputElt.addEventListener("focus", scaleFilterUp);
  ustInputElt.addEventListener("focus", scaleFilterUp);

  ingInputElt.addEventListener("input", manageCompletion);
  appInputElt.addEventListener("input", manageCompletion);
  ustInputElt.addEventListener("input", manageCompletion);
};

/**
 * manage toggle of filter list
 * @param   {object}   evt  Browser Event
 * @return  {void}
 */
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

/**
 * close all filters
 * @return  {void}
 */
const closeAllFilterLists = () => {
  overlayElt.style.display = "none";

  ingFiltersListElt.parentNode.classList.remove("open");
  appFiltersListElt.parentNode.classList.remove("open");
  ustFiltersListElt.parentNode.classList.remove("open");

  ingBtnElt.className = "fas fa-chevron-down";
  appBtnElt.className = "fas fa-chevron-down";
  ustBtnElt.className = "fas fa-chevron-down";

  removeFilterInputsValue();
  resetTagsDisplay();
};

/**
 * scale the input filter up
 * @param   {object}   evt  Browser event
 * @return  {void}
 */
const scaleFilterUp = (evt) => {
  evt.preventDefault();
  scaleAllFiltersDown();
  const parentElt = evt.target.parentNode;
  parentElt.className += " scaled";
  openFilterList(parentElt.childNodes[3], parentElt.childNodes[2].id);
};

/**
 * open the filter list
 * @param   {node}    elt  the element to which the open class is added
 * @param   {string}  buttonId  the id of the button clicked
 * @return  {void}
 */
const openFilterList = (elt, buttonId) => {
  closeAllFilterLists();
  elt.className += " open";
  const buttonElt = document.getElementById(buttonId);
  buttonElt.className = "fas fa-chevron-up";
  overlayElt.style.display = "block";
};

/**
 * scale the input filter down
 * @return  {void}
 */
const scaleAllFiltersDown = () => {
  const filtersElts = document.querySelectorAll(".filters-elt");
  filtersElts.forEach((elt) => elt.classList.remove("scaled"));
};

/**
 * close all filters and scale them down
 * @return  {void}
 */
const putFiltersToInitialState = () => {
  closeAllFilterLists();
  scaleAllFiltersDown();
};

/**
 * Get the list of currently displayed filters
 * @param   {string} type ing, app or ust
 * @returns {array}
 */
const getVisibleFilters = (type) => {
  const listNodes = document.querySelectorAll(`#${type}-filter-list li a`);
  const listContentArray = Array.from(listNodes).map((elt) =>
    elt.textContent.toLowerCase()
  );
  return listContentArray;
};

/**
 * Clear the DOM filters
 * @returns {void}
 */
const clearAllFilters = () => {
  ingFiltersListElt.innerHTML = "";
  appFiltersListElt.innerHTML = "";
  ustFiltersListElt.innerHTML = "";
};

/**
 * Get the number of filters added (ing + app + ust)
 * @returns {number}
 */
const getAllFiltersLength = () => {
  const fullTagArray = state.ingLabels
    .concat(state.appLabels)
    .concat(state.ustLabels);
  return fullTagArray.length;
};

/**
 * Clear value in filters inputs
 * @returns {void}
 */
const removeFilterInputsValue = () => {
  ingInputElt.value = "";
  appInputElt.value = "";
  ustInputElt.value = "";
};

/**
 * autocompletion when typinh in filter's inputs
 * @returns {void}
 */
const manageCompletion = (evt) => {
  const idTarget = evt.target.parentNode.id;
  const formattedValue = normalizeText(evt.target.value);
  const allTags = document.querySelectorAll(`#${idTarget} li a`);

  allTags.forEach((tag) => {
    if (!tag.textContent.includes(formattedValue))
      tag.parentNode.style.display = "none";
    else tag.parentNode.style.display = "block";
  });
};

/**
 * Display all tags in the DOM
 * @returns {void}
 */
const resetTagsDisplay = () => {
  const allIngTags = document.querySelectorAll(`#ing-filter-list li`);
  const allAppTags = document.querySelectorAll(`#app-filter-list li`);
  const allUstTags = document.querySelectorAll(`#ust-filter-list li`);

  allIngTags.forEach((ing) => (ing.style.display = "block"));
  allAppTags.forEach((app) => (app.style.display = "block"));
  allUstTags.forEach((ust) => (ust.style.display = "block"));
};

export {
  initializeFilters,
  getVisibleFilters,
  createFilterElt,
  clearAllFilters,
  getAllFiltersLength,
};
