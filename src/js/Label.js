export default class Label {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.removeFilter = this.removeFilter.bind(this);
  }

  createLabel() {
    const elt = document.createElement("button");
    elt.className = `label ${this.type}`;
    elt.setAttribute("type", "button");
    const iconElt = document.createElement("span");
    iconElt.className = "far fa-times-circle";
    iconElt.addEventListener("click", this.removeFilter);
    elt.textContent = this.name;
    elt.appendChild(iconElt);

    return elt;
  }

  removeFilter(evt) {
    evt.preventDefault();
    evt.target.parentNode.remove();
    let url = window.location.href;
    console.log(url);
  }
}
