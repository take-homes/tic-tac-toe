export const statusDisplay: Element = document.querySelector(".game--status")!;

export enum PlayerSigns {
  X = "X",
  O = "O",
}

export let gameActive = true;
export let currentPlayer = PlayerSigns.X;
export let gameState = ["", "", "", "", "", "", "", "", ""];

export const winningMessage = () => `Player ${currentPlayer} has won!`;
export const drawMessage = () => `Game ended in a draw!`;
export const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

if (statusDisplay) {
  statusDisplay.innerHTML = currentPlayerTurn();
}

export const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const handleCellPlayed = (
  clickedCell: { innerHTML: PlayerSigns },
  clickedCellIndex: number
) => {
  /* This function marks the clicked cell with the current player's sign */
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
};

export const handlePlayerChange = () => {
  /* This function changes currentPlayer after each turn */
  currentPlayer =
    currentPlayer === PlayerSigns.X ? PlayerSigns.O : PlayerSigns.X;
  statusDisplay.innerHTML = currentPlayerTurn();
};

export const handleResultValidation = () => {
  /* This function iterates through the gameState to determine if
     there is a winner after a move has been made. */
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
};

export const handleCellClick = function handleCellClick(clickedCellEvent: {
  target: any;
}) {
  /* This function validates that the current player clicked on an empty cell,
     then delegates marking the cell to handleCellPlayed and then calls
     handleResultValidation to determine if there is a winner. */
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
};

export const handleRestartGame = () => {
  /* This function clears the game board and resets the internal state */
  gameActive = true;
  currentPlayer = PlayerSigns.X;
  gameState = ["", "", "", "", "", "", "", "", ""];
  if (statusDisplay) {
    statusDisplay.innerHTML = currentPlayerTurn();
  }
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
};

export const cellElements = document.querySelectorAll(".cell");
if (cellElements) {
  cellElements.forEach((cell) =>
    cell.addEventListener("click", handleCellClick)
  );
}

export const gameRestartElement = document.querySelector(".game--restart")!;
if (gameRestartElement) {
  gameRestartElement.addEventListener("click", handleRestartGame);
}
