angular.module('gameModule')
	.component('motest', {
		templateUrl : 'app/gameModule/motest.component.html',
		controller : function($location, $timeout, $rootScope, resultService, randomNumService, $interval, $scope) {
			var vm = this;
			$scope.value = 0;
			vm.points = 0;
			vm.hideLets = false;
			var difficultyy = parseInt($rootScope.gameDifficulty);
			var randomNums;


			//vm.ArrofNumbers = [];
			//vm.getPracticeNums = [2, 4, 6, 8, 10, 12, 14, 1];

			$timeout(callAtTimeout, 4000);
			function callAtTimeout() {
				console.log("Test Timeout To See What Occurred After 4 seconds- just a time test");
			}

			vm.getDisplayNums = function() { //use these for a scoring points system
				vm.randomNums = Math.floor(Math.sqrt(vm.points / 100) * 100 * $rootScope.gameDifficulty * Math.sqrt($rootScope.gameDifficulty));
				console.log("points: " + vm.randomNums);
			}

			var setsNumOfLetters = function() {
				if (vm.difficulty = 1) {
					return 2;
				}
				if (vm.difficulty = 2) {
					return 4;
				}
			}


			//here we try to Persist results
			vm.buildResult = function() {
				var newResult = {};
				newResult.gameString = vm.show24Numbers;
				newResult.points = vm.points;
				newResult.difficulty = $rootScope.gameDifficulty;
				newResult.datetime = new Date();
				console.log(newResult.datetime); //check console later
				return newResult;
			}

			vm.saveResult = function() {
				console.log("saving result");
				resultService.create(vm.buildResult(), $rootScope.gameId);
			//resultService.create(newResult, $rootScope.gameId);
			}

			vm.showResult = function() {
				if (vm.points <= 0) {
					vm.points = 1;
				}
				vm.points = Math.floor(Math.sqrt(vm.points / 100) * 100 *
					parseInt($rootScope.gameDifficulty) * Math.sqrt(parseInt($rootScope.gameDifficulty)));
				console.log("points: " + vm.points);
				vm.saveResult();
			}

			//shows an array of Randomly-generated Letters based on given total numbers 
				//var random6Nums = [];   //make less DRY, make a method that takes in 2,4,6,8,10,12,14,24 in a method 
				//var random8Nums = [];

			                //randomNums = randomNumService.getLetters(parseInt($rootScope.gameDifficulty) * 3);
		                  	//vm.showLetters = randomNums;





			var results;
			//results+= modifiedPoints;   //some counter for points 

			vm.runGame = function(diff) {
				console.log(parseInt($rootScope.gameDifficulty));
				vm.hideLets = true;
				console.log(diff);
				randomNums = randomNumService.getLetters(parseInt($rootScope.gameDifficulty) * 3);
				vm.showLetters = randomNums;
				//create a timer here
				var showFunLetters = function($rootScope) {
					//setting timer to change every difficulty level
					var showTime = 5000 + 10000 / parseInt($rootScope.gameDifficulty);
					var NumOfRepeats = $rootScope.gameDifficulty;

					$interval(function() {}, showTime, NumOfRepeats)
						.then(function($rootScope) { //change this to differ per difficulty level
							if (parseInt($rootScope.gameDifficulty)) {
								vm.hideLets = false;  //HIDES the letters after a few seconds
								runLoop(difficultyy);
							}


						})
				} //closes var showFunLetters

				showFunLetters($rootScope.gameDifficulty);

				//$scope.LetterSelected = function(somelettercomingin) { IMPLEMENT THIS TONIGHT
				//text+= letter;  IMPLEMENT LATER TONIGHT
				//)

				var runLoop = function($rootScope) {
					$interval(function() {
						vm.showLetters = showFunLetters($rootScope.gameDifficulty);
						console.log("running loop");
					}, 1000, 5).then(function() {
						console.log('THIS IS WHERE I COUNT POINTS'); //IMPLEMENT POINTS LATER
					})
				}
			}          //Closes vm.runGame here.....
			//interval service
			//var counter = 0;
			//	var i = setInterval(function() {
			// do your thing
			//vm.showNumbers = thirdArrayNums[counter];
			//	vm.showNumbers = [counter];
			//		counter++;
			//		if (counter === 12) {
			//		clearInterval(i);
			//		clearInterval(j);
			//	}
			//	}, 2000);
			//vm.points = 10;
			//vm.saveResult();

			vm.runGame() //calling function to have the timer function correctly


			vm.startGame = function() {
				console.log($rootScope.gameDifficulty)
				$timeout(vm.setUpGame($rootScope.gameDifficulty), 3000) //call the set up Game function
					.then(function(d) {
						vm.runGame($rootScope.gameDifficulty);
					}, function(e) {
						console.log(e);
					})
			}

			vm.setUpGame = function(diff) {
				var levelDiff;
				levelDiff = 0.5 * (parseInt(diff)) * parseInt(diff) + 3;
				vm.fullArr = randomNumService.getLetters(levelDiff);
				console.log(vm.fullArr)
				//vm.points = 0;
				vm.points = 0;
				vm.difficulty = diff;
			}



		},
		controllerAs : 'vm'
	})
	//                             
	//                             if($rootScope.gameDifficulty === 2) {
	//     							vm.hideLetters = true;
	//     							vm.hideLetters3 = true;
	//     							vm.hideLetters4 = true;
	//     							vm.hideLetters5 = true;
	//     							vm.hideLetters6 = true;
	//     							vm.hideLetters7 = true;
	//     							vm.hideLetters8 = true;
	//     							runLoop();
	//                                  }
	//                             if($rootScope.gameDifficulty === 3) {
	//     							vm.hideLetters = true;
	//     							vm.hideLetters2 = true;
	//     							vm.hideLetters4 = true;
	//     							vm.hideLetters5 = true;
	//     							vm.hideLetters6 = true;
	//     							vm.hideLetters7 = true;
	//     							vm.hideLetters8 = true;
	//     							runLoop();
	//                                  }  
	//                             if($rootScope.gameDifficulty === 4) {
	//      							vm.hideLetters = true;
	//      							vm.hideLetters2 = true;
	//      							vm.hideLetters3 = true;
	//      							vm.hideLetters5 = true;
	//      							vm.hideLetters6 = true;
	//      							vm.hideLetters7 = true;
	//      							vm.hideLetters8 = true;
	//      							runLoop();
	//                                   }
	//                             if($rootScope.gameDifficulty === 5) {
	//      							vm.hideLetters = true;
	//      							vm.hideLetters2 = true;
	//      							vm.hideLetters3 = true;
	//      							vm.hideLetters4 = true;
	//      							vm.hideLetters6 = true;
	//      							vm.hideLetters7 = true;
	//      							vm.hideLetters8 = true;
	//      							runLoop();
	//                                   }
	//                             if($rootScope.gameDifficulty === 6) {
	//      							vm.hideLetters = true;
	//      							vm.hideLetters2 = true;
	//      							vm.hideLetters3 = true;
	//      							vm.hideLetters4 = true;
	//      							vm.hideLetters5 = true;
	//      							vm.hideLetters7 = true;
	//      							vm.hideLetters8 = true;
	//      							runLoop();
	//                                   }
	//                             if($rootScope.gameDifficulty === 7) {
	//      							vm.hideLetters = true;
	//      							vm.hideLetters2 = true;
	//      							vm.hideLetters3 = true;
	//      							vm.hideLetters4 = true;
	//      							vm.hideLetters5 = true;
	//      							vm.hideLetters6 = true;
	//      							vm.hideLetters8 = true;
	//      							runLoop();
	//                                   }
	//                             if($rootScope.gameDifficulty === 8) {
	//      							vm.hideLetters = true;
	//      							vm.hideLetters2 = true;
	//      							vm.hideLetters3 = true;
	//      							vm.hideLetters4 = true;
	//      							vm.hideLetters5 = true;
	//      							vm.hideLetters6 = true;
	//      							vm.hideLetters7 = true;
	//      							runLoop();
	//                                   }