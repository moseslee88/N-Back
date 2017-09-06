//n-back test logic here

console.log("go");


var run = function() {
  var numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (var i = 0; i < 60; i++) {
    console.log(numArr[Math.floor(Math.random() * numArr.length)]);

  }
}


run();
