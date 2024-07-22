// Nastavení šířky a výšky herního plánu
let width = 600;
let height = 600;

// Velikost jednotlivých bloků v herním poli
let blockSize = 30;

// Vykreslení herního pole
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

// Stisknuté klávesy
let keys = [];

// Předměty ve hře
let fruits = [];

// Zobrazení skóre
let scoreElement = document.getElementById("score");
let score = 0;

// Zobrazení zbývajícího času
let timeElement = document.getElementById("time");
let time = 0;

// Zobrazení zprávy na konci hry
let endElement = document.getElementById("end");
let endMessage = document.getElementById("message");

// Herní pole - 1 označuje zeď, 0 prázdné pole
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

// Výchozí osa hráče
let player = {
  // Pozice hráče na ose x a y
  x: 12,
  y: 2,
};

// Obrázek zdi
let wall = new Image();
wall.src = "img/wall.png";

// Obrázek hlavní postavy
let hero = new Image();
hero.src = "img/down.png";

// Obrázky předmětů
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

// Upravujeme výšku a šířku canvasu (Herní plochy)
canvas.width = width;
canvas.height = height;

// Funkce pro vytvoření předmětů ve hře
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

// Funkce pro vykreslení herního pole a předmětů
function generateBoard() {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === 1) {
        ctx.drawImage(wall, x * blockSize, y * blockSize, blockSize, blockSize);
      }
    }
  }

  // Zobrazení předmětů
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

// Funkce pro spuštění hry
function startGame() {
  time = 80;
  createPills();
  draw();
  timer();
}

// Funkce pro pohyb hráče
function movePlayer() {
  if (keys[39] && canMove(player.x + 1, player.y)) {
    // šipka doprava
    hero.src = "img/right.png";
    player.x++;
  }

  if (keys[37] && canMove(player.x - 1, player.y)) {
    // šipka doleva
    hero.src = "img/left.png";
    player.x--;
  }

  if (keys[38] && canMove(player.x, player.y - 1)) {
    // šipka nahoru
    hero.src = "img/up.png";
    player.y--;
  }

  if (keys[40] && canMove(player.x, player.y + 1)) {
    // šipka dolů
    hero.src = "img/down.png";
    player.y++;
  }
}

// Kontrola možnosti pohybu
function canMove(x, y) {
  return (
    y >= 0 &&
    y < board.length &&
    x >= 0 &&
    x < board[y].length &&
    board[y][x] !== 1
  );
}

// Funkce pro sbírání předmětů
function collect() {
  for (let i = 0; i < fruits.length; i++) {
    if (player.x == fruits[i].x && player.y == fruits[i].y) {
      fruits.splice(i, 1);

      increaseScore();
    }
  }
}

// Funkce pro zvýšení a vypsání skóre
function increaseScore() {
  score++;

  scoreElement.textContent = `${score}/10`;
}

// Funkce pro odpočet času
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

// Funkce pro ukončení hry
function endGame(type, winTime) {
  if (type === "win") {
    endElement.style.display = "block";
    endMessage.textContent = `Vyhráli jste! Sesbírali jste všechny předměty.`;
  }

  if (type === "loss") {
    endElement.style.display = "block";
    endMessage.textContent = `Prohráli jste! Nestihli jste sesbírat všechny předměty. Zkuste to znovu.`;
  }
}

// Funkce pro vykreslení herního pole a hráče
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

// Stisk a puštění kláves
window.addEventListener("load", startGame);

// Události pro stisk klávesy
document.body.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true;
});

// Události pro puštění klávesy
document.body.addEventListener("keyup", function (e) {
  keys[e.keyCode] = false;
});

// Hlavní smyčka hry
setInterval(draw, 100);
