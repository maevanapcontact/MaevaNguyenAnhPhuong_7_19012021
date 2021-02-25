import data from "./data";
import { getIngredientsStringFromRecipe } from "./datalogic";
import { normalizeText } from "./utils";
import {
  cleanFiltersList,
  getVisibleFilters,
  createFilterElt,
  fillFiltersWithInitialData,
  addTagsFilter,
} from "./filters";

const { recipes } = data;

/**
 * Manage the conditions for search algo
 * @param   {object} evt browser event
 * @returns {void}
 */
const manageSearchInput = (evt) => {
  evt.preventDefault();
  const value = evt.target.value;

  if (value.length > 2) searchRecipes();
  else {
    hideAllRecipes();
    fillFiltersWithInitialData();
  }
};

/**
 * Search for recipes including the given value
 * @param   {string} val the value of the search input
 * @returns {void}
 */
const searchRecipes = () => {
  const searchBarElt = document.getElementById("search-bar");
  const value = normalizeText(searchBarElt.value);
  cleanFiltersList();

  recipes.forEach((recipe) => {
    const recipeToDisplay = document.getElementById(recipe.id);
    if (
      normalizeText(recipe.name).includes(value) ||
      normalizeText(recipe.description).includes(value) ||
      getIngredientsStringFromRecipe(recipe).includes(value)
    ) {
      recipeToDisplay.style.display = "block";
      displayFiltersFromRecipes(recipe);
    } else {
      recipeToDisplay.style.display = "none";
    }
  });
  addTagsFilter();
};

/**
 * Hide all the recipes with CSS
 * @returns {void}
 */
const hideAllRecipes = () => {
  const recipeElts = document.querySelectorAll("#main-content article");
  recipeElts.forEach((elt) => (elt.style.display = "none"));
};

/**
 * Display all filters included in the displayed recipes
 * @param   {object} recipe the added recipe
 * @returns {void}
 */
const displayFiltersFromRecipes = (recipe) => {
  displayIngredientsFromRecipe(recipe);
  displayAppliancesFromRecipe(recipe);
  displayUstensilsFromRecipe(recipe);
};

/**
 * Display the ingredient filters included in the displayed recipes
 * @param   {object} recipe the added recipe
 * @returns {void}
 */
const displayIngredientsFromRecipe = (recipe) => {
  const ingListElt = document.getElementById("ing-filter-list").firstChild;
  const visibleIngFilters = getVisibleFilters("ing");

  recipe.ingredients.forEach((ing) => {
    if (!visibleIngFilters.includes(ing.ingredient.toLowerCase()))
      ingListElt.appendChild(
        createFilterElt("ing", ing.ingredient.toLowerCase())
      );
  });
};

/**
 * Display the appliance filters included in the displayed recipes
 * @param   {object} recipe the added recipe
 * @returns {void}
 */
const displayAppliancesFromRecipe = (recipe) => {
  const appListElt = document.getElementById("app-filter-list").firstChild;
  const visibleAppFilters = getVisibleFilters("app");

  if (!visibleAppFilters.includes(recipe.appliance.toLowerCase()))
    appListElt.appendChild(
      createFilterElt("app", recipe.appliance.toLowerCase())
    );
};

/**
 * Display the ustensil filters included in the displayed recipes
 * @param   {object} recipe the added recipe
 * @returns {void}
 */
const displayUstensilsFromRecipe = (recipe) => {
  const ustListElt = document.getElementById("ust-filter-list").firstChild;
  const visibleUstFilters = getVisibleFilters("ust");

  recipe.ustensils.forEach((ust) => {
    if (!visibleUstFilters.includes(ust.toLowerCase()))
      ustListElt.appendChild(createFilterElt("ust", ust.toLowerCase()));
  });
};

export { manageSearchInput, searchRecipes };
