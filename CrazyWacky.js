var StartContainer = document.getElementById("Start-Journey")
var startbtn = document.getElementById("startbtn")
var QuestionContainer = document.getElementById("Questions")
var QuestionEl = document.getElementById("Question")
var AnswersEl = document.getElementById("Answers")
var userAnswer = '';
var numCorrect = 0;
var output = [];
var answers;
var endContainer = document.getElementById("end")
var TimeEl = document.getElementById("timer")
var CurentQuestionIndex = 0
var Time = 300
var TimerId


var localStorageName = ""
var highScore;

var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above"
    ],
    answer: "all of the above"
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log"
  }
];

function StartQuiz() {
  CurentQuestionIndex = 0
  StartContainer.setAttribute("class", "hide")
  QuestionContainer.classList.remove("hide")
  TimerId = setInterval(countdown, 1000)
  TimeEl.textContent = "Time: " + Time
  getQuestion(questions)
}

 function restartQuiz(){
QuestionContainer.setAttribute("class", "hide")
StartContainer.classList.remove("hide")
endContainer.innerHTML = ""
Time = 300

 }

function countdown() {
  Time--
  TimeEl.textContent = "Time: " + Time

  if (Time <= 0) {
    endquiz()
  }
}
function getQuestion() {
  var CurentQuestion = questions[CurentQuestionIndex];
  QuestionEl.textContent = CurentQuestion.title
  AnswersEl.innerHTML = ""
  CurentQuestion.choices.forEach(function (choice) {
    console.log(choice)
    var Choicebtn = document.createElement("button")
    Choicebtn.textContent = choice
    Choicebtn.setAttribute("value", choice)
    Choicebtn.addEventListener("click", function (e) {
      checkanswer(e)
    })
    AnswersEl.appendChild(Choicebtn)
    // for(var i=0; i<questions.length; i++){
    //     answers = [];
    //     answers.push(
    //         '<label>'
    //         + '<input type="radio" name="question'+i+'" value"'+choice+'">'
    //         + choice +':'
    //         +questions[i].questions[choice]
    //         + '</label>'
    //     )
    // output.push(
    //     '<div class="qustion">' +questions[i].question + '</div>'
    //     + '<div class="answers">' + answers.join('') + '</div>'
    // )
    // QuestionContainer.innerHTML = output.join('');
    // }
  }
  )


}

function nextQuestions() {
  if (CurentQuestionIndex >= questions.length - 1) {
    endquiz()

    console.log(CurentQuestionIndex)
  }
  else {
    CurentQuestionIndex++
  }

}

function checkanswer(e) {
  console.log(e.target.innerHTML)
  if (e.target.innerHTML === questions[CurentQuestionIndex].answer) {
    numCorrect++;
    nextQuestions();
    getQuestion();
    console.log("correct")
  }
  else {
    Time = Time - 10
    if (Time <= 0) {
      endquiz()
    }
  }
}

var showBest = function displayScore() {
highScore = JSON.parse(localStorage.getItem("highscore")) || []

if(localStorage.getItem(localStorageName) == null) {
  highScore = 0;
} else {
  highScore = localStorage.getItem(localStorageName);
}
  var bestString = "";
  var highScore = Math.max.apply(Math, scores);
  for (var i in scores) {
      if (scores[i] > highScore) highScore = scores[i];
      bestString += "High Score Student = " + names[i] + "\n" + "High Score = " + highScore;
  }
  $("results").value = bestString;
};
  


function endquiz() {
  clearInterval(TimerId)
  window.alert("The Quiz is now concluded");
  setPlayerInfo()


}

function setPlayerInfo() {

  window.alert("Thank you for playing! Please enter your name!")
 
  var playerInput = document.createElement("INPUT")
  playerInput.placeholder = "Enter name here."
  endContainer.appendChild(playerInput)

  var Choicebtn = document.createElement("button")
  Choicebtn.textContent = "Submit your name"

  Choicebtn.addEventListener("click", function (e) {
    var highScore = JSON.parse(localStorage.getItem("highscore")) || []

    var newScore = {
      score: Time, name: playerInput.value
    }
    highScore.push(newScore)
    localStorage.setItem("highscore", JSON.stringify(highScore))

    var playAgainConfirm = window.confirm("would you like to play again?");
    if (playAgainConfirm) {
      restartQuiz();
    }
    else {
      window.alert("Thank you for playing!");
      restartQuiz();
    }
  })
  endContainer.appendChild(Choicebtn)

}

startbtn.onclick = StartQuiz
