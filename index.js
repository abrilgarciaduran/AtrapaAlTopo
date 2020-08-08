const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const highScoreText = document.querySelector(".highScore");
const moles = document.querySelectorAll(".mole");
const startButton = document.querySelector("button")
let lastHole;
let endOfGame = false;


function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
function randomHole(holes) {
    const randomIndex = Math.floor(Math.random() * holes.length);
    const hole = holes[randomIndex];
    if (hole == lastHole) {
        console.log("El mismo!");
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function moleUp(slowest, fastest) {
    const time = randomTime(slowest, fastest);
    const hole = randomHole(holes);
    hole.classList.add("up");
    setTimeout(() => {
        hole.classList.remove("up");
        if (!endOfGame) moleUp(slowest, fastest);
    }, time)
}
function caught(e) {
    if (!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}
function startGame() {
    scoreBoard.textContent = 0;
    endOfGame = false;
    score = 0;
    moleUp(200, 1000);
    setTimeout(() => {
        endOfGame = true;
        if (scoreBoard.textContent >= localStorage.getItem("highScore")) {
            localStorage.setItem("highScore", scoreBoard.textContent);
        }
        highScoreText.textContent = localStorage.getItem("highScore");
    }, 12000)
}

startButton.addEventListener("click", () => startGame());
moles.forEach(mole => mole.addEventListener("click", caught))

window.onload = () => {
    if (localStorage.getItem("highScore") == null) {
        localStorage.setItem("highScore", 0);
    }
    highScoreText.textContent = localStorage.getItem("highScore");
}