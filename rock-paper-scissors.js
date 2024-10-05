// Function getComputerChoice() randomly returns rock, paper, or scissors
function getComputerChoice() {
    let randomNumber = (Math.floor((Math.random() * 100) +1))

    if (randomNumber <= 33) {
        return computerChoice = "rock";
    } else if (randomNumber > 33 && randomNumber <= 66) {
        return computerChoice = "paper";
    } else {
        return computerChoice = "scissors";
    }
}

// assigns button elements to a JS variable
const buttons = document.querySelectorAll(".btn");

// Assigns variables to the scores
let humanScore = 0;
let computerScore = 0;
let ties = 0;
let roundsPlayed = 0;
const maxRounds = 5;

// adds event listener and runs function that gets computer choice, human choice, and plays a round

buttons.forEach((btn) => {
    btn.addEventListener("click", function() {
        if (roundsPlayed < maxRounds) {
            let computerChoice = getComputerChoice();
            let humanChoice = btn.id;
            playRound(computerChoice, humanChoice);
        } else {
            alert("No more rounds! Please restart the game.");
        }
    });
});

// takes the human and computer choices as arguments, plays a single round, increments the round winner's score and logs a winner announcement
function playRound(computerChoice, humanChoice) {
    roundsPlayed++;

    if (computerChoice === humanChoice) {  
        ties++
        resultText = "The computer chose " + computerChoice + " and the human chose " + humanChoice + ". The result is: Tie"
    } else if (computerChoice === "rock") {
        if (humanChoice === "paper") {
            humanScore++
            resultText = "The computer chose " + computerChoice + " and the human chose " + humanChoice + ". The result is: Human wins";
        } else if (humanChoice === "scissors") {
            computerScore++
            resultText = "The computer chose " + computerChoice + " and the human chose " + humanChoice + ". The result is: Computer wins";
        } 
    } else if (computerChoice === "paper") {
        if (humanChoice === "scissors") {
            humanScore++
            resultText = "The computer chose " + computerChoice + " and the human chose " + humanChoice + ". The result is: Human wins";
        } else if (humanChoice === "rock") {
            computerScore++
            resultText = "The computer chose " + computerChoice + " and the human chose " + humanChoice + ". The result is: Computer wins";
        }
    } else {
        if (humanChoice === "rock") {
            humanScore++
            resultText = "The computer chose " + computerChoice + " and the human chose " + humanChoice + ". The result is: Human wins";
        } else if (humanChoice === "paper") {
            computerScore++
            resultText = "The computer chose " + computerChoice + " and the human chose " + humanChoice + ". The result is: Computer wins";
        }
    }

    // Updates results list
    const resultsList = document.getElementById("results-list");
    resultsList.appendChild(document.createElement("li"));
    let resultItem = resultsList.lastChild;
    resultItem.textContent = resultText;
    
    document.getElementById("human-score").textContent = `Human score: ${humanScore}`; // Updates scores for human
    document.getElementById("computer-score").textContent = `Computer score: ${computerScore}`; // Updates scores for computer
    const tiesPara = document.getElementById("tie").textContent = `Ties: ${ties}`; // Updates scores for ties

    // Check if the maximum rounds have been played
    if (roundsPlayed === maxRounds) {
        setTimeout(() => {
            alert(`Game over! Final scores - Human: ${humanScore}, Computer: ${computerScore}, Ties: ${ties}`);
        }, 100);
    };
};

// Reset game function
function resetGame() {
    humanScore = 0;
    computerScore = 0;
    ties = 0;
    roundsPlayed = 0;

    // Clear results list
    const resultsList = document.getElementById("results-list");
    resultsList.textContent = "";

    // Update scores display
    document.getElementById("human-score").textContent = `Human score: ${humanScore}`;
    document.getElementById("computer-score").textContent = `Computer score: ${computerScore}`;
    document.getElementById("tie").textContent = `Ties: ${ties}`;
};

const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", resetGame);