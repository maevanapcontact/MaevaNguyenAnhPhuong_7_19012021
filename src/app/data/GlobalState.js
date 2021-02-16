import data from "./data";

export default {
  globalState: {
    initialData: data.recipes,
    recipeIds: [],
    recipesToDisplay: data.recipes,
    ingParams: [],
    appParams: [],
    ustParams: [],
    allFormattedParams: [],
    allIngredients: [],
    allAppliances: [],
    allUstensils: [],
    allFormattedIngredients: [],
    allFormattedAppliances: [],
    allFormattedUstensils: [],
    ingredientsObject: {},
    appliancesObject: {},
    ustensilsObject: {},
    ingFiltersToDisplay: [],
    appFiltersToDisplay: [],
    ustFiltersToDisplay: [],
  },
};
