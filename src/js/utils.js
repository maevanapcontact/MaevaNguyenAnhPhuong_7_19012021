/**
 * Creates a DOM element and adding it a class name
 *
 * @param   {string}  eltTag    the tag of the element to create
 * @param   {string}  eltClass  the class(es) to add
 *
 * @return  {object}            The element created
 */
const createElementWithClassName = (eltTag, eltClass) => {
  const elt = document.createElement(eltTag);
  elt.className = eltClass;

  return elt;
};

/**
 * Creates a "a" element with a class name
 *
 * @param   {string}  eltHref   The href text
 * @param   {string}  eltTitle  The title text
 * @param   {string}  eltClass  The class name to add
 *
 * @return  {object}            The element created
 */
const createLinkElement = (eltHref, eltTitle, eltClass) => {
  const elt = document.createElement("a");
  elt.setAttribute("href", eltHref);
  elt.setAttribute("title", eltTitle);
  elt.className = eltClass;

  return elt;
};

/**
 * Creates a "ul" list of ingredients with the correct DOM structure
 *
 * @param   {array}  listIngredients  List of ingredients to display
 *
 * @return  {object}                  The element created
 */
const createIngredientsList = (listIngredients) => {
  const elt = document.createElement("ul");

  listIngredients.forEach((ingredient) => {
    const liElt = document.createElement("li");
    liElt.innerHTML = `<strong>${ingredient.ingredient}`;
    liElt.innerHTML += ingredient.quantity
      ? ` : </strong><span>${ingredient.quantity}`
      : `</strong>`;
    liElt.innerHTML += ingredient.unit
      ? ` ${ingredient.unit}</span>`
      : `</span>`;
    elt.appendChild(liElt);
  });

  return elt;
};

export { createElementWithClassName, createLinkElement, createIngredientsList };
