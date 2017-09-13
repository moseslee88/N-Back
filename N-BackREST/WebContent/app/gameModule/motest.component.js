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
				vm.showLets = true;   //makes ng-show true so array of Letters shows!!!
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
				inputArr = input.toUpperCase().trim().split("");
				console.log(inputArr);
				console.log(vm.showLetters);
				console.log(vm.showLetters.length);
				testLetters = vm.showLetters.trim().split(" ").join('');
				vm.errors = [];

				console.log(testLetters);
				console.log(testLetters.length);
				if (inputArr.length != testLetters.length) { 
					vm.errors.push("Your answer is not the same length, try again");
                   // return;
					//write a validator for the length of both arrays 
					//check for mistakes in user input or less letters than TEST array
					//var lettersShort = vm.showLetters.length - inputArr.length;
					//for (var i = inputArr.length; i < vm.showLetters.length; i++) {
						//inputArr.push(0);
						//inputArr.push(i);
					//}
				}

				console.log(inputArr);
				console.log(testLetters);

//				for (var i = 0; i < vm.showLetters.length; i++) {
//					//if correct
//					if (vm.showLetters[i] == inputArr[i]) {
//						vm.correctCount++;
//						console.log('user is COrrect');
//					} else {
//						vm.incorrectCount++;
//					}
//					console.log('user is incorrect');
//				}
				
				
				for (var i = 0; i < testLetters.length; i++) {
					//if correct
					if (testLetters[i] == inputArr[i]) {
						vm.correctCount++;
						console.log('user is COrrect');
					} else {
						vm.incorrectCount++;
						console.log('user is incorrect');
					}
				}

				vm.calcPoints();
				vm.showResult();

			}

			vm.calcPoints = function() {
				//var ratio = (vm.correctCount) / (vm.showLetters.length);
				var ratio = (vm.correctCount) / (testLetters.length);
				vm.points = 100 * ratio;
			}
             // ratio = blank / 12;
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