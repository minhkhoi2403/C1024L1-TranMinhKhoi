let playBoard = document.querySelector(".play-board");

let foodX = 10, foodY = 13;

// Thay đổi vị trí của đồ ăn
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    console.log (`New food position: (${foodX}, ${foodY})`);
}

const initGame = () => {
        let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX};"></div>`;
        playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
initGame();
