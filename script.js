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
  const reset = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        arr[row][col] = "";
      }
    }
  };

  return { getArr, add, reset };
})();

const player = (name, marker) => {
  return { name, marker };
};

const bot = (difficulty) => {
  arr = gameboard.getArr();
  const play = (difficulty) => {
    if (difficulty == "easy") {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (isValid(row, col)) {
            gameLogic.placeMarker(row, col);
            return;
          }
        }
      }
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
    if (gameboard.add(currentPlayer.marker, row, col)) {
      if (checkWin(gameboard.getArr())) {
        displayController.showResult("win", currentPlayer.name);
        return;
      }
      if (checkTie(gameboard.getArr())) {
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
        playerBot.play("easy");
      }
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
  };

  //Bot section
  const enableBot = (difficulty) => {
    botEnabled = true;
    playerBot = bot(difficulty);
  };

  return {
    placeMarker,
    setPlayer,
    reset,
    getCurrentPlayer,
    enableBot,
  };
})();

const displayController = (() => {
  const markerButtons = document.querySelectorAll(".marker-btn");
  const newGame = document.querySelector(".new-game-btn");
  newGame.addEventListener("click", () => toggleGameModal());
  const cancelGame = document.querySelector(".cancel-form-btn");
  cancelGame.addEventListener("click", () => toggleGameModal());
  const startGame = document.querySelector(".start-btn");
  startGame.addEventListener("click", (event) => {
    if (validateNames()) {
      gameLogic.setPlayer(getName("X"), "X");
      gameLogic.setPlayer(getName("O"), "O");
    } else {
      alert("Invalid name input");
      return false;
    }

    gameboard.reset();
    gameLogic.reset();
    reset();
    initGame();
    toggleGameModal();
    event.preventDefault();
  });

  const initGame = () => {
    let counter = 0; // 0 -> 8
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        markerButtons[counter].addEventListener(
          "click",
          (event) => {
            gameLogic.placeMarker(row, col);
            showCurrentPlayer();
            update();
          },
          { once: true }
        );
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
    // Disable gameboard buttons
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
        markerButtons[counter].innerText = gameboard.getArr()[row][col];
        if (markerButtons[counter].innerText !== "") {
          markerButtons[counter].disabled = true;
        }
        counter++;
      }
    }
  };
  return { showResult, update };
})();

gameLogic.enableBot();
