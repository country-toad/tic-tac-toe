const Gameboard = (() => {
  // const arr = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];
  const arr = Array(9).fill("");
  const addX = (position) => {
    if (arr[(position = "")]) {
      arr[position] = "x";
    }
    return this;
  };
  const getArr = () => arr;
  return { getArr };
})();

console.log(Gameboard.getArr());
console.log();
