// Constants 👇

let inputDir = {
    x: 0,
    y: 0
}

let snakeArr = [
    { x: 7, y: 15 }
]

let food = {
    x: 4, y: 20
}

const EatingSound = new Audio('sounds/Eating Sound.mp3')
const BackgroundSound = new Audio('sounds/background sound.mp3')
const GameOverSound = new Audio('sounds/GameOver.mp3')
const HoverSound = new Audio('sounds/HoverSound.wav')
const PlayButtonSound = new Audio('sounds/PlayButton sound.wav')
const moveSound = new Audio('sounds/MoveSOund.mp3')

let board = document.getElementById('board')
let lastPrintTime = 0
const speed = 6
let score = 0
let currentTime = 30
let run = 0


let scoreId = document.getElementById('score')
let HighScore = document.getElementById('HighScore')



// Functions 👇
const main = (currentTime) => {
    window.requestAnimationFrame(main)
    if ((currentTime - lastPrintTime) / 1000 < 1 / speed) {
        return
    }
    lastPrintTime = currentTime
    // run += 1
    // console.log(`RunTime ${run}`)
    gameEngine()
}


const bSound = () => {
    setInterval(() => {
         BackgroundSound.play()
    }, 10)
    // HoverSound.play()
}





const gameEngine = () => {
    // Updating the snake array and food
    const isCollide = () => {
        // if snake collide with itself
        for (i = 1; i < snakeArr.length; i++) {
            if (snakeArr[i].x == snakeArr[0].x && snakeArr[i].y == snakeArr[0].y) {
                BackgroundSound.pause()
                GameOverSound.play()
                return true
            }
        }
        if (snakeArr[0].x <= 0 || snakeArr[0].x >= 21 || snakeArr[0].y <= 0 || snakeArr[0].y >= 21) {
            BackgroundSound.pause()
            GameOverSound.play()
            return true
        }
    }


    // If Game is Over

    if (isCollide()) {
        inputDir = { x: 0, y: 0 }
        alert('GameOver🥺, press ok to start again')
        snakeArr = [{ x: 13, y: 15 }]
        score = 0
    }
    // Increment snakeArr and regenerating the food 
    if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
        EatingSound.play()
        score += 1
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        food = { x: 1 + Math.ceil(Math.random() * 19), y: 1 + Math.ceil(Math.random() * 19) }
    }
    if(score>hiScoreValue){
        hiScoreValue = score
        HighScore.innerHTML = `HighScore: ${hiScoreValue}`
        localStorage.setItem('highScore', JSON.stringify(hiScoreValue))
    }


    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        const Element = snakeArr[i - 2]
        snakeArr[i + 1] = { ...snakeArr[i] }
    }

    // BackgroundSound.play()
    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y
    // console.log('snake_Cordinates X', snakeArr[0].x)
    // console.log('snake_Cordinates Y', snakeArr[0].y)



    // Display snake
    board.innerHTML = ''
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.x
        snakeElement.style.gridColumnStart = e.y

        if (index == 0) {
            snakeElement.classList.add('head')
        } else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
        index += 1

    })


    // Display food
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.x
    foodElement.style.gridColumnStart = food.y
    foodElement.classList.add('food')
    board.appendChild(foodElement)



    // display dom
    scoreId.innerHTML = `Score: ${score}`


}





// Logic 👇
let highScore = localStorage.getItem('highScore')
console.log(highScore)
if (highScore == null){
    hiScoreValue = 0
    localStorage.setItem('highScore', JSON.stringify(hiScoreValue))
}else{
    hiScoreValue = JSON.parse(highScore)
    HighScore.innerHTML = `HighScore: ${hiScoreValue}`
}


    window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    if(e.key == 'ArrowUp'){
        moveSound.play()
        inputDir.x = -1
        inputDir.y = 0
        bSound()
    }
    else if(e.key == 'ArrowDown'){
        moveSound.play()
        inputDir.x = 1
        inputDir.y = 0
        bSound()
    }
    else if(e.key == 'ArrowLeft'){
        moveSound.play()
        inputDir.y = -1
        inputDir.x = 0
        bSound()
    }
    else if(e.key == 'ArrowRight'){
        moveSound.play()
        inputDir.y = 1
        inputDir.x = 0
        bSound()
    }
    
    // switch (e.key) {
    //     case 'ArrowUp':
    //         inputDir.x = -1
    //         inputDir.y = 0
    //         break
        // case 'ArrowDown':
        //     inputDir.x = 1
        //     inputDir.y = 0
        //     break
        // case 'ArrowLeft': 
        //     inputDir.y = -1
        //     inputDir.x = 0
        //     break
        // case 'ArrowRight':
        //     inputDir.y = 1
        //     inputDir.x = 0
        //     break
        // default:
        //     break
    // }
})

