let outcomes = ["rock", "paper", "scissor"];
let wins = 0;
let draws = 0;;

function computerPlay() {
    let randomNumber = Math.floor(Math.random() * 3);
    return outcomes[randomNumber];
}

function playRound(playerSelection, computerSelection) {
	if (playerSelection === computerSelection) {
        draws++;
        return `It is a tie, both computer and you choosed ${computerSelection}!`;
    }
    else {
        let notChoosen = outcomes.find(outcome => (outcome !== playerSelection && outcome !== computerSelection));
        let choices = { [playerSelection]: "You", [computerSelection]: "Computer" };

        if(notChoosen === "rock") {
            if (choices['scissor'] === "You") {
                wins++;
            }
            return `${choices['scissor']} Won, ${choices['paper']} Lose! Scissor beats Paper`;
        }
        else if(notChoosen === "paper") {
            if (choices['rock'] === "You") {
                wins++;
            }
            return `${choices['rock']} Won, ${choices['scissor']} Lose! Rock beats Scissor`;
        }
        else if(notChoosen === "scissor"){
            if (choices['paper'] === "You") {
                wins++;
            }
            return `${choices['paper']} Won, ${choices['rock']} Lose! Paper beats Rock`;
        }
    }
}

function game(noOfMatches) {
    for(let i = 1; i <= noOfMatches; i++){
        const playerSelection = prompt("Enter your choice(Rock ,Paper or Scissor)");
        const computerSelection = computerPlay();

        if ((outcomes.find(outcome => outcome === playerSelection) === undefined) || (playerSelection === undefined)) {
            console.warn("Please enter Rock, Paper or Scissor only");
            console.info("Reload to Retry");
        } else {
            console.log(playRound(playerSelection.toLowerCase(), computerSelection));
        }
    }
}

let noOfMatches = Number(prompt("How many matches you want to play"));
game(noOfMatches);
console.log(`Wins: ${wins}\nLoses: ${noOfMatches - wins - draws}\nDraws: ${draws}`);