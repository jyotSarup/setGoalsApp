//arrays for temporary storage
let cookingGoalsArr = [];
let healthGoalsArr = [];
let technicalGoalsArr = [];
let languageGoalsArr = [];

let updateGoalBtn = document.getElementById("updateGoal");
updateGoalBtn.style.display = "none";

let changeStatusDrpDwn = document.getElementById("status");
changeStatusDrpDwn.disabled = true;

//*************************************************** */
//*************************************************** */
//validation flag to validate required inputs in form
//*************************************************** */
//*************************************************** */
let isRequiredValidationError = false;

//*************************************************** */
//*************************************************** */
// some nodes are exclusive to that category so they show only when you click on that category
//*************************************************** */
//*************************************************** */
const healthNodes = document.querySelectorAll(".healthExclusive");
healthNodes.forEach((el) => (el.style.display = "none"));

const technicalNodes = document.querySelectorAll(".technicalExclusive");
technicalNodes.forEach((el) => (el.style.display = "none"));

const languageNodes = document.querySelectorAll(".languageExclusive");
languageNodes.forEach((el) => (el.style.display = "none"));

const cookingNodes = document.querySelectorAll(".cookingExclusive");

const errorLabelNodes = document.querySelectorAll(".errorLabels");

//*************************************************** */
//*************************************************** */
//parent class with all common properties
//*************************************************** */
//*************************************************** */
class Goal {
  constructor(goalTitle, deadLine, hoursPerWeek, status, tutorials) {
    this.goalId = Date.now();
    this.goalTitle = goalTitle;
    this.deadLine = deadLine;
    this.hoursPerWeek = hoursPerWeek;
    this.status = status;
    this.tutorials = tutorials;
  }

//*************************************************** */
//*************************************************** */
  //this method is called when add Goal button is clicked to generate a new row.
  //The following fields are common in all child classes
  // The exclusive fields are being generated in child classes.
//*************************************************** */
//*************************************************** */
  generateTableRow(index) {
    let htmlString = "";
    htmlString += `<td>${index + 1}</td>`;
    htmlString += `<td>${this.goalTitle}</td>`;
    htmlString += `<td>${this.deadLine}</td>`;
    htmlString += `<td>${this.hoursPerWeek}</td>`;
    htmlString += `<td>${this.tutorials}</td>`;
    return htmlString;
  }

  populateFormForEditing() {
    title.value = this.goalTitle;
    deadline.value = this.deadLine;
    hrsPerWeek.value = this.hoursPerWeek;
    document.getElementById("status").value = this.status;
    tutorial.value = this.tutorials;
    hiddenId.value = this.goalId;
  }

  updateGoal() {
    this.goalTitle = title.value;
    this.deadLine = deadline.value;
    this.hoursPerWeek = hrsPerWeek.value;
    this.status = document.getElementById("status").value;
    this.tutorials = tutorial.value;
  }
}

class EducationGoal extends Goal {
  constructor(goalTitle, deadLine, hoursPerWeek, status, tutorials, notes) {
    super(goalTitle, deadLine, hoursPerWeek, status, tutorials);
    this.notes = notes;
  }

  generateTableRow(index) {
    let htmlString = super.generateTableRow(index);
    htmlString += `<td>${this.notes}</td>`;
    return htmlString;
  }
  populateFormForEditing() {
    super.populateFormForEditing();
    notes.value = this.notes;
  }

  updateGoal() {
    super.updateGoal();
    this.notes = notes.value;
  }
}

class TechnicalEducationGoal extends EducationGoal {
  constructor(
    goalTitle,
    deadLine,
    hoursPerWeek,
    status,
    tutorials,
    notes,
    project
  ) {
    super(goalTitle, deadLine, hoursPerWeek, status, tutorials, notes);
    this.project = project;
  }

//*************************************************** */
//*************************************************** */
  // this method is called when a new goal is added. to add the gal to temporary storage
//*************************************************** */
//*************************************************** */
  addToGoalList() {
    technicalGoalsArr.push(this);
  }

  generateTableRow(index) {
    let htmlString = super.generateTableRow(index);
    htmlString += `<td>${this.project}</td>`;
    return htmlString;
  }

  populateFormForEditing() {
    super.populateFormForEditing();
    projects.value = this.project;
  }

  updateGoal() {
    super.updateGoal();
    this.project = projects.value;
  }
}

class LanguageGoal extends EducationGoal {
  constructor(
    goalTitle,
    deadLine,
    hoursPerWeek,
    status,
    tutorials,
    notes,
    words
  ) {
    super(goalTitle, deadLine, hoursPerWeek, status, tutorials, notes);
    this.words = words;
  }

  addToGoalList() {
    languageGoalsArr.push(this);
  }

  generateTableRow(index) {
    let htmlString = super.generateTableRow(index);
    htmlString += `<td>${this.words}</td>`;
    return htmlString;
  }

