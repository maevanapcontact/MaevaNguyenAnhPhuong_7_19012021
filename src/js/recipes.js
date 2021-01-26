import data from "./data";
import {
  createElementWithClassName,
  createLinkElement,
  createIngredientsList,
} from "./utils";

const mainContentElt = document.getElementById("main-content");

/**
 * Fills the main content with recipe elements
 *
 * @return  {void}
 */
const createRecipes = () => {
  data.recipes.forEach((recipe) =>
    mainContentElt.appendChild(createRecipeElt(recipe))
  );
};

const createFilteredRecipes = (recipesList) => {
  mainContentElt.innerHTML = "";
  recipesList.forEach((recipe) =>
    mainContentElt.appendChild(createRecipeElt(recipe))
  );
};

/**
 * Creates a single DOM recipe element
 *
 * @param   {object}  recipe  The data of the recipe to add to the element
 *
 * @return  {object}          The recipe element newly created
 */
const createRecipeElt = (recipe) => {
  const elt = createElementWithClassName("article", "recipe");
  const aElt = createLinkElement("index.html", recipe.name, "recipe-link");
  const imgElt = createElementWithClassName("div", "recipe-img");
  const dataElt = createElementWithClassName("div", "recipe-data");
  const headerElt = document.createElement("header");
  const h2Elt = document.createElement("h2");
  const timeElt = createElementWithClassName("div", "recipe-time");
  const categoryLeftElt = createElementWithClassName("div", "recipe-category");
  const categoryRightElt = createElementWithClassName("div", "recipe-category");
  const ulElt = createIngredientsList(recipe.ingredients);

  h2Elt.textContent = recipe.name;
  timeElt.innerHTML = `<span class="far fa-clock"></span> ${recipe.time} min`;
  categoryRightElt.textContent = recipe.description;

  headerElt.appendChild(h2Elt);
  headerElt.appendChild(timeElt);
  categoryLeftElt.appendChild(ulElt);
  dataElt.appendChild(headerElt);
  dataElt.appendChild(categoryLeftElt);
  dataElt.appendChild(categoryRightElt);
  aElt.appendChild(imgElt);
  aElt.appendChild(dataElt);
  elt.appendChild(aElt);

  return elt;
};

export { createRecipes, createFilteredRecipes };
