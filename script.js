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

gameboard.add("o", 0);
gameboard.add("x", 1);
gameboard.add("z", 2);
gameboard.add("X", 2);
console.log(gameboard.getArr());
