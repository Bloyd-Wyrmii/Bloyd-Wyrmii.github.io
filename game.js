gameCanvas = document.getElementById("gameCanvas");
gameCanvasContext = gameCanvas.getContext("2d");

gameCanvas.width = window.innerWidth;
gameCanvas.height = window.innerHeight;

window.addEventListener("keydown", handleKeyAction);
window.addEventListener("keyup", handleKeyAction);

// IF YOU SEE THIS COMMENT GET OFF OF THE CODE THIS IS ONLY A DEMONSTRATION.
playerPosition = {xPosition: gameCanvas.width / 2, yPosition: gameCanvas.height / 2};



let keys = [];

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

const arena = {
  x: 50,          // Distance from canvas left edge
  y: 50,          // Distance from canvas top edge
  width: 700,     // Width of the playable zone
  height: 500     // Height of the playable zone
};


function movePlayer() {
  if (keys.includes(87)) {
    playerPosition.yPosition -= 5;
  }
  if (keys.includes(65)) {
    playerPosition.xPosition -= 5;
  }
  if (keys.includes(83)) {
    playerPosition.yPosition += 5;
  }
  if (keys.includes(68)) {
    playerPosition.xPosition += 5;
  }
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
  requestAnimationFrame(animate);
}

animate();
