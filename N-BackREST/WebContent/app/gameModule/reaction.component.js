angular.module('gameModule').component('reaction', {
	templateUrl : 'app/gameModule/reaction.component.html',
	controller : function($location, randomNumService, $scope, $rootScope) {
		var vm = this;
		vm.points = 0;

		
		$scope.value = 0;
		// need to call a function later to create list of numbers
		var myListOfNums = [];
		myListOfNums = randomNumService.getNums(100, $rootScope.gameDifficulty);

		var secondArrayNums = [];
		secondArrayNums = randomNumService.getNums(100, 6);

		var thirdArrayNums = [];

		var thirdArrayNums = myListOfNums.concat(secondArrayNums);

		console.log(thirdArrayNums);

		var selectedNumArray = [];

		// cannot bind list that will be used again so had to assign to a bind
		vm.showList = myListOfNums;

		vm.runGame = function(diff) {
			console.log(diff);

			var j = setInterval(function() {
				$scope.value++;
				$scope.$apply();
				if ($scope.value > 5) {
					$scope.hideNumbers = true;
					// clearInterval(j);

				}
				vm.msg = $scope.value;
			}, 1000);

			// now want to show a number every two seconds
			// interval service
			var counter = 0;
			var i = setInterval(function() {
				// do your thing
				vm.showNumbers = thirdArrayNums[counter];

				var numCounter = 0;

				$scope.numberSelected = function(num) {

					selectedNumArray.push(num);
					console.log(selectedNumArray);

				}

				counter++;
				if (counter === 12 ) {
					clearInterval(i);
					clearInterval(j);
					
					for (var i = 0; i < selectedNumArray.length; i++)
					{
							
								if(myListOfNums.includes(selectedNumArray[i]))
								{
									 points = points + 10;
								}
							
					}
					
					console.log(points);
				}
			}, 1200);
			
			
			//now need to compare the arrays to see how many correct numbers 
			// were selected and give points on correct selected ones
		vm.saveResult();
			
		}
		
		vm.buildResult = function() {
            var newResult = {};
            newResult.gameString = vm.showList.toString();
            newResult.points = vm.points;
            newResult.difficulty = $rootScope.gameDifficulty;
            newResult.datetime = new Date();
            return newResult;
        }

        vm.saveResult = function() {
            resultService.create(vm.buildResult(), $rootScope.gameId);
        }	
			

		vm.startGame = function(diff) {
			vm.runGame(diff);
		}

	},
	controllerAs : 'vm'
})