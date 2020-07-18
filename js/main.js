let outcomes = ["rock", "paper", "scissor"];
let wins = 0;
let draws = 0;
let loses = 0;
let currentRound = 1;
let NOOFROUNDS;

function computerPlay() {
    let randomNumber = Math.floor(Math.random() * 3);
    return outcomes[randomNumber];
}

function playRound(playerSelection, computerSelection) {
	if (playerSelection === computerSelection) {
        draws++;
        const header = document.createElement('h2');
        header.textContent = `Round Result : TIE!`;
        container.appendChild(header);
        return `It is a tie, both computer and you choosed ${computerSelection}!`;
    }
    else {
        let notChoosen = outcomes.find(outcome => (outcome !== playerSelection && outcome !== computerSelection));
        let choices = { [playerSelection]: "You", [computerSelection]: "Computer" };

        if (notChoosen === "rock") {
            if (choices['scissor'] === "You") {
                const header = document.createElement('h2');
                header.textContent = `Round Result : You Won!`;
                container.appendChild(header);
                wins++; 
            } else {
                const header = document.createElement('h2');
                header.textContent = `Round Result : You Lose!`;
                container.appendChild(header);
                loses++;
            } 
            return `${choices['scissor']} Won, ${choices['paper']} Lose! Scissor beats Paper`;
        }
        else if (notChoosen === "paper") {
            if (choices['rock'] === "You") {
                const header = document.createElement('h2');
                header.textContent = `Round Result : You Won!`;
                container.appendChild(header);
                wins++; 
            } else {
                const header = document.createElement('h2');
                header.textContent = `Round Result : You Lose!`;
                container.appendChild(header);
                loses++;
            } 
            return `${choices['rock']} Won, ${choices['scissor']} Lose! Rock beats Scissor`;
        }
        else if (notChoosen === "scissor"){
            if (choices['paper'] === "You") {
                const header = document.createElement('h2');
                header.textContent = `Round Result : You Won!`;
                container.appendChild(header);
                wins++; 
            } else {
                const header = document.createElement('h2');
                header.textContent = `Round Result : You Lose!`;
                container.appendChild(header);
                loses++;
            } 
            return `${choices['paper']} Won, ${choices['rock']} Lose! Paper beats Rock`;
        }
    }
}

function displayChoices(roundNo) {
    const header = document.createElement('h3');
    header.classList = "inline";
    header.textContent = `Pick your choice : `;
    
    const rock = document.createElement("img");
    rock.classList = "choices";
    rock.id = "rock"; 
    rock.src = "images/rock.png";
    rock.addEventListener("click", () => startGame(roundNo, "rock"));

    const paper = document.createElement("img");
    paper.classList = "choices";
    paper.id = "paper"; 
    paper.src = "images/paper.png";
    paper.addEventListener("click", () => startGame(roundNo, "paper"));

    const scissor = document.createElement("img");
    scissor.classList = "choices";
    scissor.id = "scissor"; 
    scissor.src = "images/scissor.png";
    scissor.addEventListener("click", () => startGame(roundNo, "scissor"));

    const choices = document.createElement("div");
    choices.classList = `Round${roundNo}`;
    choices.classList += " choosen";
    choices.appendChild(header);
    choices.appendChild(rock);
    choices.appendChild(paper);
    choices.appendChild(scissor);
    
    container.appendChild(choices);
}

function startGame(roundNo, choice){
    const roundsList = document.querySelectorAll(`.Round${roundNo}`);
    const currentRoundReference = roundsList[roundsList.length - 1];
    container.removeChild(currentRoundReference);
    //const header = currentRoundReference.querySelector("h3");
    //currentRoundReference.removeChild(header);
    //const imageList = currentRoundReference.querySelectorAll("img");
    //currentRoundReference.removeChild(imageList[0]);
    //currentRoundReference.removeChild(imageList[1]);
    //currentRoundReference.removeChild(imageList[2]);
    game(choice)
}

function startRound(roundNo) {
    if(roundNo > NOOFROUNDS)
    {
        console.log("Game Ended");
        displayResult();
        setTotalRounds();
        main();
    }
    else {
        const header = document.createElement('h2');
        header.textContent = `Round ${roundNo} :`;
        container.appendChild(header);
        displayChoices(roundNo);
    }
}

function game(playerSelection) {
    const computerSelection = computerPlay();
    choosenChoice("You", playerSelection);
    choosenChoice("Computer", computerSelection);
    console.log(`You choosed ${playerSelection}`);
    console.log(`Computer choosed ${computerSelection}`);
    console.log(playRound(playerSelection, computerSelection));
    currentRound++;
    startRound(currentRound);
}

function choosenChoice(user, choice) { 
    const division = document.createElement('div');
    division.classList = "choosen";

    const header = document.createElement('h3');
    header.classList = "inline";
    header.textContent = `${user} choose : `;

    const image = document.createElement('img');
    image.classList = "choices";
    image.id = `${choice}`; 
    image.src = `images/${choice}.png`;

    division.appendChild(header);
    division.appendChild(image);

    container.appendChild(division);
}

function displayResult() { 
    const result = document.createElement('div');
    const winsheader = document.createElement('h3');
    const loseheader = document.createElement('h3');
    const drawheader = document.createElement('h3');
    const header = document.createElement('h2');
    const line = document.createElement('hr');
    const restartMessage = document.createElement('h3');

    header.textContent = `Game Result :`;
    winsheader.textContent = `Wins: ${wins}`;
    loseheader.textContent = `Loses: ${loses}`;
    drawheader.textContent = `Draws: ${draws}`;
    restartMessage.textContent = "Wanna give it another shot?";

    result.id = "result";
    result.appendChild(header);
    result.appendChild(winsheader);
    result.appendChild(loseheader);
    result.appendChild(drawheader);

    container.appendChild(result);
    container.appendChild(line);
    container.appendChild(restartMessage);
    
    console.log(`Wins: ${wins}\nLoses: ${loses}\nDraws: ${draws}`);
    wins = loses = draws = 0;
    currentRound = 1;
}

function main() {
    const divisionList = document.querySelectorAll(".input");
    const division = divisionList[divisionList.length - 1];
    const roundsButtonList = division.querySelectorAll("input.rounds");
    roundsButtonList.forEach((button) => button.addEventListener('click', onClickforRoundsButton));
}

function onClickforRoundsButton (event) {
    console.log("Starting a new game");
    const divisionList = document.querySelectorAll(".input");
    const division = divisionList[divisionList.length - 1];
    const roundsButtonList = division.querySelectorAll("input.rounds");
    roundsButtonList.forEach((button) => button.removeEventListener('click', onClickforRoundsButton));
    let noOfRounds = Number(event.target.value);
    const selectedButton = event.target;
    selectedButton.style.backgroundColor = "#0000ff";
    const start = document.createElement('h3');
    start.textContent = `Starting a game of ${noOfRounds} rounds.`;
    container.appendChild(start);
    NOOFROUNDS = noOfRounds;
    startRound(1);
}

function setTotalRounds() {
    const container = document.querySelector("#container");
    const division = document.createElement('div');
    division.classList = "input";
    const header = document.createElement('h3');
    header.classList = "inline";
    header.textContent = "How many rounds would you like to play";
    division.appendChild(header);

    for (let i = 1; i <= 5; i += 2) {
        const button = document.createElement('input');
        button.type = "button";
        button.classList = "rounds";
        button.value = `${i}`;
        division.appendChild(button);
    }
    container.appendChild(division);
}

// code below runs just once
setTotalRounds();
main();