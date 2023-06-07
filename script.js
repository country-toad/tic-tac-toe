const gameboard = () => {
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
    } else if (arr[row][col] !== "") {
      console.log("Error: Selected square is not empty.");
      return false;
    } else if (value !== "X" || value !== "O") {
      console.log(`Error: ${value} is invalid input`);
      return false;
    } else {
      console.log("Error: other");
      return false;
    }
  };
  const reset = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        arr[row][col] = "";
      }
    }
  };
  const checkWin = () => {
    const compareThree = (values) => {
      if (values[0] === "") {
        return false;
      } else if (values.every((value) => value === values[0])) {
        return values[0];
      }
      return false;
    };
    // Diagonal variables and counters
    let diag1 = [];
    let diag2 = [];
    let ascCol = 0;
    let descCol = 2;
    for (let x = 0; x < 3; x++) {
      let currentCol = [];
      // Check all row win conditions - arr[x] sends the nested array at index X
      if (compareThree(arr[x])) {
        return arr[x][0];
      }
      //Check all column win conditions
      for (let y = 0; y < 3; y++) {
        currentCol.push(arr[y][x]);
      }
      if (compareThree(currentCol)) {
        return currentCol[0];
      }
      //Check all diag win conditions
      diag1.push(arr[x][ascCol]);
      diag2.push(arr[x][descCol]);
      ascCol++;
      descCol--;
    }
    if (compareThree(diag1)) {
      return diag1[0];
    }
    if (compareThree(diag2)) {
      return diag2[0];
    }
  };
  const checkTie = () => {
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

  return { getArr, add, reset, checkWin, checkTie };
};

mainGameboard = gameboard();

const player = (name, marker) => {
  return { name, marker };
};

const bot = (difficulty) => {
  arr = mainGameboard.getArr();
  const play = () => {
    if (difficulty == "easy") {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (isValid(row, col)) {
            gameLogic.placeMarker(row, col);
            return;
          }
        }
      }
    } else if (difficulty == "medium") {
      let validMoves = [];
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (isValid(row, col)) {
            validMoves.push([row, col]);
          }
        }
      }
      const randomSpot = Math.floor(Math.random() * validMoves.length);
      gameLogic.placeMarker(
        validMoves[randomSpot][0],
        validMoves[randomSpot][1]
      );
    }
  };
  const isValid = (row, col) => {
    if (arr[row][col] === "") {
      return true;
    }
    return false;
  };
  return { difficulty, play };
};

const gameLogic = (() => {
  let botEnabled = false;
  let playerBot = undefined;
  const player1 = player("P1", "X");
  const player2 = player("P2", "O");
  let currentPlayer = player1;
  const placeMarker = (row, col) => {
    if (mainGameboard.add(currentPlayer.marker, row, col)) {
      if (mainGameboard.checkWin()) {
        displayController.showResult("win", currentPlayer.name);
        return;
      }
      if (mainGameboard.checkTie()) {
        displayController.showResult("tie", currentPlayer.name);
        return;
      }
      switchPlayer();
    }
  };
  const switchPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
      if (botEnabled) {
        playerBot.play();
      }
    } else {
      currentPlayer = player1;
    }
  };

  const setPlayer = (name, marker) => {
    if (marker === "X") {
      player1.name = name;
    } else if (marker === "O") {
      player2.name = name;
    }
  };

  const getCurrentPlayer = () => {
    return currentPlayer;
  };

  const reset = () => {
    currentPlayer = player1;
    botEnabled = false;
  };

  //Bot section
  const enableBot = (difficulty) => {
    botEnabled = true;
    playerBot = bot(difficulty);
  };

  const score = (gameboard) => {
    if (gameboard.checkWin() === "O") {
      return 10;
    } else if (gameboard.checkWin() === "X") {
      return -10;
    } else {
      return 0;
    }
  };

  // const minimax = (currentBoard) => {
  //   if (currentBoard.checkWin === "true") {
  //   }
  // };

  return {
    placeMarker,
    setPlayer,
    reset,
    getCurrentPlayer,
    enableBot,
    score,
  };
})();

testBoard = gameboard();
testBoard.add("X", 0, 2);
testBoard.add("X", 1, 1);
testBoard.add("O", 2, 0);
console.log(gameLogic.score(testBoard));

const displayController = (() => {
  const markerButtons = document.querySelectorAll(".marker-btn");
  const newGame = document.querySelector(".new-game-btn");
  newGame.addEventListener("click", () => toggleGameModal());
  const cancelGame = document.querySelector(".cancel-form-btn");
  cancelGame.addEventListener("click", () => toggleGameModal());
  const startGame = document.querySelector(".start-btn");
  let startGameClickedOnce = false;
  startGame.addEventListener("click", (event) => {
    if (validateNames()) {
      gameLogic.setPlayer(getName("X"), "X");
      gameLogic.setPlayer(getName("O"), "O");
    } else {
      alert("Invalid name input");
      return false;
    }
    mainGameboard.reset();
    gameLogic.reset();
    if (isBotChecked()) {
      gameLogic.enableBot("medium");
    }
    reset();
    if (!startGameClickedOnce) {
      initGame();
      startGameClickedOnce = true;
    }
    toggleGameModal();
    event.preventDefault();
  });

  const initGame = () => {
    let counter = 0; // 0 -> 8
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        markerButtons[counter].addEventListener("click", (event) => {
          gameLogic.placeMarker(row, col);
          showCurrentPlayer();
          update();
        });
        counter++;
      }
    }
  };

  const toggleGameModal = () => {
    const overlay = document.querySelector(".overlay");
    if (overlay.style.display !== "flex") {
      overlay.style.display = "flex";
    } else {
      overlay.style.display = "none";
    }
  };

  const showResult = (result, name) => {
    // Disable mainGameboard buttons
    const allButtons = document.querySelectorAll(".marker-btn");
    allButtons.forEach((button) => (button.disabled = "true"));
    const resultText = document.querySelector(".result");
    // Display results of game in text
    resultText.hidden = false;
    if (result === "win") {
      resultText.innerText = ` ${name} wins!`;
    } else if (result === "tie") {
      resultText.innerText = " Tie!";
    } else {
      resultText.innerText = " Error";
    }
  };

  const reset = () => {
    markerButtons.forEach((button) => {
      button.innerText = "";
      button.disabled = false;
    });
    document.querySelector(".result").innerText = "";
    document.querySelector(".current-player").innerText = "";
  };

  const getName = (player) => {
    if (player === "X") {
      return document.querySelector("#player-x-name").value;
    } else if (player === "O") {
      return document.querySelector("#player-o-name").value;
    } else {
      return false;
    }
  };

  const validateNames = () => {
    if (
      document.querySelector("#player-x-name").value === "" ||
      document.querySelector("#player-o-name").value === ""
    ) {
      return false;
    }
    return true;
  };

  const showCurrentPlayer = () => {
    document.querySelector(".current-player").innerText =
      gameLogic.getCurrentPlayer().name + "'s turn";
  };

  const update = () => {
    let counter = 0; // 0 -> 8
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        markerButtons[counter].innerText = mainGameboard.getArr()[row][col];
        if (markerButtons[counter].innerText !== "") {
          markerButtons[counter].disabled = true;
        }
        counter++;
      }
    }
  };

  const isBotChecked = () => {
    const botCheckbox = document.querySelector("#isBotEnabled");
    if (botCheckbox.checked) {
      return true;
    }
    return false;
  };

  return { showResult, update, isBotChecked };
})();
