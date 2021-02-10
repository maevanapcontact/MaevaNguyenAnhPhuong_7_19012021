import Ingredient from "./Ingredient";

export default class Recipe {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.ingredients = data.ingredients;
    this.time = data.time;
    this.description = data.description;
    this.appliance = data.appliance;
    this.ustensils = data.ustensils;
  }

  createRecipeElement() {
    const elt = document.createElement("article");
    elt.className = "recipe";
    const aElt = document.createElement("a");
    aElt.setAttribute("href", "index.html");
    aElt.setAttribute("title", this.name);
    const imgElt = document.createElement("div");
    imgElt.className = "recipe-img";
    const dataElt = document.createElement("div");
    dataElt.className = "recipe-data";
    const headerElt = document.createElement("header");
    const h2Elt = document.createElement("h2");
    const timeElt = document.createElement("div");
    timeElt.className = "recipe-time";
    const categoryLeftElt = document.createElement("div");
    categoryLeftElt.className = "recipe-category";
    const categoryRightElt = document.createElement("div");
    categoryRightElt.className = "recipe-category";

    const ulElt = document.createElement("ul");

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