  populateFormForEditing() {
    super.populateFormForEditing();
    words.value = this.words;
  }

  updateGoal() {
    super.updateGoal();
    this.words = words.value;
  }
}

class HealthGoal extends Goal {
  constructor(
    goalTitle,
    deadLine,
    hoursPerWeek,
    status,
    tutorials,
    currentWeight,
    goalWeight
  ) {
    super(goalTitle, deadLine, hoursPerWeek, status, tutorials);
    this.currentWeight = currentWeight;
    this.goalWeight = goalWeight;
  }
  addToGoalList() {
    healthGoalsArr.push(this);
  }

  generateTableRow(index) {
    let htmlString = super.generateTableRow(index);
    htmlString += `<td>${this.currentWeight}</td>`;
    htmlString += `<td>${this.goalWeight}</td>`;
    return htmlString;
  }

  populateFormForEditing() {
    super.populateFormForEditing();
    currentWeight.value = this.currentWeight;
    document.getElementById("goalWeight").value = this.goalWeight;
  }

  updateGoal() {
    super.updateGoal();
    this.currentWeight = currentWeight.value;
    this.goalWeight = document.getElementById("goalWeight").value;
  }
}

class CookingGoal extends Goal {
  constructor(goalTitle, deadLine, hoursPerWeek, status, tutorials, recipe) {
    super(goalTitle, deadLine, hoursPerWeek, status, tutorials);
    this.recipe = recipe;
  }
  addToGoalList() {
    cookingGoalsArr.push(this);
  }
  generateTableRow(index) {
    let htmlString = super.generateTableRow(index);
    htmlString += `<td>${this.recipe}</td>`;
    return htmlString;
  }

  populateFormForEditing() {
    super.populateFormForEditing();
    recipe.innerHTML = this.recipe;
  }

  updateGoal() {
    super.updateGoal();
    this.recipe = recipe.value;
  }
}

//*************************************************** */
//*************************************************** */
// These are the image icons, adding click event on all of those
//*************************************************** */
//*************************************************** */
let categoryIcon = document.querySelectorAll(".categoryIcon");

categoryIcon.forEach((el) =>
  el.addEventListener("click", function () {
    healthNodes.forEach((el) => (el.style.display = "none"));
    languageNodes.forEach((el) => (el.style.display = "none"));
    technicalNodes.forEach((el) => (el.style.display = "none"));
    cookingNodes.forEach((el) => (el.style.display = "none"));

    let category = el.firstElementChild.innerHTML;
    document.getElementById("goalCategoryTitle").innerHTML = category;

    updateGoalBtn.style.display = "none";
    changeStatusDrpDwn.disabled = true;
    document.getElementById("addGoal").style.display = "inline";

    let displayGoalsArr = [];
    let changeNodes;

//*************************************************** */
//*************************************************** */
    //displaying nodes according to the icon clicked
//*************************************************** */
//*************************************************** */
    if (category == "health") {
      changeNodes = healthNodes;
      displayGoalsArr = healthGoalsArr;
    } else if (category == "cooking") {
      changeNodes = cookingNodes;
      displayGoalsArr = cookingGoalsArr;
    } else if (category == "technical") {
      changeNodes = technicalNodes;
      displayGoalsArr = technicalGoalsArr;
    } else {
      changeNodes = languageNodes;
      displayGoalsArr = languageGoalsArr;
    }

    changeNodes.forEach((el) => {
      if (el.tagName == "TR") {
        el.style.display = "table-row";
      } else if (el.tagName == "TH") {
        el.style.display = "table-cell";
      } else {
        el.style.display = "inline";
      }
    });

//*************************************************** */
//*************************************************** */
    //this method is to convert array into table rows and display into list table
//*************************************************** */
//*************************************************** */
    displayGoalList(displayGoalsArr, category);

    document.getElementById("goalForm").reset();
    errorLabelNodes.forEach((el) => (el.innerHTML = ""));
    isRequiredValidationError = false;
  })
);

