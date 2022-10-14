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
const playerStartX = 0;
const playerStartY = canvas.height - 100;


const animate = () => {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(player, 0, 350-100, 100, 100)
}





window.onload = () => {
    document.getElementById('startBtn').onclick =() => {
        console.log('starting')
        startGame()
    }
    function startGame() {
        start.style.display = 'none'
        gameScreen.style.display ='block'
        animate();
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


