const cellElements = document.querySelectorAll("[data-cell]");
const table = document.querySelector("[data-table]");
const body = document.querySelector("[body-color]");
const winMsg = document.querySelector("[data-winning-msg]");
const winTxt = document.querySelector("[data-winning-txt]");
const winBtn = document.querySelector("[data-winning-btn]");

let isCircleTurn;

const winComb = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  cellElements.forEach((cell) => {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });

  isCircleTurn = false;
  setBoard();
  winMsg.classList.remove("show-msg");
  changeColor();
};

const endGame = (isDraw) => {
  if (isDraw) {
    winTxt.innerText = "It's a DRAW";
  } else {
    winTxt.innerText = isCircleTurn ? "O WIN" : "X WIN";
  }

  winMsg.classList.add("show-msg");
};

const checkWin = (currentPlayer) => {
  return winComb.some((comb) => {
    return comb.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};
const changeColor = () => {
  if (isCircleTurn) {
    body.classList.remove("blue");
    body.classList.remove("red");
    body.classList.add("red");
  } else {
    body.classList.remove("blue");
    body.classList.remove("red");
    body.classList.add("blue");
  }
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoard = () => {
  table.classList.remove("circle");
  table.classList.remove("x");

  if (isCircleTurn) {
    table.classList.add("circle");
  } else {
    table.classList.add("x");
  }
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoard();
};

const handleClick = (e) => {
  //Put mark(X or Circle)
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";
  placeMark(cell, classToAdd);

  //Check victory
  const isWin = checkWin(classToAdd);
  //Check draw
  const isADraw = checkDraw();

  if (isWin) {
    endGame(false);
  } else if (isADraw) {
    endGame(true);
  } else {
    swapTurns();
    changeColor();
  }
};

startGame();

winBtn.addEventListener("click", startGame);
