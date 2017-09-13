angular
		.module('gameModule')
		.component(
				'nback',
				{
					templateUrl : 'app/gameModule/nback.component.html',
					controller : function(randomNumService, $timeout,
							$interval, $rootScope, $scope, resultService) {
						var vm = this;

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

						vm.setUpGame = function(diff) {
							vm.fullArr = randomNumService.getNums(5,
									(30 + parseInt(diff)));
							vm.fullArr.push("end");
							vm.displayNumber = -1;
							vm.currentIndex = 0;
							vm.points = 0;
							vm.difficulty = diff;
							vm.gameStarted = true;
							vm.correctCounter = 0;
							vm.incorrectCounter = 0;
							vm.buttonPressed = false;
						}

						vm.runLoop = function() {
							vm.displayNumber = vm.fullArr[vm.currentIndex];
							vm.currentIndex++;
							vm.buttonPressed = false;
							vm.movingArr = vm.fullArr.slice((vm.currentIndex
									- vm.difficulty - 1), vm.currentIndex);
							$interval(function(){}, 1600, 1).then(function(){
								vm.displayNumber = " - ";
							});
						}

						vm.checkCorrect = function() {
							if (vm.movingArr.length) {
								vm.buttonPressed = true;
								if (vm.movingArr[0] === vm.movingArr[(vm.movingArr.length - 1)]) {
									vm.correctCounter += 1;
									vm.points += 15;
								} else {
									vm.points -= 4;
									vm.incorrectCounter += 1;
								}
							}
						}

						vm.showResult = function() {
							if(vm.points <= 0){
								vm.points = 1;
							}
							vm.points = Math.floor(Math.sqrt(vm.points / 100) * 100 * parseInt($rootScope.gameDifficulty) * Math.sqrt(parseInt($rootScope.gameDifficulty)));
							vm.saveResult();
							vm.gameFinished = true;
						}

						vm.runGame = function(diff) {
							$interval(vm.runLoop, 2000, vm.fullArr.length)
									.then(function() {
										vm.showResult();
									}, function(e) {
										console.log(e);
									});
						}


						vm.startGame = function() {
							initGame();
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
							return newResult;
						}

						vm.saveResult = function() {
							resultService.create(vm.buildResult(),2);
						}
					},
					controllerAs : 'vm'
				})