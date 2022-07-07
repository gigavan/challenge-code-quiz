// variables for index.html
const displayTime = document.getElementById('timer');
const questionContainerEl = document.getElementById('question-container');
const intro = document.getElementById('intro');
const questionEl = document.getElementById('question');
const answerButtonEl = document.getElementById('answer-buttons');
const startButton = document.getElementById('start-btn');
const displayAnswer = document.getElementById('answer');
const outro = document.getElementById('outro');
const highScore = document.getElementById('high-score');
const initialsEl = document.getElementById('user-initials');
const submitScoreEl = document.getElementById('submit-btn');

let countDown;
let time = 75;
let score = 0;
let shuffleQuestions, currentQuestionIndex;

// begin quiz!
startButton.addEventListener('click', startQuiz);

// begin the quiz upon button click
function startQuiz() {
    startButton.classList.add('hide');
    intro.classList.add('hide');
    questionContainerEl.classList.remove('hide');
    displayTime.classList.remove('hide');
    shuffleQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    timer();
    setQuestion();
};

// countdown timer
function timer() {
    countDown = setInterval(function() {
        if (time > 1) {    
            displayTime.innerHTML = 'Time Remaining: ' + time + ' seconds';
            time--;
        } else if (time === 1) {
            displayTime.innerHTML = 'Time Remaining: ' + time + ' second';
            time--;
        } else {
            endQuiz();
        }
    }, 1000);
};

// set up the next question & reset any changes
function setQuestion() {
    resetState();
    questionEl.classList.remove('hide');
    displayQuestion(shuffleQuestions[currentQuestionIndex]);
};

function resetState() {
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild);
    }
};

// display questions & answer buttons
function displayQuestion(question) {
    questionEl.innerText = question.question;
    for (let i = 0; i < question.answer.length; i++) {
        let answerButton = document.createElement('button');
        answerButton.innerText = question.answer[i].text;
        answerButton.classList.add('btn');
        answerButton.addEventListener('click', function () {

            // display 'correct' or 'wrong' after choosing an answer
            
            let answer = question.answer[i].correct;
            if (answer) {
                answerCorrect();
                score++;
            } else {
                answerWrong();
                time -= 10; // incorrect answer subtracts 10 time from time
            }

            // set up the next question after choosing an answer or end quiz if no questions left
            if (shuffleQuestions.length > currentQuestionIndex + 1) {
                currentQuestionIndex++;
                setQuestion();
            } else {
                endQuiz();
            }

            // 'correct' or 'wrong' disappears after 2 time
            setTimeout(function() {
                displayAnswer.classList.add('hide');
            }, 2000);
        });
        answerButtonEl.appendChild(answerButton);
    }
};

// display 'correct' after correct response
function answerCorrect() {
    displayAnswer.classList.remove('hide');
    displayAnswer.textContent = 'Correct!';
    displayAnswer.setAttribute('style', 'color: #00ad93');
};

// display 'wrong' after incorrect response
function answerWrong() {
    displayAnswer.classList.remove('hide');
    displayAnswer.textContent = 'Wrong!';
    displayAnswer.setAttribute('style', 'color: #ef626c');
};

// end quiz & display user score
function endQuiz() {
    // stop timer
    clearInterval(countDown);

    outro.classList.remove('hide');
    questionContainerEl.classList.add('hide');
    // display score
    displayTime.textContent = 'Score: ' + time;
    highScore.innerHTML = time;
    submitScoreEl.addEventListener('click', saveHighScore);
};

// submit new score
function saveHighScore(event) {
    event.preventDefault();
    // set valid input for submitting initials
    let initials = initialsEl.value;
    if (initials.length <= 1) {
        alert("Please enter your initials.");
        return;
    }

    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    // add new high score
    const newScore = {
        name: initials,
        score: time
    }

    // add new score into high score list
    highScores.push(newScore);
    // sort high scores list
    highScores.sort( (a,b) =>  b.newScore - a.newScore);
    // save scores to localStorage
    localStorage.setItem('highScores', JSON.stringify(highScores));

    // redirect user to high score page
    window.location.href = './highscores.html';
};

let questions = [
    {
        question: 'What does CSS stand for?',
        answer: [
            { text: '1. Common Style Sheet', correct: false },
            { text: '2. Colorful Style Sheet', correct: false },
            { text: '3. Cascading Style Sheet', correct: true },
            { text: '4. Computer Style Sheet', correct: false }
        ]
    },
    {
        question: 'The condition in an if / else statement is enclosed with ___.',
        answer: [
            { text: '1. quotes', correct: false },
            { text: '2. curly brackets', correct: false },
            { text: '3. parenthesis', correct: true },
            { text: '4. square brackets', correct: false }
        ]
    },
    {
        question: 'Arrays in JavaScript is used to store ___.',
        answer: [
            { text: '1. numbers and strings', correct: false },
            { text: '2. other arrays', correct: false },
            { text: '3. booleans', correct: false },
            { text: '4. all of the above', correct: true }
        ]
    },
    {
        question: 'String values must be enclosed within ___ when being assigned to variables.',
        answer: [
            { text: '1. commas', correct: false },
            { text: '2. curly brackets', correct: false },
            { text: '3. quotes', correct: true },
            { text: '4. parenthesis', correct: false }
        ]
    },
    {
        question: 'What does HTML stand for',
        answer: [
            { text: '1. Hyper Text Preprocessor', correct: false },
            { text: '2. Hyper Text Medium Language', correct: false },
            { text: '3. Hyper Text Multiple Language', correct: false },
            { text: '4. Hyper Text Markup Language', correct: true }
        ]
    },
    {
        question: 'Which of the following is not a valid JavaScript variable name?',
        answer: [
            { text: '1. 2names', correct: true },
            { text: '2. _first_and_last_name', correct: false },
            { text: '3. FirstAndLast', correct: false },
            { text: '4. none of the above', correct: false }
        ]
    },
    {
        question: 'Which of the following are capabilities of functions in JavaScript?',
        answer: [
            { text: '1. return a value', correct: false },
            { text: '2. accept parameters', correct: true },
            { text: '3. both 1 and 2', correct: false },
            { text: '4. none of the above', correct: false }
        ]
    },

];