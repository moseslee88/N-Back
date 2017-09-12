angular
		.module('gameModule')
		.component(
				'nback',
				{
					templateUrl : 'app/gameModule/nback.component.html',
					controller : function(randomNumService, $timeout,
							$interval, $rootScope, $scope, resultService) {
						var vm = this;
						// various fields that will be var instead of vm
						// eventually
						var initGame = function(){
						vm.fullArr = [];
						vm.movingArr = [];
						vm.currentIndex = 0;
						vm.displayNumber = -1;
						vm.difficulty = 1;
						vm.points = 0;
						vm.gameStarted = false;
						vm.gameFinished = false;
						vm.correctCounter = 0;
						vm.incorrectCounter = 0;
						vm.buttonPressed = false;
						}

						// reset game so nothing bleeds over from a previous
						// play
						vm.setUpGame = function(diff) {
							vm.fullArr = randomNumService.getNums(5,
									(30 + parseInt(diff)));
							vm.fullArr.push("end");
							console.log(vm.fullArr)
							vm.displayNumber = -1;
							vm.currentIndex = 0;
							vm.points = 0;
							vm.difficulty = diff;
							vm.gameStarted = true;
							vm.correctCounter = 0;
							vm.incorrectCounter = 0;
							vm.buttonPressed = false;
						}

						// increments the index to go through the array and gets
						// the array that will be used to check if the user is
						// correct
						vm.runLoop = function() {
							vm.displayNumber = vm.fullArr[vm.currentIndex];
							vm.currentIndex++;
							vm.buttonPressed = false;
							vm.movingArr = vm.fullArr.slice((vm.currentIndex
									- vm.difficulty - 1), vm.currentIndex);
							console.log("moving: " + vm.movingArr);
							$interval(function(){}, 1600, 1).then(function(){
								vm.displayNumber = " - ";
							});
						}

						// user clicked the button
						vm.checkCorrect = function() {
							console.log("checkCorrect");
							if (vm.movingArr.length) {
								vm.buttonPressed = true;
								if (vm.movingArr[0] === vm.movingArr[(vm.movingArr.length - 1)]) {
									console.log("correct");
									vm.correctCounter += 1;
									vm.points += 15;
								} else {
									vm.points -= 4;
									vm.incorrectCounter += 1;
								}
							}
						}

						// show number of points earned in the console
						vm.showResult = function() {
							if(vm.points <= 0){
								vm.points = 1;
							}
							vm.points = Math.floor(Math.sqrt(vm.points / 100) * 100 * parseInt($rootScope.gameDifficulty) * Math.sqrt(parseInt($rootScope.gameDifficulty)));
							console.log("points: " + vm.points);
							vm.saveResult();
							vm.gameFinished = true;
						}

						// use $interval to iteratively run the game loop until
						// there are no numbers left in the array
						vm.runGame = function(diff) {
							$interval(vm.runLoop, 2000, vm.fullArr.length)
									.then(function() {
										vm.showResult();
									}, function(e) {
										console.log(e);
									});
						}

						// user clicks start button which calls all other
						// functions, not sure that I am using $timeout
						// correctly
						vm.startGame = function() {
							initGame();
							console.log($rootScope.gameDifficulty)
							$timeout(vm.setUpGame($rootScope.gameDifficulty),
									3000).then(function(d) {
								vm.runGame($rootScope.gameDifficulty);
							}, function(e) {
								console.log(e);
							})
						}

						vm.buildResult = function() {
							var newResult = {};
							newResult.gameString = vm.fullArr.toString();
							newResult.points = vm.points;
							newResult.difficulty = $rootScope.gameDifficulty;
							newResult.datetime = new Date();
							console.log("bulding result with date: ");
							console.log(newResult.datetime);
							return newResult;
						}

						vm.saveResult = function() {
							console.log("saving result");
							resultService.create(vm.buildResult(),
									$rootScope.gameId);
						}
					},
					controllerAs : 'vm'
				})