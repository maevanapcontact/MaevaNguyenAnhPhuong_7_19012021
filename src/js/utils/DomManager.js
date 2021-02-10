export default class DomManager {
  createGenericElt(eltTag, eltClass = null) {
    const elt = document.createElement(eltTag);
    if (eltClass) elt.className = eltClass;
    return elt;
  }

  createLinkElt(eltHref, eltContent, eltClass = null) {
    const elt = this.createGenericElt("a", eltClass);
    elt.setAttribute("href", eltHref);
    elt.setAttribute("title", eltContent);
    elt.textContent = eltContent;
    return elt;
  }
}
