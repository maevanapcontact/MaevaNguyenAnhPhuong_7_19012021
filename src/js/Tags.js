export default class Tags {
  constructor(list) {
    this.list = list;
  }

  createTagsList() {
    const elt = document.createElement("ul");
    this.list.forEach((item) => {
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
}
