const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let vantocX = 0, vantocY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;


//Lưu trữ điểm cao nhất
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

//Thay đổi vị trí thức ăn
const updateFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
}

//GameOver
const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("Game Over! Press OK to replay...");
  location.reload();
}

//Thay đổi hướng của con rắn
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

//Bắt đầu game
const initGame = () => {
  if (gameOver) return handleGameOver();
  let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  
  // Kiểm tra xem rắn có ăn thức ăn không
  if (snakeX === foodX && snakeY === foodY) {
    updateFoodPosition();
    snakeBody.push([foodY, foodX]); 
  //Khi ăn thức ăn sẽ công thêm điểm
    score++; 
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `Score: ${score}`;
    highScoreElement.innerText = `High Score: ${highScore}`;
  }
  
  //Gắn vận tốc cho con rắn
  snakeX += vantocX;
  snakeY += vantocY;

  //Tăng chiều dài con rắn khi nó ăn được thức ăn
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [snakeX, snakeY]; 

  //Khi con rắn ra khỏi vùng sẽ quay trở lại ở đầu bên kia
  if (snakeX < 1) {
    snakeX = 30;
  } else if (snakeX > 30) {
    snakeX = 1;
  }
  if (snakeY < 1) {
    snakeY = 30;
  } else if (snakeY > 30) {
    snakeY = 1;
  }

    
  //Chiều dài con rắn 
  for (let i = 0; i < snakeBody.length; i++) {
    html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
      gameOver = true;
    }
  }
  playBoard.innerHTML = html;
}


updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);

