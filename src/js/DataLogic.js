import data from "./data";

export default class DataLogic {
  constructor() {
    this.initialData = data.recipes;
    this.createIngredientArray = this.createIngredientArray.bind(this);
    this.createAppliancesArray = this.createAppliancesArray.bind(this);
    this.createUstensilsArray = this.createUstensilsArray.bind(this);
    this.getAllIngredients = this.getAllIngredients.bind(this);
    this.getAllApplicances = this.getAllApplicances.bind(this);
    this.getAllUstensils = this.getAllUstensils.bind(this);
  }

  getInitialData() {
    return this.initialData;
  }

  createIngredientArray() {
    let ingredients = [];
    this.initialData.forEach((recipe) => {
      recipe.ingredients.forEach((ing) => {
        if (!ingredients.includes(ing.ingredient.toLowerCase()))
          ingredients.push(ing.ingredient.toLowerCase());
      });
    });
    return ingredients;
  }

  createAppliancesArray() {
    let appliances = [];
    this.initialData.forEach((recipe) => {
      if (!appliances.includes(recipe.appliance.toLowerCase()))
        appliances.push(recipe.appliance.toLowerCase());
    });
    return appliances;
  }

  createUstensilsArray() {
    let ustensils = [];
    this.initialData.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        if (!ustensils.includes(ustensil.toLowerCase()))
          ustensils.push(ustensil.toLowerCase());
      });
    });
    return ustensils;
  }

  getAllIngredients() {
    return this.createIngredientArray();
  }

  getAllApplicances() {
    return this.createAppliancesArray();
  }

  getAllUstensils() {
    return this.createUstensilsArray();
  }
}
