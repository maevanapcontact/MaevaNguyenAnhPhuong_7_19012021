import state from "../data/globalState";

export default class Url {
  getParamFromURL(param) {
    return new URL(window.location.href).searchParams.getAll(param);
  }

  setIngParams() {
    state.globalState.ingParams = this.getParamFromURL("ing");
  }

  setAppParams() {
    state.globalState.appParams = this.getParamFromURL("app");
  }

  setUstParams() {
    state.globalState.ustParams = this.getParamFromURL("ust");
  }

  setAllParams() {
    this.setIngParams();
    this.setAppParams();
    this.setUstParams();
  }

  formatParamName(param) {
    return param
      .replaceAll(" ", "_")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  setAllFormattedParams() {
    let ingArray = state.globalState.ingParams;
    ingArray = ingArray.map((elt) => ({
      type: "ing",
      name: this.formatParamName(elt),
    }));

    let appArray = state.globalState.appParams;
    appArray = appArray.map((elt) => ({
      type: "app",
      name: this.formatParamName(elt),
    }));

    let ustArray = state.globalState.ustParams;
    ustArray = ustArray.map((elt) => ({
      type: "ust",
      name: this.formatParamName(elt),
    }));

    state.globalState.allFormattedParams = ingArray
      .concat(appArray)
      .concat(ustArray);
  }

  addParamsToUrl(ing, app, ust) {
    state.globalState.ingParams = ing;
    state.globalState.appParams = app;
    state.globalState.ustParams = ust;
    this.setAllFormattedParams();

    const allParams = state.globalState.allFormattedParams;

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
