const options = Array.from(document.querySelectorAll('.option'));
const result = document.querySelector('header');
const playAgainText = document.querySelector('#play-again-text');

const DEFAULT_RESULT_TEXT = result.textContent;

let playerpoint = document.querySelector('#player-point-count');
let computerpoint = document.querySelector('#computer-point-count');

function removeTransition(event) {
  console.log(event.propertyName);
  if (event.propertyName === '') {
    return;
  }
  if (event.target.classList.value !== '') {
    event.target.textContent = +event.target.textContent + 1;
    checkWinner();
  }
  event.target.classList.remove('increment');
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
  playerpoint.textContent = 0;
  computerpoint.textContent = 0;
  playAgainText.classList.remove('visible');
  gameStart();
}

function checkWinner() {
  if (+playerpoint.textContent >= 5) {
    result.textContent = 'PLAYER WIN!';
    gameOver();
  } else if (+computerpoint.textContent >= 5) {
    result.textContent = 'COMPUTER WIN!';
    gameOver();
  }
}

function playRound(event) {
  const playerSelection = this.id;
  const computerSelection = getComputerChoice().toLowerCase();

  if (playerSelection === computerSelection) {
    result.textContent = `Draw! Both are ${playerSelection}`;
  } else if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    // playerpoint.textContent = +playerpoint.textContent + 1;
    playerpoint.classList.add('increment');
    result.textContent = `You Win! 
    ${playerSelection} beats ${computerSelection}`;
  }
  else {
    // computerpoint.textContent = +computerpoint.textContent + 1;
    computerpoint.classList.add('increment');
    result.textContent = `You Lose! 
    ${computerSelection} beats ${playerSelection}`;
  }
}

transitionEndListener(playerpoint);
transitionEndListener(computerpoint);
gameStart();