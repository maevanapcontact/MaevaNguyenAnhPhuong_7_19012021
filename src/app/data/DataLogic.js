import data from "./data";
import state from "./globalState";

export default class DataLogic {
  constructor() {
    this.initialData = data.recipes;
    this.createTagObject = this.createTagObject.bind(this);
  }

  setAllRecipeIds() {
    const recipesIds = data.recipes.map((elt) => elt.id);
    state.globalState.recipeIds = recipesIds;
  }

  setAllIngredients() {
    let ingredients = [];
    this.initialData.forEach((recipe) => {
      recipe.ingredients.forEach((ing) => {
        if (!ingredients.includes(ing.ingredient.toLowerCase()))
          ingredients.push(ing.ingredient.toLowerCase());
      });
    });
    state.globalState.allIngredients = ingredients;
  }

  setAllAppliances() {
    let appliances = [];
    this.initialData.forEach((recipe) => {
      if (!appliances.includes(recipe.appliance.toLowerCase()))
        appliances.push(recipe.appliance.toLowerCase());
    });
    state.globalState.allAppliances = appliances;
  }

  setAllUstensils() {
    let ustensils = [];
    this.initialData.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        if (!ustensils.includes(ustensil.toLowerCase()))
          ustensils.push(ustensil.toLowerCase());
      });
    });
    state.globalState.allUstensils = ustensils;
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

  setFormattedIngredients() {
    const formattedArray = this.createFormattedNameArray(
      state.globalState.allIngredients
    );
    state.globalState.allFormattedIngredients = formattedArray;
  }

  setFormattedAppliances() {
    const formattedArray = this.createFormattedNameArray(
      state.globalState.allAppliances
    );
    state.globalState.allFormattedAppliances = formattedArray;
  }

  setFormattedUstensils() {
    const formattedArray = this.createFormattedNameArray(
      state.globalState.allUstensils
    );
    state.globalState.allFormattedUstensils = formattedArray;
  }

  createTagObject(tagList) {
    let tagObj = {};
    tagList.forEach((tag) => (tagObj[this.formatDataTag(tag)] = []));

    return tagObj;
  }

  setIngredientsObject() {
    let ingredientsObject = this.createTagObject(
      state.globalState.allIngredients
    );
    this.initialData.forEach((recipe) => {
      recipe.ingredients.forEach((elt) => {
        const objKey = this.formatDataTag(elt.ingredient.toLowerCase());
        ingredientsObject[objKey].push(recipe.id);
      });
    });
    state.globalState.ingredientsObject = ingredientsObject;
  }

  setAppliancesObject() {
    let appliancesObject = this.createTagObject(
      state.globalState.allAppliances
    );

    this.initialData.forEach((recipe) => {
      const objKey = this.formatDataTag(recipe.appliance.toLowerCase());
      appliancesObject[objKey].push(recipe.id);
    });

    state.globalState.appliancesObject = appliancesObject;
  }

  setUstensilsObject() {
    let ustensilsObject = this.createTagObject(state.globalState.allUstensils);

    this.initialData.forEach((recipe) => {
      recipe.ustensils.forEach((elt) => {
        const objKey = this.formatDataTag(elt.toLowerCase());
        ustensilsObject[objKey].push(recipe.id);
      });
    });

    state.globalState.ustensilsObject = ustensilsObject;
  }
}
