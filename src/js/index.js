import "../scss/main.scss";
import { createRecipes } from "./recipes";
import { fillAllFilters } from "./filters";
import { manageFilterLists } from "./ui";

createRecipes();
fillAllFilters();
manageFilterLists();
