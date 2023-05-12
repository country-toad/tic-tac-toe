const gameboard = (() => {
  // const arr = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];
  const arr = Array(9).fill("");
  const getArr = () => arr;
  const add = (value, position) => {
    if (arr[position] === "" && (value === "X" || value === "O")) {
      arr[position] = value;
    } else {
      console.log(`${value} is invalid input.`);
    }
    return arr;
  };

  return { getArr, add };
})();

// gameboard.add("X", 2);
// console.log(gameboard.getArr());

const player = (marker) => {
  return { marker };
};

// const player1 = player("X");
// const player2 = player("O");

const gameLogic = (() => {
  const player1 = player("X");
  const player2 = player("O");
  let currentPlayer = player1;
  const placeMarker = (position) => {
    gameboard.add(currentPlayer.marker, position);
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

gameLogic.placeMarker(0); // 'X'
gameLogic.placeMarker(8); // 'O'
