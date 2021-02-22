import data from "./data";
import { createGenericElt, createLinkElt } from "./utils";

/**
 * Create single recipe
 * @param   {object}  recipe
 * @return  {node}    the created element
 */
const createRecipeElement = (recipe) => {
  const elt = createGenericElt("article", "recipe");
  elt.id = recipe.id;
  const aElt = createLinkElt("index.html", recipe.name);
  aElt.textContent = "";
  const imgElt = createGenericElt("div", "recipe-img");
  const dataElt = createGenericElt("div", "recipe-data");
  const headerElt = createGenericElt("header");
  const h2Elt = createGenericElt("h2");
  const timeElt = createGenericElt("div", "recipe-time");
  const categoryLeftElt = createGenericElt("div", "recipe-category");
  const categoryRightElt = createGenericElt("div", "recipe-category");

  const ulElt = createGenericElt("ul");
  recipe.ingredients.forEach((ingredient) => {
    const liElt = createIngredient(ingredient);
    ulElt.appendChild(liElt);
  });

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

/**
 * Create single ingredient
 * @param   {object}  ingredient
 * @return  {node}    the created element
 */
const createIngredient = (ingredient) => {
  const liElt = document.createElement("li");
  liElt.innerHTML = `<strong>${ingredient.ingredient}`;
  liElt.innerHTML += ingredient.quantity
    ? ` : </strong><span>${ingredient.quantity}`
    : `</strong>`;
  liElt.innerHTML += ingredient.unit ? ` ${ingredient.unit}</span>` : `</span>`;

  return liElt;
};

/**
 * Build all recipes and hide them
 * @param   {node} containerElt The main content
 * @returns {void}
 */
const initializeRecipes = (containerElt) => {
  data.recipes.forEach((recipe) => {
    const recipeElt = createRecipeElement(recipe);
    recipeElt.style.display = "none";
    containerElt.appendChild(recipeElt);
  });
};

export { initializeRecipes };
