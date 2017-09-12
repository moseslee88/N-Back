angular.module('gameModule')
	.component('motest', {
		templateUrl : 'app/gameModule/motest.component.html',
		controller : function($location, $timeout, $rootScope, resultService, randomNumService, $interval, $scope) {
			var vm = this;
			$scope.value = 0;
			vm.points = 0;
			vm.showLets = false;
			vm.userInput = "";
			vm.disableStart = false;
			vm.showLetters = "";
			vm.userTurn = false;
			vm.correctCount = 0;
			vm.incorrectCount = 0;
			vm.gameComplete = false;

			var initGame = function() {
				vm.points = 0;
				vm.showLets = false;
				vm.userInput = "";
				vm.disableStart = false;
				vm.showLetters = "";
				vm.userTurn = false;
				vm.correctCount = 0;
				vm.incorrectCount = 0;
				vm.gameComplete = false;
			}



			vm.startGame = function() {
				initGame();
				vm.showLets = true;
				showFunLetters();
			}

			//game Logic Here
			var showFunLetters = function() {
				//setting timer to change every difficulty level
				var showTime = 5000 + 10000 / parseInt($rootScope.gameDifficulty);
				vm.showLetters = randomNumService.getLetters(parseInt($rootScope.gameDifficulty) * 3);

				$interval(function() {}, showTime, 1)
					.then(function() { //change this to differ per difficulty level
						vm.showLets = false;
						vm.userTurn = true;
					})
			} //closes var showFunLetters


			vm.addResults = function(input) {
				inputArr = input.toUpperCase().trim().split('');
				console.log(inputArr);
				console.log(vm.showLetters);
				if (inputArr.length < vm.showLetters.length) {
					var lettersShort = vm.showLetters.length - inputArr.length;
					for (var i = 0; i < lettersShort; i++) {
						inputArr.push(0);
					}
				}

				console.log(inputArr);
				console.log(vm.showLetters);

				for (var i = 0; i < vm.showLetters.length; i++) {
					//if correct
					if (vm.showLetters[i] == inputArr[i]) {
						vm.correctCount++;
					} else {
						vm.incorrectCount++;
					}
					console.log('user is correct');
				}

				vm.calcPoints();
				vm.showResult();

			}

			vm.calcPoints = function() {
				var ratio = (vm.correctCount) / (vm.showLetters.length);
				vm.points = 100 * ratio;
			}

			//take input
			//compare and give points for correct answers
			//end game logic


			vm.buildResult = function() {
				var newResult = {};
				newResult.gameString = vm.showLetters;
				newResult.points = vm.points;
				newResult.difficulty = $rootScope.gameDifficulty;
				newResult.datetime = new Date();
				return newResult;
			}

			vm.saveResult = function() {
				console.log("saving result");
				resultService.create(vm.buildResult(), $rootScope.gameId);
			}

			vm.showResult = function() {
				vm.gameComplete = true;
				if (vm.points <= 0) {
					vm.points = 1;
				}
				vm.points = Math.floor(Math.sqrt(vm.points / 100) * 100 *
					parseInt($rootScope.gameDifficulty) * Math.sqrt(parseInt($rootScope.gameDifficulty)));
				console.log("points: " + vm.points);
				vm.saveResult();
			}

		},
		controllerAs : 'vm'
	})