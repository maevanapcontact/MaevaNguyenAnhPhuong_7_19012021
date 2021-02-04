export default class ApplicationView {
  constructor() {}
}

const ingredientsBtn = document.getElementById("ingredients-btn");
const appliancesBtn = document.getElementById("applicances-btn");
const ustentilsBtn = document.getElementById("ustentils-btn");

const ingredientsList = document.getElementById("filters-all-1");
const appliancesList = document.getElementById("filters-all-2");
const ustentilsList = document.getElementById("filters-all-3");

const manageFilterLists = () => {
  ingredientsBtn.addEventListener("click", toggleFilterList);
  appliancesBtn.addEventListener("click", toggleFilterList);
  ustentilsBtn.addEventListener("click", toggleFilterList);
};

const toggleFilterList = (evt) => {
  const targetId = evt.target.id;
  if (targetId === "ingredients-btn") ingredientsList.classList.toggle("open");
  if (targetId === "applicances-btn") appliancesList.classList.toggle("open");
  if (targetId === "ustentils-btn") ustentilsList.classList.toggle("open");
};
