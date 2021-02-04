import Tags from "./Tags";

export default class Filter {
  constructor(id, name, list) {
    this.id = id;
    this.name = name;
    this.tags = new Tags(id, list);
  }

  createFilterElement() {
    const elt = document.createElement("div");
    elt.className = "filters-elt";
    const inputElt = document.createElement("input");
    inputElt.setAttribute("type", "text");
    inputElt.setAttribute("value", this.name);
    const iconElt = document.createElement("span");
    iconElt.className = "fas fa-chevron-down";
    iconElt.setAttribute("id", `${this.id}-btn`);
    const listElt = document.createElement("div");
    listElt.className = "filters-all";
    listElt.setAttribute("id", `${this.id}-filter`);
    listElt.appendChild(this.tags.createTagsList());

    elt.appendChild(inputElt);
    elt.appendChild(iconElt);
    elt.appendChild(listElt);

    return elt;
  }
}
