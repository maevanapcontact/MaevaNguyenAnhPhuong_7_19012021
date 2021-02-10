import Filter from "./Filter";

export default class Filters {
  constructor(type, name, list) {
    this.type = type;
    this.name = name;
    this.tags = list;
  }

  createFilterElement() {
    const elt = document.createElement("div");
    elt.className = "filters-elt";
    const inputElt = document.createElement("input");
    inputElt.setAttribute("type", "text");
    inputElt.setAttribute("value", this.name);
    const iconElt = document.createElement("span");
    iconElt.className = "fas fa-chevron-down";
    iconElt.setAttribute("id", `${this.type}-btn`);
    const listElt = document.createElement("div");
    listElt.className = "filters-all";
    listElt.setAttribute("id", `${this.type}-filter`);

    const ulElt = this.createTagsListElt(this.tags);
    listElt.appendChild(ulElt);

    elt.appendChild(inputElt);
    elt.appendChild(iconElt);
    elt.appendChild(listElt);

    return elt;
  }

  createTagsListElt(list) {
    const ulElt = document.createElement("ul");
    list.forEach((tag) => {
      const tagElt = new Filter(this.type, tag);
      ulElt.appendChild(tagElt.createFilterElt());
    });
    return ulElt;
  }
}
