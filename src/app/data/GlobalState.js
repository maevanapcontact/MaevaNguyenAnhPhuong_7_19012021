import data from "./data";

export default class GlobalState {
  constructor() {
    this.initialData = data.recipes;
    this.recipesToDisplay = data.recipes;
    this.ingParams = [];
    this.appParams = [];
    this.ustParams = [];
    this.allFormattedParams = [];
  }

  /**
   * Getters
   */
  getInitialData() {
    return this.initialData;
  }

  getRecipesToDisplay() {
    return this.recipesToDisplay;
  }

  getIngParams() {
    return this.ingParams;
  }

  getAppParams() {
    return this.appParams;
  }

  getUstParam() {
    return this.ustParams;
  }

  getAllFormattedParams() {
    return this.allFormattedParams;
  }

  /**
   * Setters
   */
  setIngParams(params) {
    this.ingParams = params;
  }

  setAppParams(params) {
    this.appParams = params;
  }

  setUstParams(params) {
    this.ustParams = params;
  }

  setAllFormattedParams(paramsArray) {
    this.allFormattedParams = paramsArray;
  }
}
