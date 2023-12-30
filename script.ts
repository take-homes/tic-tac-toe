const statusDisplay: Element = document.querySelector(".game--status")!;

enum PlayerSigns {
  X = "X",
  O = "O",
}

let gameActive = true;
let currentPlayer = PlayerSigns.X;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellPlayed(
  clickedCell: { innerHTML: PlayerSigns },
  clickedCellIndex: number
) {}

function handlePlayerChange() {}

function handleResultValidation() {}

function handleCellClick(clickedCellEvent: { target: any }) {}

function handleRestartGame() {}

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game--restart")!
  .addEventListener("click", handleRestartGame);
