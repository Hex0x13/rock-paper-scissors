const options = Array.from(document.querySelectorAll('.option'));
const result = document.querySelector('#result');
const playAgainText = document.querySelector('#play-again-text');

const DEFAULT_RESULT_TEXT = result.textContent;
const colors = {
  default: 'rgb(50, 177, 250)',
  player: 'rgb(5, 205, 205)',
  computer: 'rgb(205, 5, 100)'
};

let playerpoint = document.querySelector('#player-point-count');
let computerpoint = document.querySelector('#computer-point-count');

function removeTransition(event) {
  if (event.propertyName !== 'color') {
    return;
  }
  if (this.classList.value !== '') {
    this.textContent = +this.textContent + 1;
    checkWinner();
  }
  this.classList.remove('increment');
}

function transitionEndListener(element) {
  element.addEventListener('transitionend', removeTransition);
}

function getComputerChoice() {
  const options = ['rock', 'paper', 'scissors'];
  const computerChoice = options[Math.floor(Math.random() * options.length)];
  return computerChoice;
}

function gameStart() {
  options.forEach(option => {
    option.addEventListener('click', playRound);
  });
}

function gameOver() {
  options.forEach(option => option.removeEventListener('click', playRound));
  playAgainText.classList.add('visible');
  window.addEventListener('dblclick', resetGame, {once: true});
}

function resetGame() {
  result.textContent = DEFAULT_RESULT_TEXT;
  result.style.backgroundColor = colors.default;
  playerpoint.textContent = 0;
  computerpoint.textContent = 0;
  playAgainText.classList.remove('visible');
  gameStart();
}

function checkWinner() {
  if (+playerpoint.textContent >= 5) {
    result.textContent = '🙍‍♂️ PLAYER WIN!';
    result.style.backgroundColor = colors.player;
    gameOver();
  } else if (+computerpoint.textContent >= 5) {
    result.textContent = '🤖 COMPUTER WIN!';
    result.style.backgroundColor = colors.computer;
    gameOver();
  }
}

function playRound(event) {
  const playerSelection = this.id;
  const computerSelection = getComputerChoice().toLowerCase();

  if (playerSelection === computerSelection) {
    result.textContent = `Draw! Both are ${playerSelection}`;
    result.style.backgroundColor = colors.default;
  } else if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    // playerpoint.textContent = +playerpoint.textContent + 1;
    playerpoint.classList.add('increment');
    result.textContent = `You Win! ${playerSelection} beats ${computerSelection}`;
    result.style.backgroundColor = colors.player;
  }
  else {
    // computerpoint.textContent = +computerpoint.textContent + 1;
    computerpoint.classList.add('increment');
    result.textContent = `You Lose! ${computerSelection} beats ${playerSelection}`;
    result.style.backgroundColor = colors.computer;
  }
}

transitionEndListener(playerpoint);
transitionEndListener(computerpoint);
gameStart();