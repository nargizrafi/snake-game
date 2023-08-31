let gameOver = false;
let foodX;
let foodY;
let snakeX = 5;
let snakeY = 5;
let positionX = 0;
let positionY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

// Record score
let highScore = localStorage.getItem("high-score") || 0;
$(".hscore").text(`${highScore}`)

// Updating food-position between 0-20
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 20) + 1;
    foodY = Math.floor(Math.random() * 20) + 1;
}

//function for Game Over
const handleGameOver = () => {
    clearInterval(setIntervalId);
    $(".playzone").css({
        display: "none"
    })

    $(".gameover").css({
        display: "flex"
    })

    $(".controls").css({
        display: "none"
    })

    $(".yes-btn").on('click', function () {
        location.reload();
    })

    $(".no-btn").on('click', function () {
        window.location = './index.html'
    })

}

// Changing the direction depending on the key pressed
const changeDirection = (e) => {

    if (e.key === "ArrowUp" || e.key === "w" && positionY != 1) {
        positionX = 0;
        positionY = -1;
    } else if (e.key === "ArrowDown" || e.key === "s" && positionY != -1) {
        positionX = 0;
        positionY = 1;
    } else if (e.key === "ArrowLeft" || e.key === "a" && positionX != 1) {
        positionX = -1;
        positionY = 0;
    } else if (e.key === "ArrowRight" || e.key === "d" && positionX != -1) {
        positionX = 1;
        positionY = 0;
    }
}

$(".ctrls").on("click", function() {
    var keyName = $(this).data("key");
    changeDirection({ key: keyName });
});

// Main Game
const initGame = () => {

    if (gameOver) {
        return handleGameOver();
    };

    let gameElement = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodY, foodX]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        $(".crscore").text(`${score}`)
        $(".hscore").text(`${highScore}`);
    }

    snakeX += positionX;
    snakeY += positionY;

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];


    if (snakeX <= 0 || snakeX > 20 || snakeY <= 0 || snakeY > 20) {
        return gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {

        gameElement += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;


        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    $(".playzone").html(gameElement)
}

changeFoodPosition();
setIntervalId = setInterval(initGame, 100);
$(document).keyup(changeDirection);