//*************************************************** */
//*************************************************** */
// called on click of add button
//*************************************************** */
//*************************************************** */
addGoalToList = function () {
  isRequiredValidationError = false;
  errorLabelNodes.forEach((el) => (el.innerHTML = ""));
  let categoryTitle = document.getElementById("goalCategoryTitle").innerHTML;
  validateInputs(categoryTitle);

  if (!isRequiredValidationError) {
    let goalTitle = title.value;
    let goalDeadLine = deadline.value;
    let goalHrs = hrsPerWeek.value;
    let goalTutorialLink = tutorial.value;
    let goalRecipe;
    let goalCurrentWeight;
    let goalWeight;
    let goalNotes;
    let goalProject;
    let goalWords;
    let addGoalObj;

    if (categoryTitle == "cooking") {
      goalRecipe = recipe.value;
      addGoalObj = new CookingGoal(
        goalTitle,
        goalDeadLine,
        goalHrs,
        "new",
        goalTutorialLink,
        goalRecipe
      );
      addGoalObj.addToGoalList();
      displayGoalList(cookingGoalsArr, "cooking");
    } else if (categoryTitle == "health") {
      goalCurrentWeight = currentWeight.value;
      goalWeight = document.getElementById("goalWeight").value;
      addGoalObj = new HealthGoal(
        goalTitle,
        goalDeadLine,
        goalHrs,
        "new",
        goalTutorialLink,
        goalCurrentWeight,
        goalWeight
      );
      addGoalObj.addToGoalList();
      displayGoalList(healthGoalsArr, "health");
    } else if (categoryTitle == "technical") {
      goalNotes = notes.value;
      goalProject = projects.value;
      addGoalObj = new TechnicalEducationGoal(
        goalTitle,
        goalDeadLine,
        goalHrs,
        "new",
        goalTutorialLink,
        goalNotes,
        goalProject
      );
      addGoalObj.addToGoalList();
      displayGoalList(technicalGoalsArr, "technical");
    } else {
      goalNotes = notes.value;
      goalWords = words.value;
      addGoalObj = new LanguageGoal(
        goalTitle,
        goalDeadLine,
        goalHrs,
        "new",
        goalTutorialLink,
        goalNotes,
        goalWords
      );
      addGoalObj.addToGoalList();
      displayGoalList(languageGoalsArr, "language");
    }
  }
};

let displayGoalList = function (listArr, category) {
  $("#displayGoalList").find("tbody:not(:first)").remove();
  listArr.forEach((el, index) => {
    let htmlString = el.generateTableRow(index);
    htmlString += `<td>${el.status}</td>`;

    var e = document.createElement("tr");

    e.innerHTML = htmlString;

    document
      .getElementById("displayGoalList")
      .insertAdjacentHTML("beforeend", e.innerHTML);

    let lstChild = document.getElementById("displayGoalList").lastChild;
    lstChild.className = "listItem";

    //all rows are clickable and can be edited
    lstChild.setAttribute("id", el.goalId);
    lstChild.addEventListener("click", function (e) {
      updateGoalBtn.style.display = "inline";
      changeStatusDrpDwn.disabled = false;
      document.getElementById("addGoal").style.display = "none";
      editSelectedGoal(e.target.parentElement.parentElement.id, category);
    });
  });

  document.getElementById("goalForm").reset();
};

let editSelectedGoal = function (id, category) {
  let categoryArray = [];
  if (category == "cooking") {
    categoryArray = cookingGoalsArr;
  } else if (category == "health") {
    categoryArray = healthGoalsArr;
  } else if (category == "technical") {
    categoryArray = technicalGoalsArr;
  } else {
    categoryArray = languageGoalsArr;
  }

  let editObj = categoryArray.find((el) => el.goalId == id);
  editObj.populateFormForEditing();
};

let updateGoalList = function () {
  isRequiredValidationError = false;
  errorLabelNodes.forEach((el) => (el.innerHTML = ""));
  let categoryTitle = document.getElementById("goalCategoryTitle").innerHTML;
  validateInputs(categoryTitle);

  if (!isRequiredValidationError) {
    let index;

    if (categoryTitle == "cooking") {
      index = cookingGoalsArr.findIndex((el) => el.goalId == hiddenId.value);
      cookingGoalsArr[index].updateGoal();
      displayGoalList(cookingGoalsArr, "cooking");
    } else if (categoryTitle == "health") {
      index = healthGoalsArr.findIndex((el) => el.goalId == hiddenId.value);
      healthGoalsArr[index].updateGoal();
      displayGoalList(healthGoalsArr, "health");
    } else if (categoryTitle == "technical") {
      index = technicalGoalsArr.findIndex((el) => el.goalId == hiddenId.value);
      technicalGoalsArr[index].updateGoal();
      displayGoalList(technicalGoalsArr, "technical");
    } else {
      index = languageGoalsArr.findIndex((el) => el.goalId == hiddenId.value);
      languageGoalsArr[index].updateGoal();
      displayGoalList(languageGoalsArr, "language");
    }

    updateGoalBtn.style.display = "none";
    changeStatusDrpDwn.disabled = true;
    document.getElementById("addGoal").style.display = "inline";
    document.getElementById("goalForm").reset();
  }
};

let validateInputs = function () {
  if (title.value == "") {
    titleError.innerHTML = `<span style="color:red">Please enter title</span>`;
    isRequiredValidationError = true;
  }
  if (deadline.value == "") {
    deadlineError.innerHTML = `<span style="color:red">Please enter deadline</span>`;
    isRequiredValidationError = true;
  }

  if (hrsPerWeek.value == "") {
    hrsPerWeekError.innerHTML = `<span style="color:red">Please enter hrsPerWeek</span>`;
    isRequiredValidationError = true;
  }
};
