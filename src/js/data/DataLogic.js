import data from "./data";

export default class DataLogic {
  constructor() {
    this.initialData = data.recipes;
    this.getAllIngredients = this.getAllIngredients.bind(this);
    this.getAllApplicances = this.getAllApplicances.bind(this);
    this.getAllUstensils = this.getAllUstensils.bind(this);
  }

  getInitialData() {
    return this.initialData;
  }

  getInitialDataId() {
    return this.initialData.map((elt) => elt.id);
  }

  getAllIngredients() {
    return this.getIngredients(this.initialData);
  }

  getAllApplicances() {
    return this.getAppliances(this.initialData);
  }

  getAllUstensils() {
    return this.getUstensils(this.initialData);
  }

  getIngredients(list) {
    let ingredients = [];
    list.forEach((recipe) => {
      recipe.ingredients.forEach((ing) => {
        if (!ingredients.includes(ing.ingredient.toLowerCase()))
          ingredients.push(ing.ingredient.toLowerCase());
      });
    });
    return ingredients;
  }

  getAppliances(list) {
    let appliances = [];
    list.forEach((recipe) => {
      if (!appliances.includes(recipe.appliance.toLowerCase()))
        appliances.push(recipe.appliance.toLowerCase());
    });
    return appliances;
  }

  getUstensils(list) {
    let ustensils = [];
    list.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        if (!ustensils.includes(ustensil.toLowerCase()))
          ustensils.push(ustensil.toLowerCase());
      });
    });
    return ustensils;
  }

  createFormattedNameArray(list) {
    const formattedArray = list.map((item) => ({
      name: item,
      formattedName: this.formatDataTag(item),
    }));

    return formattedArray;
  }

  formatDataTag(tag) {
    return tag
      .replaceAll(" ", "_")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  getFormattedIngredients() {
    const ingredientsArray = this.getAllIngredients();
    return this.createFormattedNameArray(ingredientsArray);
  }

  getFormattedAppliances() {
    const appliancesArray = this.getAllApplicances();
    return this.createFormattedNameArray(appliancesArray);
  }

  getFormattedUstensils() {
    const ustensilsArray = this.getAllUstensils();
    return this.createFormattedNameArray(ustensilsArray);
  }

  createTagObject(getTagList) {
    let tagObj = {};
    const tagList = getTagList();
    tagList.forEach((tag) => (tagObj[this.formatDataTag(tag)] = []));

    return tagObj;
  }

  getIngredientsObject() {
    let ingredientsTagObj = this.createTagObject(this.getAllIngredients);

    this.initialData.forEach((recipe) => {
      recipe.ingredients.forEach((elt) => {
        const objKey = this.formatDataTag(elt.ingredient.toLowerCase());
        ingredientsTagObj[objKey].push(recipe.id);
      });
    });

    return ingredientsTagObj;
  }

  getAppliancesObject() {
    let appliancesTagsObj = this.createTagObject(this.getAllApplicances);

    this.initialData.forEach((recipe) => {
      const objKey = this.formatDataTag(recipe.appliance.toLowerCase());
      appliancesTagsObj[objKey].push(recipe.id);
    });

    return appliancesTagsObj;
  }

  getUstensilsObject() {
    let ustensilsTagsObj = this.createTagObject(this.getAllUstensils);

    this.initialData.forEach((recipe) => {
      recipe.ustensils.forEach((elt) => {
        const objKey = this.formatDataTag(elt.toLowerCase());
        ustensilsTagsObj[objKey].push(recipe.id);
      });
    });

    return ustensilsTagsObj;
  }
}
