import data from "./data";
import state from "./globalState";
import { normalizeText } from "./utils";

const { globalState } = state;

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
 * Get a list of all ingredients from all recipes
 * @param   {array}  tagList  the array of filters
 * @return  {object}
 */
const createTagObject = (tagList) => {
  let tagObj = {};
  tagList.forEach((tag) => (tagObj[normalizeText(tag.name)] = []));

  return tagObj;
};

/**
 * Get an object with all ingredient names
 * @return  {object}
 */
const getIngredientsObject = () => {
  let ingredientsObject = createTagObject(getAllIngredients());
  data.recipes.forEach((recipe) => {
    recipe.ingredients.forEach((elt) => {
      const objKey = normalizeText(elt.ingredient);
      ingredientsObject[objKey].push(recipe.id);
    });
  });
  return ingredientsObject;
};

/**
 * Get an object with all appliance names
 * @return  {object}
 */
const getAppliancesObject = () => {
  let appliancesObject = createTagObject(getAllAppliances());

  data.recipes.forEach((recipe) => {
    const objKey = normalizeText(recipe.appliance);
    appliancesObject[objKey].push(recipe.id);
  });

  return appliancesObject;
};

/**
 * Get an object with all ustensil names
 * @return  {object}
 */
const getUstensilsObject = () => {
  let ustensilsObject = createTagObject(getAllUstensils());

  data.recipes.forEach((recipe) => {
    recipe.ustensils.forEach((elt) => {
      const objKey = normalizeText(elt);
      ustensilsObject[objKey].push(recipe.id);
    });
  });

  return ustensilsObject;
};

/**
 * fills the recipesFromFilters of the globalState with filtered recipe IDs
 * @return  {void}
 */
const fillRecipesFromFilters = () => {
  globalState.recipesFromFilters = [];

  fillRecipeSingleFilter("ing");
  fillRecipeSingleFilter("app");
  fillRecipeSingleFilter("ust");
};

/**
 * fill the recipesFromFilters with a single filter type (ing, app or ust)
 * @return  {void}
 */
const fillRecipeSingleFilter = (type) => {
  let filterObj = {};
  let filterArray = [];

  if (type === "ing") {
    filterObj = getIngredientsObject();
    filterArray = globalState.activeIngFilters;
  }
  if (type === "app") {
    filterObj = getAppliancesObject();
    filterArray = globalState.activeAppFilters;
  }
  if (type === "ust") {
    filterObj = getUstensilsObject();
    filterArray = globalState.activeUstFilters;
  }

  filterArray.forEach((elt) => {
    if (globalState.recipesFromFilters.length === 0) {
      globalState.recipesFromFilters = filterObj[elt];
    } else {
      globalState.recipesFromFilters = globalState.recipesFromFilters.filter(
        (id) => {
          if (filterObj[elt].includes(id)) return true;
          else return false;
        }
      );
    }
  });
};

/**
 * Get a unique string with all ingredients from one recipe
 * @param   {object} recipe
 * @returns {string}
 */
const getIngredientsStringFromRecipe = (recipe) => {
  let ingredientsString = "";
  recipe.ingredients.forEach((ing) => {
    ingredientsString += ` ${normalizeText(ing.ingredient)}`;
  });
  return ingredientsString;
};

export {
  getAllIngredients,
  getAllAppliances,
  getAllUstensils,
  getIngredientsObject,
  getAppliancesObject,
  getUstensilsObject,
  fillRecipesFromFilters,
  getIngredientsStringFromRecipe,
};
