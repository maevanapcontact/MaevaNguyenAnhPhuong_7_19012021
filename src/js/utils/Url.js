export default class Url {
  constructor() {
    this.ingParams = [];
    this.appParams = [];
    this.ustParams = [];
  }

  getParamFromURL(param) {
    return new URL(window.location.href).searchParams.getAll(param);
  }

  getAllParamsFromUrl() {
    const ingParams = new URL(window.location.href).searchParams.getAll("ing");
    const appParams = new URL(window.location.href).searchParams.getAll("app");
    const ustParams = new URL(window.location.href).searchParams.getAll("ust");

    return ingParams.concat(appParams).concat(ustParams);
  }

  setIngParams(ing) {
    this.ingParams = ing;
  }

  setAppParams(app) {
    this.appParams = app;
  }

  setUstParams(ust) {
    this.ustParams = ust;
  }

  formatParamName(param) {
    return param
      .replaceAll(" ", "_")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  getAllParams() {
    const ingArray = this.ingParams.map((elt) => ({
      type: "ing",
      name: this.formatParamName(elt),
    }));
    const appArray = this.appParams.map((elt) => ({
      type: "app",
      name: this.formatParamName(elt),
    }));
    const ustArray = this.ustParams.map((elt) => ({
      type: "ust",
      name: this.formatParamName(elt),
    }));

    return ingArray.concat(appArray).concat(ustArray);
  }

  addParamsToUrl(ing, app, ust) {
    this.setIngParams(ing);
    this.setAppParams(app);
    this.setUstParams(ust);
    const allParams = this.getAllParams();

    let url = window.location.href;
    url = url.split("index.html")[0];
    if (allParams.length === 0) url += "index.html";

    allParams.forEach((param, index) => {
      if (index === 0) url += `index.html?${param.type}=${param.name}`;
      else url += `&${param.type}=${param.name}`;
    });
    window.history.pushState({}, "", url);
  }
}
