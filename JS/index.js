const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const start = document.querySelector("#startscreen");
const gameScreen = document.querySelector("#game-screen");
gameScreen.style.display = "none";
const overScreen = document.querySelector(".gameover");
overScreen.style.display = "none";
const gameOverTitle = document.querySelector("#gameOverTitle");
const scorePlace = document.querySelector("#score-num");
const finalScore = document.querySelector("#final-score");
const easterEgg = document.querySelector("#easter");

//sounds
const music = new Audio("../Sounds/Background Music.mp3");
music.volume = 0.1;
const victory = new Audio ("/Sounds/Game Over Screen.mp3");
victory.volume = 0.2;
const arrowShot = new Audio ("../Sounds/Arrow Shot.wav");
arrowShot.volume = 1;
const dying = new Audio ("../Sounds/Dying.wav")
dying.volume = 0.2;
const fail = new Audio ("../Sounds/fail sound.wav")
fail.volume = 0.2;


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


const arrowImg = new Image();
arrowImg.src = "../Images/arrow final.png";

//player position and size
let playerX = 0;
let playerY = canvas.height / 2 - 100 + 50;

//characters width and height
const charWidth = 100;
const charHeight = 100;

//character movement
let movingUp = false;
let movingDown = false;

//game controls
let isGameOver = false;
let gameId = 0;
let enemySpeed = 3;
let score = 0;
let interval = 0;

//enemies
const enemies = [
  { x: 1200, y: (Math.random()*(canvas.height-charHeight)), img: enemyImg1 },
  { x: 1400, y: (Math.random()*(canvas.height-charHeight)), img: enemyImg2 },
  { x: 1600, y: (Math.random()*(canvas.height-charHeight)), img: enemyImg3 },
];

class Projectile {
    constructor({x, y}) {
        this.x = x;
        this.y = y;
        this.image = arrowImg;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, 25, 15)
    }
    update() {
        this.draw()
        this.x += enemySpeed;
    }
}
const projectiles = [];

const animate = () => {
  let scoreStr =score.toString();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(player, playerX, playerY, charWidth, charHeight);
  if (score%10===0 && score !==0) {
    if (interval === 0 ) {
    enemySpeed+=0.5;
    interval +=1;
  } 
}
  if (scoreStr[scoreStr.length - 1] === "9") {
    interval = 0;
  }
  //enemies moving
  for (let i =0; i< enemies.length; i+=1) {
    let current = enemies[i];
    ctx.drawImage(current.img, current.x, current.y, charWidth, charHeight);
    current.x -= enemySpeed;
    if (current.x < 0) {
        current.x = 1000;
        current.y = Math.random()*(canvas.height - charHeight);
        score-=1;
        scorePlace.innerHTML = score;
    }
    if (current.x < playerX + charWidth && current.x + charWidth > playerX && current.y < playerY + charHeight && current.y + charHeight > playerY ) {
        isGameOver=true;
    }
    projectiles.forEach((projectile,index) => {
      if (current.x < projectile.x + 25 && current.x + charWidth > projectile.x && current.y < projectile.y + 15 && current.y + charHeight > projectile.y) {
        dying.play();
        projectiles.splice(index, 1);
        current.x = 1000;
        current.y = Math.random()* (canvas.height - charHeight);
        score +=1;
        scorePlace.innerHTML = score;
      }
    })
  }
  // moving main character
  if (movingUp === true && playerY >= 0) {
    playerY -= 6;
  } else if (movingDown === true && playerY <= 700 - charHeight) {
    playerY += 6;
  }
  
  //handling projectiles
  projectiles.forEach((projectile,index) => {
    if (projectile.x >= 900) {
      projectiles.splice(index,1);
    } else {
      projectile.update();
    }
  })
  if (score >= 50) {
    isGameOver = true;
  }

  if (isGameOver) {
    //need to stop background music here, don't know how
    music.pause();
    if (score>=50) {
      gameOverTitle.innerHTML = "You saved the village!"
      easterEgg.innerHTML = "Hawkeye has got nothing on you!"
      victory.play();
    }else {
      fail.play();
    }
    overScreen.style.display="block"
    gameScreen.style.display ="none"
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
      } else if (event.code ==="Space") {
        arrowShot.play();
        projectiles.push(
            new Projectile ({
                x: playerX + charWidth,
                y: playerY + charHeight/2
            })
            )
      }
    })
    document.addEventListener("keyup", () => {
      movingUp = false;
      movingDown = false;
    });
  }

    document.getElementById("restartBtn").onclick = () => {
      location.reload();
    };
}