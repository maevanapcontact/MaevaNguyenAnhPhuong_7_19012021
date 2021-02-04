export default class Ingredient {
  constructor(data) {
    this.name = data.ingredient;
    this.quantity = data.quantity;
    this.unit = data.unit;
  }

  createIngredient() {
    const liElt = document.createElement("li");

    liElt.innerHTML = `<strong>${this.name}`;
    liElt.innerHTML += this.quantity
      ? ` : </strong><span>${this.quantity}`
      : `</strong>`;
    liElt.innerHTML += this.unit ? ` ${this.unit}</span>` : `</span>`;

    return liElt;
  }
}
