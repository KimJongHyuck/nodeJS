//변수 a에  함수를 지정
let a = function () {
  console.log("A");
};

function slowfunc(call) {
  call();
}

slowfunc(a);
