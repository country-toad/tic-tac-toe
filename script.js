const gameboard = (() => {
  // const arr = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];
  const arr = Array(9).fill("");
  const addX = (position) => {
    if (arr[position] == "") {
      arr[position] = "x";
    }
    return arr;
  };
  const getArr = () => arr;
  return { getArr, addX };
})();

gameboard.addX(1);
console.log(gameboard.getArr());
