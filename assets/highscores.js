// list variables for highscores.html
const backBtnEl = document.getElementById('back-btn');
const clearBtnEl = document.getElementById('clear-btn');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

function loadHighScore() {
    // sort scores by highest to lowest
    highScores.sort(function(a,b) {
    return b.score - a.score;
    })

    // create li tag for each score entry
    highScores.forEach(function(highScores) {
        let liTag = document.createElement('li');
        liTag.textContent = highScores.name + ' - ' + highScores.score;

        let showScores = document.getElementById('highscores-list');
        showScores.appendChild(liTag);
    })
};

function goBack() {
    // redirect user to return to main page
    window.location.href = './index.html';
};

function clearHighScore() {
    // clear scores in localStorage
    localStorage.clear(highScores);
};

loadHighScore();

backBtnEl.addEventListener('click', goBack);
clearBtnEl.addEventListener('click', function() {
    clearHighScore();
    window.location.reload();
});