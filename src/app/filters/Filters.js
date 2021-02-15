import DomManager from "../utils/DomManager";
import Filter from "./Filter";

export default class Filters extends DomManager {
  constructor(type, name, filtersList) {
    super();
    this.type = type;
    this.name = name;
    this.filtersList = filtersList;
  }

  createFilterElement() {
    const elt = this.createGenericElt("div", "filters-elt");
    const inputElt = this.createGenericElt("input");
    inputElt.setAttribute("type", "text");
    inputElt.setAttribute("placeholder", this.name);
    const iconElt = this.createGenericElt("span", "fas fa-chevron-down");
    iconElt.setAttribute("id", `${this.type}-btn`);
    const listElt = this.createGenericElt("div", "filters-all");
    listElt.setAttribute("id", `${this.type}-filter`);

    const ulElt = this.createFiltersListElt(this.filtersList);
    listElt.appendChild(ulElt);

    elt.appendChild(inputElt);
    elt.appendChild(iconElt);
    elt.appendChild(listElt);

    return elt;
  }

  createFiltersListElt(list) {
    this.setFiltersList(list);
    const ulElt = this.createGenericElt("ul");
    this.filtersList.forEach((filter) => {
      const tagElt = new Filter(this.type, filter);
      ulElt.appendChild(tagElt.createFilterElt());
    });
    return ulElt;
  }

  // getFiltersList() {
  //   return this.filtersList;
  // }

  setFiltersList(list) {
    this.filtersList = list;
  }

  // filterFiltersList(list) {
  //   console.log(this.filtersList);
  // }
}
