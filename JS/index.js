const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const start = document.querySelector("#startscreen");
const gameScreen = document.querySelector("#game-screen");
const gameOver = document.querySelector(".gameover")
gameScreen.style.display = "none";
gameOver.style.display="none"

//images
const background = new Image();
background.src = "../Images/Background.png";
const player = new Image();
player.src = "../Images/player.png";
const enemyImg = new Image();
enemyImg.src = "../Images/orc final.png";

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

//enemies
const enemies = [
  { x: 1200, y: (Math.random(canvas.height)), img: enemyImg },
  { x: 1400, y: (Math.random(canvas.height)), img: enemyImg },
  { x: 1600, y: (Math.random(canvas.height)), img: enemyImg },
];


const animate = () => {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(player, playerX, playerY, charWidth, charHeight);
  //enemies moving
  for (let i =0; i< enemies.length; i+=1) {
    let current = enemies[i];
    ctx.drawImage(current.img, current.x, current.y, charWidth, charHeight);
    current.x -= enemySpeed;
    if (current.x < 0) {
        current.x = 1200;
    }
    if (current.x < playerX + charWidth && current.x + charWidth > playerX && current.y < playerY + charHeight && current.y + charHeight > playerY ) {
        isGameOver=true;
    }
}
  // moving main character
  if (movingUp === true && playerY >= 0) {
    playerY -= 5;
  } else if (movingDown === true && playerY <= 700 - charHeight) {
    playerY += 5;
  }

  if (isGameOver) {
    gameOver.style.display="block"
    gameScreen.style.display ="none"
    cancelAnimationFrame(gameId);
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

    document.addEventListener("keydown", (event) => {
      if (event.code === "ArrowUp") {
        movingUp = true;
      } else if (event.code === "ArrowDown") {
        movingDown = true;
      }
    });
    document.addEventListener("keyup", () => {
      movingUp = false;
      movingDown = false;
    });
  }
};

/*window.onload = () => {
    document.getElementById('startBtn').onclick = () => {
      console.log('starting')
      startGame()
      
    }
    function startGame() {
        start.style.display ='none'
    }
    
}*/
