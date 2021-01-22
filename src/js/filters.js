import data from "./data";
import { createLinkElement } from "./utils";

/**
 * Get the list of all ingredients without repetition
 *
 * @return  {array}  The list of ingredients
 */
const getAllIngredients = () => {
  let ingredients = [];

  data.recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (!ingredients.includes(ingredient.ingredient.toLowerCase()))
        ingredients.push(ingredient.ingredient.toLowerCase());
    });
  });

  return ingredients;
};

/**
 * Get the list of all appliances without repetition
 *
 * @return  {array}  The list of appliances
 */
const getAllApplicances = () => {
  let appliances = [];

  data.recipes.forEach((recipe) => {
    if (!appliances.includes(recipe.appliance.toLowerCase()))
      appliances.push(recipe.appliance.toLowerCase());
  });

  return appliances;
};

/**
 * Get the list of all ustensils without repetition
 *
 * @return  {array}  The list of ustensils
 */
const getAllUstensils = () => {
  let ustensils = [];

  data.recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      if (!ustensils.includes(ustensil.toLowerCase()))
        ustensils.push(ustensil.toLowerCase());
    });
  });

  return ustensils;
};

/**
 * Creates an object with all the tags as key and an empty array as value
 *
 * @param   {function}  getTagList  The function to get the tag list
 *
 * @return  {object}                The object created
 */
const createTagObject = (getTagList) => {
  let tagObj = {};
  const tagList = getTagList();
  tagList.forEach((tag) => (tagObj[tag] = []));

  return tagObj;
};

/**
 * Fills the ingredients tags object values with IDs of recipes
 *
 * @return  {object}  The ingredients tags object updated
 */
const fillsIngredientsTagsObj = () => {
  let ingredientsTagObj = createTagObject(getAllIngredients);

  data.recipes.forEach((recipe) => {
    recipe.ingredients.forEach((elt) => {
      const objKey = elt.ingredient.toLowerCase();
      ingredientsTagObj[objKey].push(recipe.id);
    });
  });

  return ingredientsTagObj;
};

/**
 * Fills the appliances tags object values with IDs of recipes
 *
 * @return  {object}  The appliances tags object updated
 */
const fillsAppliancesTagsObj = () => {
  let appliancesTagsObj = createTagObject(getAllApplicances);

  data.recipes.forEach((recipe) => {
    const objKey = recipe.appliance.toLowerCase();
    appliancesTagsObj[objKey].push(recipe.id);
  });

  return appliancesTagsObj;
};

/**
 * Fills the ustensils tags object values with IDs of recipes
 *
 * @return  {object}  The ustensils tags object updated
 */
const fillsUstensilsTagsObj = () => {
  let ustensilsTagsObj = createTagObject(getAllUstensils);

  data.recipes.forEach((recipe) => {
    recipe.ustensils.forEach((elt) => {
      const objKey = elt.toLowerCase();
      ustensilsTagsObj[objKey].push(recipe.id);
    });
  });

  return ustensilsTagsObj;
};

/**
 * Utils to fill one filter box in the DOM
 *
 * @return  {void}
 */
const fillSpecificFilter = (filterList, filterElt) => {
  const ulElt = document.createElement("ul");

  filterList.forEach((item) => {
    const liElt = document.createElement("li");
    const aElt = createLinkElement("#", item, "filter-tag");
    aElt.textContent = item;
    liElt.appendChild(aElt);
    ulElt.appendChild(liElt);
  });

  filterElt.appendChild(ulElt);
};

/**
 * Fill the DOM with all the filter tags
 *
 * @return  {void}
 */
const fillAllFilters = () => {
  const filterIngredientsElt = document.getElementById("filters-all-1");
  const filterApplianceElt = document.getElementById("filters-all-2");
  const filterUstensilsElt = document.getElementById("filters-all-3");

  fillSpecificFilter(getAllIngredients(), filterIngredientsElt);
  fillSpecificFilter(getAllApplicances(), filterApplianceElt);
  fillSpecificFilter(getAllUstensils(), filterUstensilsElt);

  console.log(fillsIngredientsTagsObj());
  console.log(fillsAppliancesTagsObj());
  console.log(fillsUstensilsTagsObj());
};

export { fillAllFilters };
