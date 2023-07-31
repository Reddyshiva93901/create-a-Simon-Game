const buttons = ["green", "red", "yellow", "blue"];
let sequence = [];
let playerSequence = [];
let level = 0;
let isGameStarted = false;
let isStrictMode = false;

function startGame() {
  if (!isGameStarted) {
    sequence = [];
    playerSequence = [];
    level = 0;
    isGameStarted = true;
    generateNextSequence();
  }
}

function resetGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  isGameStarted = false;
  isStrictMode = false;
}

function generateNextSequence() {
  playerSequence = [];
  level++;
  document.getElementById("startBtn").textContent = "Level " + level;
  const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
  sequence.push(randomButton);
  playSequence();
}

function playSequence() {
  let i = 0;
  const interval = setInterval(() => {
    highlightButton(sequence[i]);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
    }
  }, 1000);
}

function highlightButton(button) {
  const buttonElement = document.getElementById(button);
  buttonElement.classList.add("highlight");
  setTimeout(() => buttonElement.classList.remove("highlight"), 500);
  playSound(button);
}

function playSound(button) {
  const audio = new Audio(button + ".mp3");
  audio.play();
}

function checkPlayerInput(button) {
  if (isGameStarted) {
    playerSequence.push(button);
    const index = playerSequence.length - 1;
    if (playerSequence[index] !== sequence[index]) {
      if (isStrictMode) {
        alert("Wrong move! Restarting the game...");
        resetGame();
        startGame();
      } else {
        alert("Wrong move! Try again.");
        playerSequence = [];
        playSequence();
      }
    } else {
      if (playerSequence.length === sequence.length) {
        if (level === 20) {
          alert("Congratulations! You won!");
          resetGame();
        } else {
          setTimeout(generateNextSequence, 1000);
        }
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const gameButtons = document.querySelectorAll(".button");
  gameButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (isGameStarted) {
        checkPlayerInput(button.id);
      }
    });
  });

  document.getElementById("resetBtn").addEventListener("click", resetGame);
});
