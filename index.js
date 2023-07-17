const options = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const computerChoice = options[Math.floor(Math.random() * options.length)];
  return computerChoice;
}

function getPlayerChoice() {
  let playerChoice;

  while (!options.includes(playerChoice)){
    playerChoice = prompt("Enter rock, paper, or scissors: ");
    if (playerChoice === null) {
      throw new Error('Terminate Script');
    }
  }
  return playerChoice;
}


function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();

  if (playerSelection === computerSelection) {
    return `Draw! Player: ${playerSelection} and Computer: ${computerSelection}`;
  }

  if (
    (playerSelection === 'rock' && computerSelection === 'scissors') || 
    (playerSelection === 'paper' && computerSelection === 'rock') || 
    (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
    playerScore++;
    return `You Win! ${playerSelection} beats ${computerSelection}`;
  }
  
  computerScore++;
  return `You Lose! ${computerSelection} beats ${playerSelection}`;
  
}


function game(){

  for (let i = 0; i < 5; i++){
    const playerSelection = getPlayerChoice();
    const computerSelection = getComputerChoice();
    console.log(playRound(playerSelection, computerSelection));
  }

  let finalResult;
  if (playerScore > computerScore){
    finalResult = "Player Win"
  } else if (playerScore == computerScore){
    finalResult = "Draw";
  } else {
    finalResult = "Computer Win";
  }
  console.log(`${finalResult}! Player Score: ${playerScore} Computer Score: ${computerScore}`);
}

game();