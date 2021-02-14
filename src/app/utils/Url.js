import GlobalState from "../data/GlobalState";

export default class Url {
  constructor() {
    this.globalState = new GlobalState();
  }

  getParamFromURL(param) {
    return new URL(window.location.href).searchParams.getAll(param);
  }

  // getAllParamsFromUrl() {
  //   this.ingParams = new URL(window.location.href).searchParams.getAll("ing");
  //   this.appParams = new URL(window.location.href).searchParams.getAll("app");
  //   this.ustParams = new URL(window.location.href).searchParams.getAll("ust");

  //   return this.ingParams.concat(this.appParams).concat(this.ustParams);
  // }

  // setIngParams(ing) {
  //   this.ingParams = ing;
  // }

  // setAppParams(app) {
  //   this.appParams = app;
  // }

  // setUstParams(ust) {
  //   this.ustParams = ust;
  // }

  formatParamName(param) {
    return param
      .replaceAll(" ", "_")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  setAllFormattedParams() {
    let ingArray = this.globalState.getIngParams();
    ingArray = ingArray.map((elt) => ({
      type: "ing",
      name: this.formatParamName(elt),
    }));

    let appArray = this.globalState.getAppParams();
    appArray = appArray.map((elt) => ({
      type: "app",
      name: this.formatParamName(elt),
    }));

    let ustArray = this.globalState.getUstParam();
    ustArray = ustArray.map((elt) => ({
      type: "ust",
      name: this.formatParamName(elt),
    }));

    this.globalState.setAllFormattedParams(
      ingArray.concat(appArray).concat(ustArray)
    );
  }

  // addParamsToUrl(ing, app, ust) {
  //   this.setIngParams(ing);
  //   this.setAppParams(app);
  //   this.setUstParams(ust);
  //   const allParams = this.getAllParams();

  //   let url = window.location.href;
  //   url = url.split("index.html")[0];
  //   if (allParams.length === 0) url += "index.html";

  //   allParams.forEach((param, index) => {
  //     if (index === 0) url += `index.html?${param.type}=${param.name}`;
  //     else url += `&${param.type}=${param.name}`;
  //   });
  //   window.history.pushState({}, "", url);
  // }
}
