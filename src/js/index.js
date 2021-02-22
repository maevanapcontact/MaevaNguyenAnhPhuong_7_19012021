import {
  getIngredientsObject,
  getAppliancesObject,
  getUstensilsObject,
} from "./datalogic";
import { initializeRecipes } from "./recipes";
import { scaleFilterUp, initializeFilters } from "./filters";
import { manageSearchInput } from "./search";
import "../style/main.scss";

/**
 * DOM Variables
 */
const mainContentElt = document.getElementById("main-content");
const ingInputElt = document.getElementById("ing-input");
const appInputElt = document.getElementById("app-input");
const ustInputElt = document.getElementById("ust-input");
const searchBarElt = document.getElementById("search-bar");

/**
 * Display initial filters
 */
initializeFilters();
ingInputElt.addEventListener("focus", scaleFilterUp);
appInputElt.addEventListener("focus", scaleFilterUp);
ustInputElt.addEventListener("focus", scaleFilterUp);

/**
 * Display initial recipes
 */
initializeRecipes(mainContentElt);

/**
 * Runs the search function
 */
searchBarElt.addEventListener("input", manageSearchInput);

console.log(getIngredientsObject());
console.log(getAppliancesObject());
console.log(getUstensilsObject());
