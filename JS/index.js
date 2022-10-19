const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const start = document.querySelector("#startscreen");
const introText = document.querySelector("#intro");
const gameScreen = document.querySelector("#game-screen");
gameScreen.style.display = "none";
const overScreen = document.querySelector(".gameover");
overScreen.style.display = "none";
const instructions = document.querySelector("#instructions");
instructions.style.display = "none";
const gameOverTitle = document.querySelector("#gameOverTitle");
const scorePlace = document.querySelector("#score-num");
const livesPlace = document.querySelector("#lives-num");
const finalScore = document.querySelector("#final-score");
const easterEgg = document.querySelector("#easter");

//sounds
const music = new Audio("../Sounds/Background Music.mp3");
music.volume = 0.1;
const victory = new Audio("/Sounds/Game Over Screen.mp3");
victory.volume = 0.2;
const arrowShot = new Audio("../Sounds/Arrow Shot.wav");
arrowShot.volume = 1;
const dying = new Audio("../Sounds/Dying.wav");
dying.volume = 0.2;
const fail = new Audio("../Sounds/fail sound.wav");
fail.volume = 0.2;
const howl = new Audio("../Sounds/howl.wav");
howl.volume = 0.2;

//images
const background = new Image();
background.src = "../Images/Background.png";
const player = new Image();
player.src = "../Images/player.png";
const enemyImg1 = new Image();
enemyImg1.src = "../Images/orc final.png";
const enemyImg2 = new Image();
enemyImg2.src = "../Images/ogre final.png";
const enemyImg3 = new Image();
enemyImg3.src = "../Images/goblin final.png";
const arty = new Image();
arty.src = "../Images/wolf final.png";

const arrowImg = new Image();
arrowImg.src = "../Images/arrow final.png";

//player position and size
let playerX = 0;
let playerY = canvas.height / 2 - 100 + 50;

//characters width and height
const charWidth = 100;
const charHeight = 100;
const artyWidth = 150;
const artyHeight = 75;
let artyX = 0 + charHeight / 2;
let isArtyUp = false;

//character movement
let movingUp = false;
let movingDown = false;

//game controls
let isGameOver = false;
let gameId = 0;
let enemySpeed = 3;
let score = 0;
let interval = 0;
let artyUses = 1;
let lives = 3;

//enemies
let enemies = [
  { x: 1200, y: Math.random() * (canvas.height - charHeight), img: enemyImg1 },
  { x: 1400, y: Math.random() * (canvas.height - charHeight), img: enemyImg2 },
  { x: 1600, y: Math.random() * (canvas.height - charHeight), img: enemyImg3 },
];

class Projectile {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    this.image = arrowImg;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, 25, 15);
  }
  update() {
    this.draw();
    this.x += 10;
  }
}
let projectiles = [];

