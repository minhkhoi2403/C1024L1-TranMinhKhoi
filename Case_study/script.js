const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const startGameButton = document.getElementById("startGame");
const instructions = document.getElementById("instructions");
const gameBox = document.getElementById("gameBox");

let gameOver = false;
let foodX, foodY, bigFoodX, bigFoodY;
let snakeX = 5, snakeY = 10;
let vantocX = 0, vantocY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;
let showBigFood = false;
let bigFoodTimeout;
let bigFoodInterval;
let bigFoodCoolDownTimeout;
let bigFoodCoolDown = false;

// Lưu trữ điểm cao nhất
let highScore = localStorage.getItem("high-score");
highScoreElement.innerText = `High Score: ${highScore}`;

// Thay đổi vị trí thức ăn
const updateFoodPosition = () => {
  foodX = Math.floor(Math.random() * 20) + 1;
  foodY = Math.floor(Math.random() * 20) + 1;
}

// Thay đổi vị trí bigfood
const updateBigFoodPosition = () => {
  bigFoodX = Math.floor(Math.random() * 19) + 1;
  bigFoodY = Math.floor(Math.random() * 19) + 1;
  showBigFood = true;

  //Bigfood tồn tại trong 10 giây
  clearTimeout(bigFoodTimeout); // Hủy timeout trước đó nếu có
  bigFoodTimeout = setTimeout(() => {
    showBigFood = false; // Sau 10 giây, ẩn bigfood
  }, 10000);
}

// Bắt đầu Game
const startGame = () => {
  instructions.style.display = "none";
  gameBox.style.display = "block";
  updateFoodPosition();
};

// GameOver
const GameOver = () => {
  clearInterval(setIntervalId);
  clearTimeout(bigFoodTimeout);
  clearInterval(bigFoodInterval);
  alert("Game Over! Press OK to replay...");
  location.reload();
}

// Thay đổi hướng của con rắn
const changeDirection = e => {
  if (e.key === "ArrowUp" && vantocY != 1) {
    vantocX = 0;
    vantocY = -1;
  } else if (e.key === "ArrowDown" && vantocY != -1) {
    vantocX = 0;
    vantocY = 1;
  } else if (e.key === "ArrowLeft" && vantocX != 1) {
    vantocX = -1;
    vantocY = 0;
  } else if (e.key === "ArrowRight" && vantocX != -1) {
    vantocX = 1;
    vantocY = 0;
  }
}

// Bắt đầu game
const initGame = () => {
  if (gameOver) return GameOver();
  let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  // Kiểm tra xem rắn có ăn thức ăn không
  if (snakeX === foodX && snakeY === foodY) {
    updateFoodPosition();
    snakeBody.push([foodY, foodX]);
    score++;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `Score: ${score}`;
    highScoreElement.innerText = `High Score: ${highScore}`;
  }

  // Kiểm tra xem rắn có ăn bigfood không
  if (showBigFood && snakeX >= bigFoodX && snakeX < bigFoodX + 2 && snakeY >= bigFoodY && snakeY < bigFoodY + 2) {
    showBigFood = false;
    updateBigFoodPosition();
    score += 5;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `Score: ${score}`;
    highScoreElement.innerText = `High Score: ${highScore}`;

    // Tăng chiều dài con rắn khi ăn bigfood
    snakeBody.push(snakeBody[snakeBody.length - 1]);
    snakeBody.push(snakeBody[snakeBody.length - 1]);
  }
  // Gắn vận tốc cho con rắn
  snakeX += vantocX;
  snakeY += vantocY;

  // Di Chuyển cơ thể con rắn
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];

  // Khi con rắn ra khỏi vùng sẽ quay trở lại ở đầu bên kia
  if (snakeX < 1) {
    snakeX = 20;
  } else if (snakeX > 20) {
    snakeX = 1;
  }
  if (snakeY < 1) {
    snakeY = 20;
  } else if (snakeY > 20) {
    snakeY = 1;
  }

  // Chiều dài con rắn
  for (let i = 0; i < snakeBody.length; i++) {
    html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
      gameOver = true;
    }
  }

  // Bigfood
  if (showBigFood) {
  html += `<div class="bigfood" style="grid-area: ${bigFoodY} / ${bigFoodX} / span 2 / span 2"></div>`;
  }

  playBoard.innerHTML = html;
}

updateFoodPosition();
updateBigFoodPosition();
setIntervalId = setInterval(initGame, 155);
bigFoodInterval= setInterval(updateBigFoodPosition, 10000);
document.addEventListener("keyup", changeDirection);
startGameButton.addEventListener("click", startGame);
document.addEventListener("keyup", changeDirection);