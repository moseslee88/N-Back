angular.module('gameModule').component(
		'reaction',
		{
			templateUrl : 'app/gameModule/reaction.component.html',
			controller : function(randomNumService, $scope, $rootScope,
					resultService, $interval) {
				var vm = this;
				vm.points = 0;
				//initially hide game stats from user
				$scope.gameFinished = true;


				var myListOfNums = [];
				myListOfNums = randomNumService.getNums(100,
						parseInt($rootScope.gameDifficulty) * 2);

				var secondArrayNums = [];
				secondArrayNums = randomNumService.getNums(100, 30);
				secondArrayNums.push(100);

				var thirdArrayNums = [];

				var thirdArrayNums = myListOfNums.concat(secondArrayNums);

				console.log(thirdArrayNums);

				var selectedNumArray = [];

				vm.showList = myListOfNums;
				vm.runGame = function(diff) {
					console.log(diff);
					var showFunNums = function() {
						var showTime = 1000 + 500 * parseInt($rootScope.gameDifficulty);
						
						$interval(function(){}, showTime, 1)
								.then(function() {
									$scope.hideNumbers = true;
									runLoop();
								})
					}

					shuffle(thirdArrayNums);
					vm.currentIndex = 0;
					showFunNums();

				}

				$scope.numberSelected = function(num) {
					selectedNumArray.push(num);
					console.log(selectedNumArray);
				}

				var runLoop = function() {
					$interval(function() {
						vm.showNumbers = thirdArrayNums[vm.currentIndex];
						vm.currentIndex++;

					}, 1200, thirdArrayNums.length).then(function() {
						checkResults();
						$scope.disableStart = false;
						$scope.gameFinished = false;
						$scope.gameStart = true;
						$scope.checkCorrect = function() {
							$scope.gameFinished = true;
							$scope.gameStart = false;
						}
						

					})

				}

				var checkResults = function() {
					// check and add points
					for (var i = 0; i < selectedNumArray.length; i++) {
						if (myListOfNums.includes(selectedNumArray[i])) {
							vm.points += 10;
						} else {
							vm.points -= 5;
						}
					}
					
					 if(vm.points <= 0){
                         vm.points = 1;
                     }
					vm.points = Math.floor(Math.sqrt(vm.points / 100) * 100 * parseInt($rootScope.gameDifficulty) * Math.sqrt(parseInt($rootScope.gameDifficulty)));

					console.log(vm.points);

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

				function shuffle(array) {
					var i = 0, j = 0, temp = null

					for (i = array.length - 1; i > 0; i -= 1) {
						j = Math.floor(Math.random() * (i + 1))
						temp = array[i]
						array[i] = array[j]
						array[j] = temp
					}
				}

				vm.startGame = function(diff) {
					
					vm.runGame(diff);
					//disable start button
					$scope.disableStart = true;

				}

			},
			controllerAs : 'vm'
		})
		