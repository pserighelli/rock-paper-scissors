document.getElementById("reset-btn").style.display = "none";

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
};

// Assigns variables to the scores
let humanScore = 0;
let computerScore = 0;
let ties = 0;
let roundsPlayed = 0;
const maxRounds = 5;

// assigns human choice button elements to a JS variable
const buttons = document.querySelectorAll(".btn");

// adds event listener and runs function that gets computer choice, human choice, and plays a round
let isThrottled = false;

buttons.forEach((btn) => {
    btn.addEventListener("click", function() {
        if (isThrottled) return; // Exit if function is already running
        if (roundsPlayed < maxRounds) {
            isThrottled = true; // Set flag to indicate throttling

            btn.classList.add("active-btn");

            let computerChoice = getComputerChoice();

            let computerChoiceWrapper = document.getElementById(`computer-choice-${computerChoice}`);
            computerChoiceWrapper.classList.remove("hide");

            let humanChoice = btn.id;

            playRound(computerChoice, humanChoice);
            setTimeout(function() {
                isThrottled = false; // reset after the round is played
                btn.classList.remove("active-btn");
                computerChoiceWrapper.classList.add("hide");
            }, 1000);

        } else {
            alert("No more rounds! Please restart the game.");
        }
    });
});

// takes the human and computer choices as arguments, plays a single round, increments the round winner's score and logs a winner announcement
function playRound(computerChoice, humanChoice) {
    roundsPlayed++;

    // assigns human and computer scores on the table to variables based on round number
    const humanScoreTable = document.getElementById(`human_round${[roundsPlayed]}`);
    const computerScoreTable = document.getElementById(`computer_round${[roundsPlayed]}`);
    const tieScoreTable = document.getElementById(`tie_round${[roundsPlayed]}`);

    const iconForHuman = document.createElement("img");
    iconForHuman.className = "table-icon"
    iconForHuman.src = `./assets/${humanChoice}.svg`;
    humanScoreTable.appendChild(iconForHuman);

    const iconForComputer = document.createElement("img");
    iconForComputer.className = "table-icon"
    iconForComputer.src = `./assets/${computerChoice}.svg`;
    computerScoreTable.appendChild(iconForComputer);

    const iconForTie = document.createElement("img");
    iconForTie.className = "table-icon";
    iconForTie.src = "./assets/tie.svg";

    if (computerChoice === humanChoice) {  
        ties++
        tieScoreTable.appendChild(iconForTie);
        iconForTie.classList.add("tie");
    } else if (computerChoice === "rock") {
        if (humanChoice === "paper") {
            humanScore++
            iconForHuman.classList.add("win");
            iconForComputer.classList.add("loss");
        } else if (humanChoice === "scissors") {
            computerScore++
            iconForHuman.classList.add("loss");
            iconForComputer.classList.add("win");
        } 
    } else if (computerChoice === "paper") {
        if (humanChoice === "scissors") {
            humanScore++
            iconForHuman.classList.add("win");
            iconForComputer.classList.add("loss");
        } else if (humanChoice === "rock") {
            computerScore++
            iconForHuman.classList.add("loss");
            iconForComputer.classList.add("win");
        }
    } else {
        if (humanChoice === "rock") {
            humanScore++
            iconForHuman.classList.add("win");
            iconForComputer.classList.add("loss");
        } else if (humanChoice === "paper") {
            computerScore++
            iconForHuman.classList.add("loss");
            iconForComputer.classList.add("win");
        }
    };

    // Provides final result
    if (roundsPlayed === 5) {
        const finalResult = document.getElementById("final-result");
        if (humanScore > computerScore) {
            finalResult.appendChild(document.createElement("h2")).textContent = "Human wins!";
        } else if (computerScore > humanScore) {
            finalResult.appendChild(document.createElement("h2")).textContent = "Computer wins!";
        } else {
            finalResult.appendChild(document.createElement("h2")).textContent = "It's a tie!";
        }
        document.getElementById("versus").style.display = "none";
        document.getElementById("reset-btn").style.display = "";
    };

    // Updates total scores
    document.getElementById("human-score").textContent = humanScore;
    document.getElementById("computer-score").textContent = computerScore;
    document.getElementById("tie").textContent = ties;

};


// Reset game function
function resetGame() {
    humanScore = 0;
    computerScore = 0;
    ties = 0;
    roundsPlayed = 0;

    // Clear table
    document.querySelectorAll(".table-icon").forEach(img => {
        img.remove();
    });

    document.getElementById("reset-btn").style.display = "none";
    document.getElementById("versus").style.display = "";

    const finalResult = document.getElementById("final-result");
    finalResult.removeChild(finalResult.querySelector("h2"));

    // Return scores to 0
    document.getElementById("human-score").textContent = humanScore;
    document.getElementById("computer-score").textContent = computerScore;
    document.getElementById("tie").textContent = ties;
};

const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", resetGame);