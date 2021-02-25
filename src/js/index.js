import state from "./state";
import { initializeState } from "./datalogic";
import { initializeFilters } from "./filters";
import { initializeRecipes } from "./recipes";

import "../style/main.scss";

initializeState();
initializeFilters();
initializeRecipes();

console.log(state);
