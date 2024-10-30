const player = {
  element: document.getElementById('player'),
  position: 10,
  direction: 1,
  isMoving: true,
  width: document.getElementById('player').offsetWidth,
  move() {
    if (this.isMoving) {
      this.position += this.direction * 2

      if (this.position + this.width > gameArea.width) {
        this.position = gameArea.width - this.width
        this.direction = -1
      } else if (this.position < 0) {
        this.position = 0
        this.direction = 1
      }
      this.element.style.left = this.position + 'px'
    }
  },
  toggleMovement(isMoving) {
    this.isMoving = isMoving
  },
}

const gameArea = {
  element: document.getElementById('gameArea'),
  width: document.getElementById('gameArea').clientWidth,
  enemiesContainer: document.querySelector('.enemies'),
}

const game = {
  timerElement: document.getElementById('timer'),
  maxScoreElement: document.getElementById('maxScore'),
  timerValue: 0,
  maxScore: localStorage.getItem('max-score') || 0,

  startTimer() {
    setInterval(() => {
      this.timerValue++
      this.timerElement.textContent = `Laiks: ${this.timerValue}`
    }, 1000)
  },

  updateMaxScore() {
    if (this.timerValue > this.maxScore) {
      this.maxScore = this.timerValue
      localStorage.setItem('max-score', this.maxScore)
    }
    this.maxScoreElement.textContent = `Max-rezultāts: ${this.maxScore}`
  },

  resetGame() {
    this.updateMaxScore()
    this.timerValue = 0
  },
}

// PC
gameArea.element.addEventListener('mousedown', () =>
  player.toggleMovement(false)
)
gameArea.element.addEventListener('mouseup', () => player.toggleMovement(true))

// Mobile
gameArea.element.addEventListener('touchstart', () =>
  player.toggleMovement(false)
)
gameArea.element.addEventListener('touchend', () => player.toggleMovement(true))

function spawnEnemy() {
  const enemy = document.createElement('div')
  enemy.classList.add('enemy')

  const enemyImage = document.createElement('img')
  enemyImage.src = 'images/documents.png'
  enemyImage.style.width = '70px'
  enemy.appendChild(enemyImage)

  enemy.style.left = Math.random() * (gameArea.width - 100) + 'px'
  gameArea.enemiesContainer.appendChild(enemy)

  let enemyPosition = 0

  function moveEnemy() {
    enemyPosition += 1

    if (enemyPosition < gameArea.element.clientHeight - 240) {
      enemy.style.top = enemyPosition + 'px'

      const playerRect = player.element.getBoundingClientRect()
      const enemyRect = enemy.getBoundingClientRect()

      if (
        playerRect.left < enemyRect.left + enemyRect.width &&
        playerRect.left + playerRect.width > enemyRect.left &&
        playerRect.top < enemyRect.top + enemyRect.height &&
        playerRect.height + playerRect.top > enemyRect.top
      ) {
        enemy.remove()
        game.resetGame()
        return
      }

      requestAnimationFrame(moveEnemy)
    } else {
      enemy.remove()
    }
  }

  moveEnemy()
}

const checkBox1 = document.getElementById('checkBox1')
const playerCollider = document.getElementById('playerCollider')

checkBox1.addEventListener('change', function () {
  if (checkBox1.checked) {
    playerCollider.style.border = '3px solid #ff000049'
  } else {
    playerCollider.style.border = 'none'
  }
})

setInterval(() => player.move(), 10)
setInterval(spawnEnemy, 3000)
game.startTimer()
game.maxScoreElement.textContent = `Max-rezultāts: ${game.maxScore}`
