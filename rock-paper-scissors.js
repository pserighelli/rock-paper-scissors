// Function getComputerChoice() randomly returns rock, paper, or scissors
function getComputerChoice() {
    let computerChoice = (Math.floor((Math.random() * 100) +1))

    if (computerChoice <= 33) {
        return "rock";
    } else if (computerChoice > 33 && computerChoice <= 66) {
        return "paper";
    } else {
        return "scissors";
    }
}

// Function getHumanChoice() takes user choice and returns it
function getHumanChoice() {
    let humanChoice = prompt("What do you choose: Rock, Paper or Scissors?").toLowerCase();
    return humanChoice;
}

// Variables to keep track of the players score
let humanScore = 0;
let computerScore = 0;
let ties = 0;
let invalids = 0;

// Function playGame() calls playRound() to play 5 rounds, keeps track of the scores, and declares a winner at the end
function playGame() {
    let i = 0;
    for (let i = 0; i < 5; i++) {
        // Function playRound() takes the human and computer choices as arguments, plays a single round, increments the round winner's score and logs a winner announcement
        function playRound(computerChoice, humanChoice) {
            if (computerChoice === humanChoice) {  
                ties++
                return "Tie"
            } else if (computerChoice === "rock") {
                if (humanChoice === "paper") {
                    humanScore++
                    return "Human wins";
                } else if (humanChoice === "scissors") {
                    computerScore++
                    return "Computer wins";
                } else {
                    invalids++
                    return "Invalid option, try again"
                }
            } else if (computerChoice === "paper") {
                if (humanChoice === "scissors") {
                    humanScore++
                    return "Human wins";
                } else if (humanChoice === "rock") {
                    computerScore++
                    return "Computer wins";
                } else {
                    invalids++
                    return "Invalid option, try again"
                }
            } else {
                if (humanChoice === "rock") {
                    humanScore++
                    return "Human wins";
                } else if (humanChoice === "paper") {
                    computerScore++
                    return "Computer wins";
                } else {
                    invalids++
                    return "Invalid option, try again"
                }
            }
        }

        const computerChoice = getComputerChoice();
        const humanChoice = getHumanChoice();
        const result = playRound(computerChoice, humanChoice);

        console.log("The computer chose " + computerChoice + " and the human chose " + humanChoice + ". The result is: " + result);

    }
}

playGame();

console.log("The final human score is: " + humanScore);
console.log("The final computer score is: " + computerScore);
console.log("The total number of ties and/or invalid options was: " + (ties + invalids));