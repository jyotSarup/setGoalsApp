let cookingGoalsArr = [];
let healthGoalsArr = [];
let technicalGoalsArr = [];
let languageGoalsArr = [];

let isRequiredValidationError = false;

const healthNodes = document.querySelectorAll(".healthExclusive");
healthNodes.forEach(el => (el.style.display = "none"));

const technicalNodes = document.querySelectorAll(".technicalExclusive");
technicalNodes.forEach(el => (el.style.display = "none"));

const languageNodes = document.querySelectorAll(".languageExclusive");
languageNodes.forEach(el => (el.style.display = "none"));

const cookingNodes = document.querySelectorAll(".cookingExclusive");

const errorLabelNodes = document.querySelectorAll(".errorLabels");

class Goal {
  constructor(goalTitle, deadLine, hoursPerWeek, status, tutorials) {
    this.goalId = Date.now();
    this.goalTitle = goalTitle;
    this.deadLine = deadLine;
    this.hoursPerWeek = hoursPerWeek;
    this.status = status;
    this.tutorials = tutorials;
  }
}

class EducationGoal extends Goal {
  constructor(goalTitle, deadLine, hoursPerWeek, status, tutorials, notes) {
    super(goalTitle, deadLine, hoursPerWeek, status, tutorials);
    this.notes = notes;
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
}

class CookingGoal extends Goal {
  constructor(goalTitle, deadLine, hoursPerWeek, status, tutorials, recipe) {
    super(goalTitle, deadLine, hoursPerWeek, status, tutorials);
    this.recipe = recipe;
  }
}

let categoryIcon = document.querySelectorAll(".categoryIcon");


categoryIcon.forEach(el =>
    el.addEventListener("click", function() {
    healthNodes.forEach(el => (el.style.display = "none"));
    languageNodes.forEach(el => (el.style.display = "none"));
    technicalNodes.forEach(el => (el.style.display = "none"));
    cookingNodes.forEach(el => (el.style.display = "none"));

    let category = el.firstElementChild.innerHTML;
    document.getElementById("goalCategoryTitle").innerHTML = category;

    let displayGoalsArr = [];
    let changeNodes;

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

    changeNodes.forEach(el => {
      if (el.tagName == "TR") {
        el.style.display = "table-row";
      } else if (el.tagName == "TH") {
        el.style.display = "table-cell";
      } else {
        el.style.display = "inline";
      }
    });

    displayGoalList(displayGoalsArr, category);
    document.getElementById("goalForm").reset();
    errorLabelNodes.forEach(el => (el.innerHTML = ""));
    isRequiredValidationError = false;
  })
);

addGoalToList = function() {
  isRequiredValidationError = false;
  errorLabelNodes.forEach(el => el.innerHTML ="");
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
      cookingGoalsArr.push(addGoalObj);
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
      healthGoalsArr.push(addGoalObj);
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
      technicalGoalsArr.push(addGoalObj);
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
      languageGoalsArr.push(addGoalObj);
      displayGoalList(languageGoalsArr, "language");
    }
    // }
  }

  
};
let displayGoalList = function(listArr, category) {
  console.log(listArr);
  let htmlString = "";
  
  let existingNodes = document.querySelectorAll(".displayListRows");
  existingNodes.forEach(el => (el.remove()));

  listArr.forEach((el, index) => {

   
    htmlString += `<tr class="displayListRows" id=${index}><td>${el.goalTitle}</td>`;
    htmlString += `<td>${el.deadLine}</td>`;
    htmlString += `<td>${el.hoursPerWeek}</td>`;
    htmlString += `<td>${el.tutorials}</td>`;

    if (category == "cooking") {
      htmlString += `<td>${el.recipe}</td>`;
    } else if (category == "health") {
      htmlString += `<td>${el.currentWeight}</td>`;
      htmlString += `<td>${el.goalWeight}</td>`;
    } else if (category == "technical") {
      htmlString += `<td>${el.notes}</td>`;
      htmlString += `<td>${el.project}</td>`;
    } else {
      htmlString += `<td>${el.notes}</td>`;
      htmlString += `<td>${el.words}</td>`;
    }
    htmlString += `<td><select><option value="new">new</option>
  <option value="inProgress">in progress</option>
  <option value="completed">completed</option></select></td>`;
    htmlString += `</tr>`;
  });

  let listTable = document.getElementById("displayGoalList").innerHTML;
  document.getElementById("displayGoalList").innerHTML =listTable + htmlString;
  document.getElementById("goalForm").reset();
};

let validateInputs = function() {
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