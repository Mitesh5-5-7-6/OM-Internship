let score = JSON.parse(localStorage.getItem('score')) ||
{
    Wins: 0,
    Losses: 0,
    Ties: 0
};

updateScoreElement();

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Match Tie';
        } else if (computerMove === 'paper') {
            result = 'You Win';
        } else if (computerMove === 'scissors') {
            result = 'You Lose';
        }
        if (result === 'You Win') {
            score.Wins += 1;
        } else if (result === 'You Lose') {
            score.Losses += 1;
        }
        else if (result === 'Match Tie') {
            score.Ties += 1;
        }

        localStorage.setItem('score', JSON.stringify(score))
        updateScoreElement();
        document.querySelector('.result').innerHTML = result;
        document.querySelector('.moves').innerHTML = `You <img src="./${playerMove}-emoji.png" class="move-icon" alt=""> <img src="./${computerMove}-emoji.png" class="move-icon" alt=""> Computer`;

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You Win';
        } else if (computerMove === 'paper') {
            result = 'Match Tie';
        } else if (computerMove === 'scissors') {
            result = 'You Lose';
        }
        if (result === 'Match Win') {
            score.Wins += 1;
        } else if (result === 'Match Lose') {
            score.Losses += 1;
        }
        else if (result === 'Match Tie') {
            score.Ties += 1;
        }
        localStorage.setItem('score', JSON.stringify(score))
        updateScoreElement();
        document.querySelector('.result').innerHTML = result;
        document.querySelector('.moves').innerHTML = `You <img src="./${playerMove}-emoji.png" class="move-icon" alt=""> <img src="./${computerMove}-emoji.png" class="move-icon" alt=""> Computer`;
        // document.querySelector('.moves').innerHTML = `You ${playerMove} - ${computerMove} Computer `;

    } else if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'Match Lose';
        } else if (computerMove === 'paper') {
            result = 'Match Win';
        } else if (computerMove === 'scissors') {
            result = 'Match Tie';
        }
        if (result === 'Match Win') {
            score.Wins += 1;
        } else if (result === 'Match Lose') {
            score.Losses += 1;
        }
        else if (result === 'Match Tie') {
            score.Ties += 1;
        }

        localStorage.setItem('score', JSON.stringify(score))

        updateScoreElement();
        document.querySelector('.result').innerHTML = result;
        document.querySelector('.moves').innerHTML = `You <img src="./${playerMove}-emoji.png" class="move-icon" alt=""> <img src="./${computerMove}-emoji.png" class="move-icon" alt=""> Computer`;
        // document.querySelector('.moves').innerHTML = `You ${playerMove} - ${computerMove} Computer `;
    }
}
function pickComputerMove() {
    const randomNumber = Math.random()

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock'
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper'
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors'
    }

    return computerMove;
}
function updateScoreElement() {
    document.querySelector('.score').innerHTML = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties:${score.Ties}`
}