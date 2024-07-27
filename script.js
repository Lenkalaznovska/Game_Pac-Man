// Setting the width and height of the game board
let width = 600;
let height = 600;

// Size of individual blocks on the game board
let blockSize = 30;

// Drawing the game board
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

// Pressed keys
let keys = [];

// Items in the game
let fruits = [];

// Displaying the score
let scoreElement = document.getElementById("score");
let score = 0;

// Displaying the remaining time
let timeElement = document.getElementById("time");
let time = 0;

// Displaying the end game message
let endElement = document.getElementById("end");
let endMessage = document.getElementById("message");

// Game board - 1 indicates a wall, 0 indicates an empty space
let board = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Default player position
let player = {
  // Player's position on x and y axes
  x: 12,
  y: 2,
};

// Wall image
let wall = new Image();
wall.src = "img/wall.png";

// Main character image
let hero = new Image();
hero.src = "img/down.png";

// Item images
let watermelon = new Image();
watermelon.src = "img/watermelon.png";

let raspberry = new Image();
raspberry.src = "img/raspberry.png";

let peach = new Image();
peach.src = "img/peach.png";

let apple = new Image();
apple.src = "img/apple.png";

let orange = new Image();
orange.src = "img/orange.png";

// Adjusting the height and width of the canvas (game area)
canvas.width = width;
canvas.height = height;

// Function to create items in the game
function createPills() {
  fruits.push({
    x: 1,
    y: 1,
    imageObject: peach,
  });

  fruits.push({
    x: 1,
    y: 15,
    imageObject: apple,
  });

  fruits.push({
    x: 10,
    y: 18,
    imageObject: peach,
  });

  fruits.push({
    x: 5,
    y: 3,
    imageObject: watermelon,
  });

  fruits.push({
    x: 14,
    y: 12,
    imageObject: peach,
  });

  fruits.push({
    x: 15,
    y: 18,
    imageObject: apple,
  });

  fruits.push({
    x: 5,
    y: 11,
    imageObject: raspberry,
  });

  fruits.push({
    x: 10,
    y: 11,
    imageObject: watermelon,
  });

  fruits.push({
    x: 18,
    y: 5,
    imageObject: raspberry,
  });

  fruits.push({
    x: 9,
    y: 5,
    imageObject: orange,
  });
}

// Function to draw the game board and items
function generateBoard() {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === 1) {
        ctx.drawImage(wall, x * blockSize, y * blockSize, blockSize, blockSize);
      }
    }
  }

  // Displaying items
  for (let i = 0; i < fruits.length; i++) {
    ctx.drawImage(
      fruits[i].imageObject,
      fruits[i].x * blockSize,
      fruits[i].y * blockSize,
      blockSize,
      blockSize
    );
  }
}

// Function to start the game
function startGame() {
  time = 80;
  createPills();
  draw();
  timer();
}

// Function to move the player
function movePlayer() {
  if (keys[39] && canMove(player.x + 1, player.y)) {
    // Right arrow
    hero.src = "img/right.png";
    player.x++;
  }

  if (keys[37] && canMove(player.x - 1, player.y)) {
    // Left arrow
    hero.src = "img/left.png";
    player.x--;
  }

  if (keys[38] && canMove(player.x, player.y - 1)) {
    // Up arrow
    hero.src = "img/up.png";
    player.y--;
  }

  if (keys[40] && canMove(player.x, player.y + 1)) {
    // Down arrow
    hero.src = "img/down.png";
    player.y++;
  }
}

// Checking if movement is possible
function canMove(x, y) {
  return (
    y >= 0 &&
    y < board.length &&
    x >= 0 &&
    x < board[y].length &&
    board[y][x] !== 1
  );
}

// Function to collect items
function collect() {
  for (let i = 0; i < fruits.length; i++) {
    if (player.x == fruits[i].x && player.y == fruits[i].y) {
      fruits.splice(i, 1);

      increaseScore();
    }
  }
}

// Function to increase and display the score
function increaseScore() {
  score++;

  scoreElement.textContent = `${score}/10`;
}

// Function for the countdown timer
function timer() {
  function startTimer() {
    let timer = time;
    let minutes = 0;
    let seconds = 0;

    let countDownInterval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      if (score === 10) {
        clearInterval(countDownInterval);
        endGame("win", timer);
      }

      if (timer == 0) {
        clearInterval(countDownInterval);
        endGame("loss");
      }

      timeElement.textContent = minutes + ":" + seconds;

      timer--;
    }, 1000);
  }

  startTimer();
}

// Function to end the game
function endGame(type, winTime) {
  if (type === "win") {
    endElement.style.display = "block";
    endMessage.textContent = `You won! You collected all items.`;
  }

  if (type === "loss") {
    endElement.style.display = "block";
    endMessage.textContent = `You lost! You didn't collect all items in time. Try again.`;
  }
}

// Function to draw the game board and player
function draw() {
  ctx.clearRect(
    player.x * blockSize,
    player.y * blockSize,
    blockSize,
    blockSize
  );
  generateBoard();
  movePlayer();
  collect();
  ctx.drawImage(
    hero,
    player.x * blockSize,
    player.y * blockSize,
    blockSize,
    blockSize
  );
}

// Key press and release events
window.addEventListener("load", startGame);

// Key down events
document.body.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true;
});

// Key up events
document.body.addEventListener("keyup", function (e) {
  keys[e.keyCode] = false;
});

// Main game loop
setInterval(draw, 100);
