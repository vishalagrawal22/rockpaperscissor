function computerPlay() {
    let randomNumber = Math.floor(Math.random() * 3);
    let outcomes = ["Rock", "Paper", "Scissors"];
    return outcomes[randomNumber];
}