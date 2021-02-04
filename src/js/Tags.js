import Tag from "./Tag";

export default class Tags {
  constructor(type, list) {
    this.type = type;
    this.list = list;
  }

  createTagsList() {
    const elt = document.createElement("ul");
    this.list.forEach((item) => {
      const tag = new Tag(this.type, item);
      elt.appendChild(tag.createTagElt());
    });
    return elt;
  }
}
