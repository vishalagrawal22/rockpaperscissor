let outcomes = ["rock", "paper", "scissor"];
let wins = 0;
let draws = 0;
let loses = 0;
let Selected;
const container = document.querySelector("#container");

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
            (choices['scissor'] === "You") ? wins++ : loses++;
            return `${choices['scissor']} Won, ${choices['paper']} Lose! Scissor beats Paper`;
        }
        else if(notChoosen === "paper") {
            (choices['rock'] === "You") ? wins++ : loses++;
            return `${choices['rock']} Won, ${choices['scissor']} Lose! Rock beats Scissor`;
        }
        else if(notChoosen === "scissor"){
            (choices['paper'] === "You") ? wins++ : loses++;
            return `${choices['paper']} Won, ${choices['rock']} Lose! Paper beats Rock`;
        }
    }
}

function game(noOfRounds) {
    for(let roundNo = 1; roundNo <= noOfRounds; roundNo++){
        displayChoices(roundNo);
        const playerSelection = Selected;
        const computerSelection = computerPlay();

        if ((playerSelection === undefined) || (outcomes.find(outcome => outcome === playerSelection.toLowerCase()) === undefined)) {
            console.warn("Please enter Rock, Paper or Scissor only");
            console.info("Reload to Retry");
        } else {
            console.log(playRound(playerSelection.toLowerCase(), computerSelection));
        }
    }
}

const roundsButtonList = document.querySelectorAll(".rounds");
roundsButtonList.forEach((button) => button.addEventListener('click',(event) => {
    let noOfRounds = Number(event.target.value);
    const start = document.createElement('h3');
    start.textContent = `Starting a game of ${noOfRounds} rounds.`;
    container.appendChild(start);
    game(noOfRounds);
    console.log(`Wins: ${wins}\nLoses: ${loses}\nDraws: ${draws}`);
    wins = loses = draws = 0;
}));

function displayChoices(roundNo) {
    const rock = document.createElement("img");
    rock.classList = "choices";
    rock.id = "rock"; 
    rock.src = "images/rock.png";
    rock.addEventListener("click", () => Selected = "rock");

    const paper = document.createElement("img");
    paper.classList = "choices";
    paper.id = "paper"; 
    paper.src = "images/paper.png";
    paper.addEventListener("click", () => Selected = "paper");

    const scissor = document.createElement("img");
    scissor.classList = "choices";
    scissor.id = "scissor"; 
    scissor.src = "images/scissor.png";
    scissor.addEventListener("click", () => Selected = "scissor");

    const choices = document.createElement("div");
    choices.classList = `Round ${roundNo}`;
    choices.appendChild(rock);
    choices.appendChild(paper);
    choices.appendChild(scissor);
    
    container.appendChild(choices);
}