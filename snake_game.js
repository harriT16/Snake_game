let canvas, ctx;
let box = 20;
let snake = [];
let food = {};
let direction = "RIGHT"; // Initialize direction

// Initialize game
function init() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    snake = [{ x: 0, y: 0 }];
    spawnFood();
    setInterval(gameLoop, 100); // Set a time interval for updates
}

// Spawn food
function spawnFood() {
    food.x = Math.floor(Math.random() * 20) * box;
    food.y = Math.floor(Math.random() * 20) * box;
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Snake head coordinates
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Move the snake
    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    // Snake eats food
    if (snakeX === food.x && snakeY === food.y) {
        spawnFood();
    } else {
        snake.pop();
    }

    // Add new head
    let newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);
}

document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

init();
