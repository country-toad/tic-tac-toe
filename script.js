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
  const checkWinner = (arr) => {
    const compareThree = (values) => {
      if (values[0] === "") {
        return false;
      }
      return values.every((value) => value === values[0]);
    };
    for (let row = 0; row < 3; row++) {
      // Check all rows
      if (compareThree(arr[row])) {
        console.log("Winner");
      }
    }
    // Check all columns
    for (let col = 0; col < 3; col++) {
      let currentCol = [];
      for (let row = 0; row < 3; row++) {
        currentCol.push(arr[row][col]);
      }
      if (compareThree(currentCol)) {
        console.log("Winner");
      }
    }
  };
  return { placeMarker, checkWinner };
})();

gameLogic.placeMarker(0, 0);
gameLogic.placeMarker(2, 0);
gameLogic.placeMarker(0, 1);
gameLogic.placeMarker(1, 1);
gameLogic.placeMarker(0, 2);

const displayController = (() => {
  const body = document.querySelector("body");
  const gameboardEle = document.querySelector(".gameboard");
  const initialize = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const markerContainer = document.createElement("div");
        markerContainer.className = "marker-container";
        markerContainer.dataset.row = row + 1;
        markerContainer.innerText = gameboard.getArr()[row][col];
        gameboardEle.appendChild(markerContainer);
      }
    }
  };
  return { initialize };
})();

displayController.initialize();
gameLogic.checkWinner(gameboard.getArr());
gameLogic.checkWinner([
  ["O", "", ""],
  ["O", "", ""],
  ["O", "", ""],
]);
