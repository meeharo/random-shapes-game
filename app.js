var button = document.querySelector('button')
var directions = document.querySelector('.directions')
var message = document.querySelector('.message')
var results = document.querySelector('.results')
var gameArea = document.querySelector('.gameArea')

let count = 0
let inPlay = false

function showMessage(notification) {
    message.innerHTML = `<h3>${notification}</h3>`
}

function showBox() {
    setTimeout(myBox, random(4000))
}

function myBox() {
    var element = document.createElement('div')
    element.className = 'box'
    element.style.top = random(setTopMargin()) + 'px'
    element.style.left = random(setLeftMargin()) + 'px'
    element.style.backgroundColor = getColor()
    element.start = new Date(). getTime()
    element.addEventListener('click', hit)
    gameArea.appendChild(element)
}

function setTopMargin() {
    let maxHeight = gameArea.clientHeight
    if (maxHeight <= 100) {
        maxHeight = maxHeight + 200
    } else {
        maxHeight = maxHeight - 200;
    }
    return maxHeight
}

function setLeftMargin() {
    let maxWidth = gameArea.clientWidth
    if (maxWidth <= 100) {
        maxWidth = maxWidth + 200
    } else {
        maxWidth = maxWidth - 200;
    }
    return maxWidth
}

function getColor() {
    function col(){
        let hex = random(255).toString(16);
        return ('0' + String(hex)).substr(-2);
    }
    return '#' + col() + col() + col();r
}

function hit(e) {
    let start = e.target.start
    let end = new Date().getTime()
    let duration = (end - start) / 1000
    let maxDuration = 1

    clearTimeout()
    showMessage(`It took you ${duration} seconds to click`)
    if (duration > maxDuration) {
        gameArea.children[0].remove()
        results.innerHTML = `Too Slow! <span id="loser">You Lose!</span> Your score was ${count}.<br> Click the start button to play again!`
        resetGame()
    } else {
        count++
        gameArea.children[0].remove()
        setTimeout(myBox, random(4000))
        if (count === 15) {
            results.innerHTML = `You reached ${renderCount(count)}! <span id="winner">You win!</span> <br> Click start to Play again.`;
            resetGame()
        } else {
            results.innerHTML = `Score: ${renderCount(count)} of 15`;
            
        }
    }
}

function renderCount(count) {
    return count
}

function random(time) {
    let randomTime = Math.floor(Math.random() * time)
    return randomTime
}

function resetGame() {
    clearTimeout()
    inPlay = false
    button.style.display = 'block';
}

showMessage('Click Start to Begin!')

button.addEventListener('click', () => {
    inPlay = true
    button.style.display = 'none'
    directions.style.display = 'none'
    results.innerHTML = '';
    count = 0;
    showMessage(`Starting....`)

    showBox()
})