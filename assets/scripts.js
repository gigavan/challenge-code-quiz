containerEl = document.querySelector(".opening-container");

var scoreCounter = 0;

var timeLeft = 75;
var timeInterval;

var scores = [];
var timerEl = document.getElementById('timer');
var quizContainerEl = document.createElement("div");
var questionEl = document.createElement("h1");
questionEl.className = "question";
var answerListEl = document.createElement("ul");
answerListEl.className = "answer-list";
var answerChoiceOne = document.createElement("button");
answerChoiceOne.className = ("btn");
var answerChoiceTwo = document.createElement("button");
answerChoiceTwo.className = ("btn");
var answerChoiceThree = document.createElement("button");
answerChoiceThree.className = ("btn");
var answerChoiceFour = document.createElement("button");
answerChoiceFour.className = ("btn");
var closingContainerEl = document.createElement("div");
var viewScoreContainer = document.createElement("div");