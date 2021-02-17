import data from "./data";
import {
  getAllIngredients,
  getAllAppliances,
  getAllUstensils,
} from "./datalogic";
import { createRecipeElement } from "./recipes";
import {
  fillFiltersList,
  toggleFilterList,
  putFiltersToInitialState,
  scaleFilterUp,
} from "./filters";
import "../style/main.scss";

/**
 * DOM Variables
 */
const mainContentElt = document.getElementById("main-content");
const ingFiltersListElt = document.getElementById("ing-filter-list");
const appFiltersListElt = document.getElementById("app-filter-list");
const ustFiltersListElt = document.getElementById("ust-filter-list");
const ingBtnElt = document.getElementById("ing-btn");
const appBtnElt = document.getElementById("app-btn");
const ustBtnElt = document.getElementById("ust-btn");
const ingInputElt = document.getElementById("ing-input");
const appInputElt = document.getElementById("app-input");
const ustInputElt = document.getElementById("ust-input");
const overlayElt = document.getElementById("overlay");

/**
 * Display initial filters
 */
ingFiltersListElt.appendChild(fillFiltersList(getAllIngredients()));
appFiltersListElt.appendChild(fillFiltersList(getAllAppliances()));
ustFiltersListElt.appendChild(fillFiltersList(getAllUstensils()));
ingBtnElt.addEventListener("click", toggleFilterList);
appBtnElt.addEventListener("click", toggleFilterList);
ustBtnElt.addEventListener("click", toggleFilterList);
overlayElt.addEventListener("click", putFiltersToInitialState);
ingInputElt.addEventListener("focus", scaleFilterUp);
appInputElt.addEventListener("focus", scaleFilterUp);
ustInputElt.addEventListener("focus", scaleFilterUp);

/**
 * Display initial recipes
 */
data.recipes.forEach((recipe) =>
  mainContentElt.appendChild(createRecipeElement(recipe))
);
