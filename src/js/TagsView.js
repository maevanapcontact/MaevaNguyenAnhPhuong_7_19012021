export default class TagsView {
  constructor() {
    this.ingredientsView = document.getElementById("ingredients-filter");
    this.appliancesView = document.getElementById("appliances-filter");
    this.ustensilsView = document.getElementById("ustensils-filter");
  }

  createTagsList(list) {
    const elt = document.createElement("ul");
    list.forEach((item) => {
      const liElt = document.createElement("li");
      const aElt = document.createElement("a");
      aElt.setAttribute("href", "/");
      aElt.setAttribute("title", item);
      aElt.className = "filter-tag";
      aElt.textContent = item;
      liElt.appendChild(aElt);
      elt.appendChild(liElt);
    });
    return elt;
  }

  displayIngredientsTags(list) {
    const ulElt = this.createTagsList(list);
    this.ingredientsView.appendChild(ulElt);
  }

  displayAppliancesTags(list) {
    const ulElt = this.createTagsList(list);
    this.appliancesView.appendChild(ulElt);
  }

  displayUstensilsList(list) {
    const ulElt = this.createTagsList(list);
    this.ustensilsView.appendChild(ulElt);
  }
}
