import data from "./data";
import { getIngredientsStringFromRecipe } from "./datalogic";
import { normalizeText } from "./utils";
import { cleanFiltersList } from "./filters";

const { recipes } = data;

/**
 * Manage the conditions for search algo
 * @param   {object} evt browser event
 * @returns {void}
 */
const manageSearchInput = (evt) => {
  evt.preventDefault();
  const value = evt.target.value;

  if (value.length > 2) searchRecipes(value);
  else hideAllRecipes();
};

/**
 * Search for recipes including the given value
 * @param   {string} val the value of the search input
 * @returns {void}
 */
const searchRecipes = (val) => {
  const value = normalizeText(val);
  cleanFiltersList();

  recipes.forEach((recipe) => {
    const recipeToDisplay = document.getElementById(recipe.id);
    if (
      normalizeText(recipe.name).includes(value) ||
      normalizeText(recipe.description).includes(value) ||
      getIngredientsStringFromRecipe(recipe).includes(value)
    ) {
      recipeToDisplay.style.display = "block";
    } else {
      recipeToDisplay.style.display = "none";
    }
  });
};

/**
 * Hide all the recipes with CSS
 * @returns {void}
 */
const hideAllRecipes = () => {
  const recipeElts = document.querySelectorAll("#main-content article");
  recipeElts.forEach((elt) => (elt.style.display = "none"));
};

export { manageSearchInput };
