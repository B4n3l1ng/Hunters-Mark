const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const start = document.querySelector(".startscreen")
const gameScreen = document.querySelector("#game-screen")
gameScreen.style.display ="none";

//images
const background = new Image();
background.src = "../Images/Background.png"
const player = new Image();
player.src ="../Images/Warrior_03__ATTACK_002.png"


window.onload = () => {
    document.getElementById('startBtn').onclick =() => {
        console.log('starting')
        startGame()
    }
    function startGame() {
        start.style.display = 'none'
        gameScreen.style.display ='block'
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


