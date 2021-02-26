import state from "./state";
import { initializeState } from "./datalogic";
import { initializeFilters } from "./filters";
import { initializeRecipes } from "./recipes";
import { manageSearchInput } from "./search";

import "../style/main.scss";

const searchBarElt = document.getElementById("search-bar");

initializeState();
initializeFilters();
initializeRecipes();

searchBarElt.addEventListener("input", manageSearchInput);

console.log(state);
