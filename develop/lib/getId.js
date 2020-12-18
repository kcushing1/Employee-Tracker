function getId(input) {
  let inputArr = input.split(" ");
  let gotId = parseInt(inputArr.pop());
  return gotId;
}

module.exports = getId;
