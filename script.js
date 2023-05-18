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
    } else {
      console.log(`${value} is invalid input.`);
    }
    return arr;
  };

  return { getArr, add };
})();

// console.log(gameboard.getArr());

const player = (marker) => {
  return { marker };
};

const gameLogic = (() => {
  const player1 = player("X");
  const player2 = player("O");
  let currentPlayer = player1;
  const placeMarker = (row, col) => {
    gameboard.add(currentPlayer.marker, row, col);
    switchPlayer();
  };
  const switchPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };
  return { placeMarker, switchPlayer };
})();

gameLogic.placeMarker(0, 0); // 'X'
gameLogic.placeMarker(0, 1); // 'O'
gameLogic.placeMarker(0, 2); // 'O'
gameLogic.placeMarker(2, 2);

const displayController = (() => {
  const initGameboard = () => {
    const gameboardEle = document.createElement("div");
    gameboardEle.className = "gameboard";
    const body = document.querySelector("body");
    body.appendChild(gameboardEle);
    for (i = 0; i < 3; i++) {
      const markerContainer = document.createElement("p");
      markerContainer.className = "marker-container";
      markerContainer.innerText = gameboard.getArr()[i];
      gameboardEle.appendChild(markerContainer);
    }
  };
  return { initGameboard };
})();

displayController.initGameboard();
