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
						vm.fullArr = [];
						vm.movingArr = [];
						vm.currentIndex = 0;
						vm.displayNumber = -1;
						vm.difficulty = 1;
						vm.points = 0;

						// reset game so nothing bleeds over from a previous
						// play
						vm.setUpGame = function(diff) {
							vm.fullArr = randomNumService.getNums(5,
									(30 + parseInt(diff)));
							console.log(vm.fullArr)
							vm.displayNumber = -1;
							vm.currentIndex = 0;
							vm.points = 0;
							vm.difficulty = diff;
						}

						// doesn't work! will display the current comparison
						// number for n-back game
						vm.getDisplayNum = function() {
							return vm.displayNumber;
						}

						// increments the index to go through the array and gets
						// the array that will be used to check if the user is
						// correct
						vm.runLoop = function() {
							vm.displayNumber = " ";
							$interval(function(){}, 10000);
							vm.displayNumber = vm.fullArr[vm.currentIndex];
							vm.movingArr = vm.fullArr.slice((vm.currentIndex
									- vm.difficulty - 1), vm.currentIndex);
							vm.currentIndex++;
							console.log("moving: " + vm.movingArr);
						}

						// user clicked the button, now either add points or
						// take them away (points are not normalized to 100 per
						// game yet)
						vm.checkCorrect = function() {
							console.log("checkCorrect");
							if (vm.movingArr.length) {
								if (vm.movingArr[0] === vm.movingArr[(vm.movingArr.length - 1)]) {
									console.log("correct");
									vm.points += 15;
								} else {
									vm.points -= 4;
								}
							}
						}

						// show number of points earned in the console
						vm.showResult = function() {
							vm.points = Math.floor(Math.sqrt(vm.points / 100)
									* 100 * $rootScope.gameDifficulty
									* Math.sqrt($rootScope.gameDifficulty));
							console.log("points: " + vm.points);
							vm.saveResult();
						}

						// use $interval to iteratively run the game loop until
						// there are no numbers left in the array
						vm.runGame = function(diff) {
							$interval(vm.runLoop, 1200, vm.fullArr.length)
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