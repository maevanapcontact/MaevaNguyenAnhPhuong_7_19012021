/**
 * creates a dom element with a class
 * @param   {string}  eltTag     tag's name
 * @param   {string}  eltClass   tag's class
 * @return  {node}
 */
const createGenericElt = (eltTag, eltClass = null) => {
  const elt = document.createElement(eltTag);
  if (eltClass) elt.className = eltClass;
  return elt;
};

/**
 * creates a link element with a class
 * @param   {string}  eltHref     link to go
 * @param   {string}  eltContent  content to display
 * @param   {string}  eltClass    tag's class
 * @return  {node}
 */
const createLinkElt = (eltHref, eltContent, eltClass = null) => {
  const elt = createGenericElt("a", eltClass);
  elt.setAttribute("href", eltHref);
  elt.setAttribute("title", eltContent);
  elt.textContent = eltContent;
  return elt;
};

/**
 * gets a normalize version of a text
 * @param   {string}  text  text to normalize
 * @return  {string}
 */
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export { createGenericElt, createLinkElt, normalizeText };
