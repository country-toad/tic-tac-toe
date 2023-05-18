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
  const body = document.querySelector("body");
  const gameboardEle = document.querySelector(".gameboard");
  const initialize = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const markerContainer = document.createElement("p");
        markerContainer.className = "marker-container";
        markerContainer.dataset.row = row;
        markerContainer.innerText = gameboard.getArr()[row][col];
        gameboardEle.appendChild(markerContainer);
      }
    }
  };
  return { initialize };
})();

displayController.initialize();
