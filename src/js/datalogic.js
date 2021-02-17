import data from "./data";

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

export { getAllIngredients, getAllAppliances, getAllUstensils };
