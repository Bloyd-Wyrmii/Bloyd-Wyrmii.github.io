gameCanvas = document.getElementById("gameCanvas");
gameCanvasContext = gameCanvas.getContext("2d");

gameCanvas.width = window.innerWidth;
gameCanvas.height = window.innerHeight;

window.addEventListener("keydown", handleKeyAction);
window.addEventListener("keyup", handleKeyAction);

// Your existing player setup
playerPosition = {xPosition: gameCanvas.width / 2, yPosition: gameCanvas.height / 2};

let keys = [];

// --- NEW: Enemy Setup ---
const enemies = [];

class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  update() {
    // Note: Using your playerPosition variable names here
    const dx = playerPosition.xPosition - this.x;
    const dy = playerPosition.yPosition - this.y;
    const angle = Math.atan2(dy, dx);

    this.x += Math.cos(angle) * this.speed;
    this.y += Math.sin(angle) * this.speed;
  }

  draw() {
    gameCanvasContext.beginPath();
    gameCanvasContext.fillStyle = "red";
    gameCanvasContext.arc(this.x, this.y, 12, 0, Math.PI * 2);
    gameCanvasContext.fill();
    gameCanvasContext.closePath();
  }
}

// Spawn a few enemies at the start
for(let i = 0; i < 3; i++) {
    enemies.push(new Enemy(Math.random() * gameCanvas.width, 0, 2));
}
// -----------------------

function handleKeyAction(event) {
  if (event.type === "keydown") {
    if (!keys.includes(event.keyCode)) {
      keys.push(event.keyCode);
    }
  } else {
    for (var index = 0; index < keys.length; index++) {
      if (keys[index] === event.keyCode) {
        keys.splice(index, 1);
        break;
      }
    }
  }
}

function movePlayer() {
  if (keys.includes(87)) playerPosition.yPosition -= 5;
  if (keys.includes(65)) playerPosition.xPosition -= 5;
  if (keys.includes(83)) playerPosition.yPosition += 5;
  if (keys.includes(68)) playerPosition.xPosition += 5;
}

function drawPlayer() {
  gameCanvasContext.beginPath();
  gameCanvasContext.fillStyle = "#000000";
  gameCanvasContext.arc(playerPosition.xPosition, playerPosition.yPosition, 15, 0, Math.PI * 2);
  gameCanvasContext.fill();
  gameCanvasContext.closePath();
}

function animate() {
  gameCanvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  
  movePlayer();
  drawPlayer();

  // --- NEW: Update and Draw Enemies ---
  enemies.forEach(enemy => {
    enemy.update();
    enemy.draw();
  });
  // ------------------------------------

  requestAnimationFrame(animate);
}

animate();

