/**
 * DOM Variables
 */
const ingredientsBtn = document.getElementById("ingredients-btn");
const appliancesBtn = document.getElementById("applicances-btn");
const ustentilsBtn = document.getElementById("ustentils-btn");

const ingredientsList = document.getElementById("filters-all-1");
const appliancesList = document.getElementById("filters-all-2");
const ustentilsList = document.getElementById("filters-all-3");

/**
 * Add events to the list buttons
 *
 * @return  {void}
 */
const manageFilterLists = () => {
  ingredientsBtn.addEventListener("click", toggleFilterList);
  appliancesBtn.addEventListener("click", toggleFilterList);
  ustentilsBtn.addEventListener("click", toggleFilterList);
};

/**
 * Manage the UI display when hidding / showing the full list
 *
 * @param   {object}  evt  Browser event
 *
 * @return  {void}
 */
const toggleFilterList = (evt) => {
  const targetId = evt.target.id;
  if (targetId === "ingredients-btn") ingredientsList.classList.toggle("open");
  if (targetId === "applicances-btn") appliancesList.classList.toggle("open");
  if (targetId === "ustentils-btn") ustentilsList.classList.toggle("open");
};

export { manageFilterLists };
