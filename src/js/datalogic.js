import data from "./data";
import state from "./state";

/**
 * Get a list of all ingredients from all recipes
 * @return  {array}    the list of ingredients
 */
const getAllIngredients = () => {
  let ingredients = [];
  data.recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) => {
      if (!ingredients.includes(ing.ingredient.toLowerCase()))
        ingredients.push(ing.ingredient.toLowerCase());
    });
  });
  return ingredients.map((ing) => ({
    type: "ing",
    name: ing,
  }));
};

/**
 * Get a list of all appliances from all recipes
 * @return  {array}    the list of appliances
 */
const getAllAppliances = () => {
  let appliances = [];
  data.recipes.forEach((recipe) => {
    if (!appliances.includes(recipe.appliance.toLowerCase()))
      appliances.push(recipe.appliance.toLowerCase());
  });
  return appliances.map((app) => ({
    type: "app",
    name: app,
  }));
};

/**
 * Get a list of all ustensils from all recipes
 * @return  {array}    the list of ustensils
 */
const getAllUstensils = () => {
  let ustensils = [];
  data.recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      if (!ustensils.includes(ustensil.toLowerCase()))
        ustensils.push(ustensil.toLowerCase());
    });
  });
  return ustensils.map((ust) => ({
    type: "ust",
    name: ust,
  }));
};

/**
 * Get a list of all recipe ids
 * @return  {array}    the list of ids
 */
const getAllRecipeIds = () => {
  return data.recipes.map((elt) => elt.id);
};

/**
 * Initialize the state with initial data
 * @returns {void}
 */
const initializeState = () => {
  state.displayedIng = getAllIngredients();
  state.displayedApp = getAllAppliances();
  state.displayedUst = getAllUstensils();
  state.displayedRecipes = getAllRecipeIds();
};

export { initializeState };
