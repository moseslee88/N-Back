angular.module('gameModule')
	.component('motest', {
		templateUrl : 'app/gameModule/motest.component.html',
		controller : function($location, $timeout, $rootScope, resultService, randomNumService, $interval, $scope) {
			var vm = this;
			$scope.value = 0;

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

			//shows an array of Randomly-generated Letters based on given total numbers 
			var randomNums = [];
			//var random4Nums = [];
			//var random6Nums = [];   //make less DRY, make a method that takes in 2,4,6,8,10,12,14,24 in a method 
			//var random8Nums = [];
			//var random10Nums = [];

			randomNums = randomNumService.getLetters(2);
			vm.showNumbers = randomNums;
			random4Nums = randomNumService.getLetters(4);
			vm.show4Numbers = random4Nums;
			random6Nums = randomNumService.getLetters(6);
			vm.show6Numbers = random6Nums;
			random8Nums = randomNumService.getLetters(8);
			vm.show8Numbers = random8Nums;
			random10Nums = randomNumService.getLetters(10);
			vm.show10Numbers = random10Nums;
			random12Nums = randomNumService.getLetters(12);
			vm.show12Numbers = random12Nums;
			random14Nums = randomNumService.getLetters(14);
			vm.show14Numbers = random14Nums;
			random24Nums = randomNumService.getLetters(24); //level 8 is really, really difficult
			vm.show24Numbers = random24Nums;
			
			
			

			var results;
			//results+= modifiedPoints;   //some counter for points 

			vm.runGame = function(diff) {
				console.log(diff);


				var j = $interval(function(){    //create a timer here
						$scope.value++;
						//$scope.$apply();
						if ($scope.value > 10) {
							vm.hideLetters = true;				
						}
						if ($scope.value == 120) {
							vm.hideLetters = true;
							clearInterval(j);
						}
						vm.msg = $scope.value;
						
					}, 1000, 88);     //change this to DYNAMICALLY
				 //setting timer to change every 1000 millis aka 1 sec


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
				vm.points = 10;
				vm.saveResult();
			}


			vm.runGame()    //calling function to have the timer function correctly


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