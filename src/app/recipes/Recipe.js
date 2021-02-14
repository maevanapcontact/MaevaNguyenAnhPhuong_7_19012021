import DomManager from "../utils/DomManager";
import Ingredient from "./Ingredient";

export default class Recipe extends DomManager {
  constructor(data) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.ingredients = data.ingredients;
    this.time = data.time;
    this.description = data.description;
    this.appliance = data.appliance;
    this.ustensils = data.ustensils;
  }

  createRecipeElement() {
    const elt = this.createGenericElt("article", "recipe");
    const aElt = this.createLinkElt("index.html", this.name);
    aElt.textContent = "";
    const imgElt = this.createGenericElt("div", "recipe-img");
    const dataElt = this.createGenericElt("div", "recipe-data");
    const headerElt = this.createGenericElt("header");
    const h2Elt = this.createGenericElt("h2");
    const timeElt = this.createGenericElt("div", "recipe-time");
    const categoryLeftElt = this.createGenericElt("div", "recipe-category");
    const categoryRightElt = this.createGenericElt("div", "recipe-category");

    const ulElt = this.createGenericElt("ul");
    this.ingredients.forEach((ingredient) => {
      const liElt = new Ingredient(ingredient).createIngredient();
      ulElt.appendChild(liElt);
    });

    h2Elt.textContent = this.name;
    timeElt.innerHTML = `<span class="far fa-clock"></span> ${this.time} min`;
    categoryRightElt.textContent = this.description;

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
  }
}
