const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const start = document.querySelector(".startscreen")
const gameScreen = document.querySelector("#game-screen")
gameScreen.style.display ="none";

//images
const background = new Image();
background.src = "../Images/Background.png"
const player = new Image();
player.src = "../Images/player.png"

//player position and size
let playerX = 0;
let playerY = (canvas.height/2) - 100 +50;

//characters width and height
const charWidth = 100;
const charHeight = 100;

//character movement
let movingUp = false;
let movingDown = false;

//game controls
let isGameOver = false;
let gameId = 0;


const animate = () => {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(player, playerX, playerY, charWidth, charHeight)
    // moving main character
    if (movingUp === true && playerX >= 0) {
        playerY -= 3;
    } else if (movingDown === true && playerX <= 0 + charHeight) {
        playerY += 3
    }










    if (isGameOver) {
        cancelAnimationFrame(gameId)
      } else {
        // Ask for a new frame
        gameId = requestAnimationFrame(animate)
      }
}





window.onload = () => {
    document.getElementById('startBtn').onclick =() => {
        startGame()
    }
    function startGame() {
        start.style.display = 'none'
        gameScreen.style.display ='block'
        animate();
        
        
        document.addEventListener('keydown', event => {
            if (event.code === 'ArrowUp') {
              movingUp = true
            } else if (event.code === 'ArrowDown') {
              movingDown = true
            }
          })
          document.addEventListener('keyup', () => {
            movingUp = false
            movingDown = false
          })
    }
}





/*window.onload = () => {
    document.getElementById('startBtn').onclick = () => {
      console.log('starting')
      startGame()
      
    }
    function startGame() {
        start.style.display ='none'
    }
    
}*/


