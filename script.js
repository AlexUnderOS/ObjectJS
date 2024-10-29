const player = document.getElementById('player')
const gameArea = document.getElementById('gameArea')
const enemiesContainer = document.querySelector('.enemies')
const timerElement = document.getElementById('timer')
const maxScoreElement = document.getElementById('maxScore')

let position = 10
let direction = 1
let isMoving = true

const playerWidth = player.offsetWidth
const gameAreaWidth = gameArea.clientWidth - 210

function movePlayer() {
  if (isMoving) {
    position += direction * 2

    if (position + playerWidth > gameAreaWidth) {
      position = gameAreaWidth - playerWidth
      direction = -1
    } else if (position < 0) {
      position = 0
      direction = 1
    }
    player.style.left = position + 'px'
  }
}

setInterval(movePlayer, 10)

gameArea.addEventListener('mousedown', () => {
  isMoving = false
})

gameArea.addEventListener('mouseup', () => {
  isMoving = true
})

// ...

function spawnEnemy() {
  const enemy = document.createElement('div')
  enemy.classList.add('enemy')

  const enemyImage = document.createElement('img')
  enemyImage.src = 'images/documents.png'
  enemyImage.style.width = '70px'
  enemyImage.style.height = 'auto'

  enemy.appendChild(enemyImage)
  enemy.style.left = Math.random() * (gameAreaWidth - 30) + 'px'
  enemiesContainer.appendChild(enemy)

  let enemyPosition = 0

  function moveEnemy() {
    enemyPosition += 1

    if (enemyPosition < gameArea.clientHeight - 240) {
      enemy.style.top = enemyPosition + 'px'

      const playerRect = player.getBoundingClientRect()
      const enemyRect = enemy.getBoundingClientRect()

      if (
        playerRect.left < enemyRect.left + enemyRect.width &&
        playerRect.left + playerRect.width > enemyRect.left &&
        playerRect.top < enemyRect.top + enemyRect.height &&
        playerRect.height + playerRect.top > enemyRect.top
      ) {
        console.log('Game Over!')
        enemy.remove()
        looseAndReset()
        return
      }

      requestAnimationFrame(moveEnemy)
    } else {
      enemy.remove()
    }
  }

  moveEnemy()
}

setInterval(spawnEnemy, 3000)

// timer

let timerValue = 0

setInterval(() => {
  timerValue++
  timerElement.textContent = `Laiks: ${timerValue}`
}, 1000)

// loose

let maxScore = 0

const looseAndReset = () => {
  if (timerValue > maxScore) {
    maxScore = timerValue
  }
  timerValue = 0
  maxScoreElement.textContent = `Max-rezultāts: ${maxScore}`
}
