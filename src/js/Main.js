import data from "./data";
import RecipesView from "./RecipesView";
import DataLogic from "./DataLogic";
import TagsView from "./TagsView";

export default class Main {
  constructor() {
    this.recipesView = new RecipesView(data.recipes);
    this.recipesData = new DataLogic();
    this.tagsView = new TagsView();
  }

  initialize() {
    this.displayRecipesList();
    this.displayFilterTags();
  }

  displayRecipesList() {
    this.recipesView.displayRecipesList();
  }

  displayFilterTags() {
    this.tagsView.displayIngredientsTags(this.recipesData.getAllIngredients());
    this.tagsView.displayAppliancesTags(this.recipesData.getAllApplicances());
    this.tagsView.displayUstensilsList(this.recipesData.getAllUstensils());
  }
}
