const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
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

function moleUp() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add("up");
    setTimeout(() => {
        hole.classList.remove("up");
        if (!endOfGame) moleUp();
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
    moleUp();
    setTimeout(() => {
        endOfGame = true
    }, 12000)
}

startButton.addEventListener("click", () => startGame());
moles.forEach(mole => mole.addEventListener("click", caught))