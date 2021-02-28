import { initializeState } from "./datalogic";
import { initializeFilters } from "./filters";
import { manageSearchInput } from "./search";

import "../style/main.scss";

/**
 * Initialize the app
 */
initializeState();
initializeFilters();

/**
 * Add listener to the search bar
 */
const searchBarElt = document.getElementById("search-bar");
searchBarElt.addEventListener("input", manageSearchInput);
