var wordBlank = document.querySelector(".word-blanks");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start");

var chosenWord = "";
var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;

var lettersInChosenWord = [];
var blankLetters = [];

var words = ["Heusel", "Sizemore", "Almond", "William", "Caleb", "Ethan", "Nicholas", "Claire"];

function init() {
    getWins();
    getLosses();
}

function startGame() {
    isWin = false;
    timerCount = 15;
    startButton.disabled = true;
    renderBlanks();
    startTimer();
}

function winGame() {
    wordBlank.textContent = "YOU WON!";
    winCounter++;
    startButton.disabled = false;
    setWins();
}

function loseGame() {
    wordBlank.textContent = "YOU DIED";
    loseCounter++;
    startButton.disabled = false;
    setLosses();
}

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            if (isWin && timerCount > 0) {
                clearInterval(timer);
                winGame();
            }
        }

        if (timerCount === 0) {
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}

function renderBlanks() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    lettersInChosenWord = chosenWord.split("");
    numBlanks = lettersInChosenWord.length;
    blankLetters = [];
    for (var i = 0; i < numBlanks; i++) {
        blankLetters.push("_");
    }

    wordBlank.textContent = blankLetters.join(" ");
}

function setWins() {
    win.textContent = winCounter;
    localStorage.setItem("win-count", winCounter);
}

function setLosses() {
    lose.textContent = loseCounter;
    localStorage.setItem("lose-count", loseCounter);
}

function getWins() {
    var storedWins = localStorage.getItem("win-count");
    if (storedWins === null) {
        winCounter = 0;
    } else {
        winCounter = storedWins;
    }

    win.textContent = winCounter;
}

function getLosses() {
    var storedLosses = localStorage.getItem("lose-count")
    if (storedLosses === null) {
        loseCounter = 0;
    } else {
        loseCounter = storedLosses;
    }

    lose.textContent = loseCounter;
}

function checkWin() {
    if (chosenWord === blankLetters.join("")) {
        isWin = true;
    }
}

function checkLetters(letter) {
    var letterInWord = false;
    for (var i = 0; i < numBlanks; i++) {
        if (chosenWord[i] === letter) {
            letterInWord = true;
        }
    }
    if (letterInWord) {
        for (var j = 0; j < numBlanks; j++) {
            if (chosenWord[j] === letter) {
                blankLetters[j] = letter;
            }
        }
        wordBlank.textContent = blankLetters.join(" ");
    }
}

document.addEventListener("keydown", function(event) {
    if (timerCount === 0) {
        return;
    }

    var key = event.key.toLowerCase();
    var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyx0123456789 ".split("");
    if (alphabetNumericCharacters.includes(key)) {
        var letterGuessed = event.key;
        checkLetters(letterGuessed);
        checkWin();
    }
});

startButton.addEventListener("click", startGame);

init();

var resetButton = document.querySelector(".reset");

function resetGame() {
    winCounter = 0;
    loseCounter = 0;
    setWins();
    setLosses();
}

resetButton.addEventListener("click", resetGame);