const gameboard = (() => {
  const arr = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const getArr = () => arr;
  const add = (value, row, col) => {
    if (arr[row][col] === "" && (value === "X" || value === "O")) {
      arr[row][col] = value;
      return true;
    } else {
      console.log(`${value} is invalid input or selected square is not empty.`);
      return false;
    }
  };

  return { getArr, add };
})();

const player = (name, marker) => {
  return { name, marker };
};

const gameLogic = (() => {
  const player1 = player("P1", "X");
  const player2 = player("P2", "O");
  let currentPlayer = player1;
  const placeMarker = (row, col) => {
    if (gameboard.add(currentPlayer.marker, row, col)) {
      if (checkWin(gameboard.getArr())) {
        console.log(`${currentPlayer.name} Wins`);
        endGame();
        return;
      }
      if (checkTie(gameboard.getArr())) {
        console.log("Tie");
        endGame();
        return;
      }
      switchPlayer();
    }
  };
  const switchPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };
  const checkWin = (arr) => {
    const compareThree = (values) => {
      if (values[0] === "") {
        return false;
      }
      return values.every((value) => value === values[0]);
    };
    // Check all row win conditions
    for (let row = 0; row < 3; row++) {
      if (compareThree(arr[row])) {
        return true;
      }
    }
    // Check all column win conditions
    for (let col = 0; col < 3; col++) {
      let currentCol = [];
      for (let row = 0; row < 3; row++) {
        currentCol.push(arr[row][col]);
      }
      if (compareThree(currentCol)) {
        return true;
      }
    }
    //Check diagonal win conditions
    let diag1 = [];
    let diag2 = [];
    let ascCol = 0;
    let descCol = 2;
    for (let row = 0; row < 3; row++) {
      diag1.push(arr[row][ascCol]);
      diag2.push(arr[row][descCol]);
      ascCol++;
      descCol--;
    }
    if (compareThree(diag1) || compareThree(diag2)) {
      return true;
    }
  };
  const checkTie = (arr) => {
    // Checks all spots on grid to see if any are empty. If none are empty, it is a tie.
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (arr[row][col] === "") {
          return false;
        }
      }
    }
    return true;
  };
  const endGame = () => {
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach((button) => (button.disabled = "true"));
    displayController.showWinner(currentPlayer.name);
  };
  return { placeMarker };
})();

const displayController = (() => {
  const body = document.querySelector("body");
  const gameboardEle = document.querySelector(".gameboard");
  const initialize = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const markerButton = document.createElement("button");
        markerButton.className = "marker-container";
        markerButton.dataset.row = row;
        markerButton.addEventListener("click", (event) => {
          gameLogic.placeMarker(row, col);
          event.target.innerText = gameboard.getArr()[row][col];
        });
        gameboardEle.appendChild(markerButton);
      }
    }
  };
  const showWinner = (name) => {
    const winnerText = document.createElement("p");
    winnerText.innerText = `${name} wins!`;
    body.appendChild(winnerText);
  };
  return { initialize, showWinner };
})();

displayController.initialize();

// const l = document.querySelector(".marker-container");
// console.log(l.dataset.row);
