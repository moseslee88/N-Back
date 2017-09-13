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
			//vm.errors = []; //empty array for displaying user input errors, if any

			var initGame = function() {
				vm.points = 0;
				vm.showLets = false;
				vm.userInput = "";
				vm.disableStart = true;
				vm.showLetters = "";
				vm.userTurn = false;
				vm.correctCount = 0;
				vm.incorrectCount = 0;
				vm.gameComplete = false;
				vm.errors = [];
			}

			vm.startGame = function() {
				initGame();
				vm.showLets = true; //makes ng-show true so array of Letters shows!!!
				showFunLetters();
			}
			
			

			//game Logic Here
			var showFunLetters = function() {
				//setting timer to change every difficulty level (LESS time per higher difficulty level)
				var showTime = 5000 + 10000 / parseInt($rootScope.gameDifficulty);
				vm.showLetters = randomNumService.getLetters(parseInt($rootScope.gameDifficulty) * 4);

				$interval(function() {}, showTime, 1)
					.then(function() { 
						vm.showLets = false;
						vm.userTurn = true;
					})
			} 


			vm.addResults = function(input) {
				inputArr = input.toUpperCase().trim().split("");
				testLetters = vm.showLetters.trim().split(" ").join('');

				console.log(testLetters.length);

				//some ERROR checking
				if (inputArr == null) {
					vm.errors.push("You can't submit a blank response");
					vm.gameComplete = true;
					return;
				}
				
				if (inputArr.length != testLetters.length) {
					vm.errors.push("Your answer is not same length as the test Sequence, please try again");
					vm.gameComplete = true;
					return;
				//write a validator for the length of both arrays 
				//check for mistakes in user input or less letters than TEST array
				//var lettersShort = vm.showLetters.length - inputArr.length;
				//for (var i = inputArr.length; i < vm.showLetters.length; i++) {
				//inputArr.push(0);
				//inputArr.push(i);
				//}
				}

				//if (inputArr != NaN) {
				var patt1 = /[0-9]/g;
				for (var i = 0; i < inputArr.length; i++) {
					if (inputArr[i].match(patt1)) {
						vm.errors.push("You must include an answer of letters, crazy")
						vm.gameComplete = true;
						return;
					}
				}

	

				for (var i = 0; i < testLetters.length; i++) {
					if (testLetters[i] == inputArr[i]) {
						vm.correctCount++;
						console.log('user is COrrect'); 	//if correct
					} else {
						vm.incorrectCount++;
						console.log('user is incorrect');
					}
				}

				vm.calcPoints();
				vm.showResult();
			}

			vm.calcPoints = function() {
				var ratio = (vm.correctCount) / (testLetters.length);
				vm.points = 100 * ratio;
			}
			
			// StepS for points logic
			// ratio = blank / 9 or 12 or 15;
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