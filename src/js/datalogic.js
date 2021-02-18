import data from "./data";
import state from "./globalState";
import { normalizeText } from "./utils";

const { globalState } = state;

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

const createTagObject = (tagList) => {
  let tagObj = {};
  tagList.forEach((tag) => (tagObj[normalizeText(tag.name)] = []));

  return tagObj;
};

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

const getAppliancesObject = () => {
  let appliancesObject = createTagObject(getAllAppliances());

  data.recipes.forEach((recipe) => {
    const objKey = normalizeText(recipe.appliance);
    appliancesObject[objKey].push(recipe.id);
  });

  return appliancesObject;
};

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

const fillRecipesFromFilters = () => {
  globalState.recipesFromFilters = [];

  fillRecipeSingleFilter("ing");
  fillRecipeSingleFilter("app");
  fillRecipeSingleFilter("ust");
};

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

export {
  getAllIngredients,
  getAllAppliances,
  getAllUstensils,
  getIngredientsObject,
  getAppliancesObject,
  getUstensilsObject,
  fillRecipesFromFilters,
};