const animate = () => {
  let scoreStr = score.toString();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(player, playerX, playerY, charWidth, charHeight);
  if (score % 10 === 0 && score !== 0) {
    if (interval === 0) {
      enemySpeed += 1;
      interval += 1;
    }
  }
  if (scoreStr[scoreStr.length - 1] === "9") {
    interval = 0;
  }
  if (lives <= 0) {
    isGameOver = true;
  }
  if (isArtyUp === true) {
    ctx.drawImage(arty, artyX, 0, artyWidth, artyHeight);
    ctx.drawImage(arty, artyX, 0 + artyHeight, artyWidth, artyHeight);
    ctx.drawImage(arty, artyX, 0 + 2 * artyHeight, artyWidth, artyHeight);
    ctx.drawImage(arty, artyX, 0 + 3 * artyHeight, artyWidth, artyHeight);
    ctx.drawImage(arty, artyX, 0 + 4 * artyHeight, artyWidth, artyHeight);
    ctx.drawImage(arty, artyX, 0 + 5 * artyHeight, artyWidth, artyHeight);
    ctx.drawImage(arty, artyX, 0 + 6 * artyHeight, artyWidth, artyHeight);
    ctx.drawImage(arty, artyX, 0 + 7 * artyHeight, artyWidth, artyHeight);
    ctx.drawImage(arty, artyX, 0 + 8 * artyHeight, artyWidth, artyHeight);
    artyX += 6;
    if (artyX > 900) {
      isArtyUp = false;
    }
  }

  //enemies moving
  for (let i = 0; i < enemies.length; i += 1) {
    let current = enemies[i];
    ctx.drawImage(current.img, current.x, current.y, charWidth, charHeight);
    current.x -= enemySpeed;
    if (current.x < 0) {
      current.x = 900 + charWidth;
      current.y = Math.random() * (canvas.height - charHeight);
      lives -= 1;
      livesPlace.innerHTML = lives;
      if (score > 0) {
        score -= 1;
        scorePlace.innerHTML = score;
      }
    }
    if (
      current.x < playerX + charWidth &&
      current.x + charWidth > playerX &&
      current.y < playerY + charHeight &&
      current.y + charHeight > playerY
    ) {
      isGameOver = true;
    }
    if (artyX < 900 - artyWidth + 1 && isArtyUp === true) {
      if (current.x < artyX + artyWidth && current.x + charWidth > artyX) {
        current.x = 900 + charWidth;
        current.y = Math.random() * (canvas.height - charHeight);
        score += 1;
        scorePlace.innerHTML = score;
      }
    }

    projectiles.forEach((projectile, index) => {
      if (
        current.x < projectile.x + 25 &&
        current.x + charWidth > projectile.x &&
        current.y < projectile.y + 15 &&
        current.y + charHeight > projectile.y
      ) {
        dying.play();
        projectiles.splice(index, 1);
        current.x = 900 + charWidth;
        current.y = Math.random() * (canvas.height - charHeight);
        score += 1;
        scorePlace.innerHTML = score;
      }
    });
  }
  // moving main character
  if (movingUp === true && playerY >= 0) {
    playerY -= 6;
  } else if (movingDown === true && playerY <= 700 - charHeight) {
    playerY += 6;
  }
  //handling projectiles
  projectiles.forEach((projectile, index) => {
    if (projectile.x >= 900) {
      projectiles.splice(index, 1);
    } else {
      projectile.update();
    }
  });
  if (score >= 50) {
    isGameOver = true;
  }

  if (isGameOver) {
    music.pause();
    music.currentTime = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (score >= 50) {
      gameOverTitle.innerHTML = "You saved the village!";
      easterEgg.innerHTML = "Hawkeye has got nothing on you!";
      victory.play();
    } else {
      if (score < 0) {
        score = 0;
      }
      fail.play();
    }
    overScreen.style.display = "block";
    gameScreen.style.display = "none";
    cancelAnimationFrame(gameId);
    finalScore.innerHTML = score;
  } else {
    // Ask for a new frame
    gameId = requestAnimationFrame(animate);
  }
};

window.onload = () => {
  document.getElementById("startBtn").onclick = () => {
    startGame();
  };
  document.getElementById("instructionsBtn").onclick = () => {
    instructions.style.display = "block";
    introText.style.display = "none";
  };
  function startGame() {
    start.style.display = "none";
    gameScreen.style.display = "block";
    animate();
    music.play();

    document.addEventListener("keydown", (event) => {
      if (event.code === "ArrowUp") {
        movingUp = true;
      } else if (event.code === "ArrowDown") {
        movingDown = true;
      } else if (event.code === "Space") {
        arrowShot.play();
        projectiles.push(
          new Projectile({
            x: playerX + charWidth,
            y: playerY + charHeight / 2,
          })
        );
      } else if (event.code === "KeyV") {
        if (artyUses > 0) {
          howl.play();
          isArtyUp = true;
        }
      }
    });
    document.addEventListener("keyup", () => {
      movingUp = false;
      movingDown = false;
    });
  }

  document.getElementById("restartBtn").onclick = () => {
    /*location.reload(); I was told this was cheating xD*/
    playerX = 0;
    playerY = canvas.height / 2 - 100 + 50;
    artyX = 0 + charHeight / 2;
    isGameOver = false;
    gameId = 0;
    enemySpeed = 3;
    score = 0;
    scorePlace.innerHTML = 0;
    interval = 0;
    artyUses = 1;
    lives = 3;
    livesPlace.innerHTML = 0;
    enemies = [
      {
        x: 1200,
        y: Math.random() * (canvas.height - charHeight),
        img: enemyImg1,
      },
      {
        x: 1400,
        y: Math.random() * (canvas.height - charHeight),
        img: enemyImg2,
      },
      {
        x: 1600,
        y: Math.random() * (canvas.height - charHeight),
        img: enemyImg3,
      },
    ];
    projectiles.length = 0;
    console.log(projectiles.length);
    overScreen.style.display = "none";
    start.style.display = "block";
  };
};
