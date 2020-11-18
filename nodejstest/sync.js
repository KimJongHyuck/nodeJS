const fs = require("fs");

//동기 방식
// console.log('A');
// const result = fs.readFileSync('./B.txt', 'utf8');
// console.log(result);
// console.log('C');

console.log("A"); //Callback
fs.readFile("./B.txt", "utf8", (err, result) => {
  console.log(result);
});
console.log("C");
