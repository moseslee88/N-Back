angular
		.module('gameModule')
		.component(
				'reaction',
				{
					templateUrl : 'app/gameModule/reaction.component.html',
					controller : function(randomNumService, $scope, $rootScope,
							resultService, $interval, $location) {
						var vm = this;
						vm.points = 0;
						vm.correct = 0;
						vm.totalNum = 0;
						vm.incorrect = 0;
						// initially hide game stats from user
						$scope.gameFinished = false;
						$scope.gameStart = false;

						var initGame = function() {
							vm.points = 0;
							vm.correct = 0;
							vm.totalNum = 0;
							vm.incorrect = 0;
							// initially hide game stats from user
							$scope.gameFinished = false;
							$scope.gameStart = false;
							$scope.hideNumbers = false;
						}

						var buildGame = function() {

							vm.myListOfNums = [];
							vm.myListOfNums = randomNumService.getNums(100,
									parseInt($rootScope.gameDifficulty) * 2);

							vm.secondArrayNums = [];
							vm.secondArrayNums = randomNumService.getNums(100, 20);
							// vm.secondArrayNums.push(100);

							vm.thirdArrayNums = [];

							vm.thirdArrayNums = vm.myListOfNums
									.concat(vm.secondArrayNums);

							console.log(vm.thirdArrayNums);

							vm.selectedNumArray = [];

							vm.showList = vm.myListOfNums;
						}

						vm.runGame = function(diff) {
							$scope.gameStart = true;

							console.log(diff);
							var showFunNums = function() {
								var showTime = 1000 + 500 * parseInt($rootScope.gameDifficulty);

								$interval(function() {
								}, showTime, 1).then(function() {
									$scope.hideNumbers = true;
									runLoop();
								})
							}

							shuffle(vm.thirdArrayNums);
							vm.currentIndex = 0;
							showFunNums();

						}

						$scope.numberSelected = function(num) {
							vm.selectedNumArray.push(num);
							console.log(vm.selectedNumArray);
						}

						var runLoop = function() {
							$interval(
									function() {
										vm.showNumbers = vm.thirdArrayNums[vm.currentIndex];
										vm.currentIndex++;

									}, 800, vm.thirdArrayNums.length + 1).then(
									function() {
										checkResults();
										$scope.disableStart = false;
										$scope.gameFinished = true;

										// need to call startGame when return is
										// cl

									})

						}

						var checkResults = function() {
							// check and add points

							var pointPerCorrect = 100 / (parseInt($rootScope.gameDifficulty) * 2);

							for (var i = 0; i < vm.selectedNumArray.length; i++) {
								if (vm.myListOfNums.includes(vm.selectedNumArray[i])) {
									vm.points = vm.points + pointPerCorrect;
									vm.correct++;
									console.log(vm.correct);

								} else {
									vm.points = vm.points
											- (pointPerCorrect);
									vm.incorrect++;
									console.log(vm.incorrect);

								}

							}
							// console.log(vm.correct);
							// console.log(vm.incorrect);

							if (vm.points <= 0) {
								vm.points = 1;
							}
							vm.points = Math
									.floor(Math.sqrt(vm.points / 100)
											* 100
											* parseInt($rootScope.gameDifficulty)
											* Math
													.sqrt(parseInt($rootScope.gameDifficulty)));

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
							resultService.create(vm.buildResult(),5);
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

						vm.startGame = function() {

							initGame();
							buildGame();
							vm.runGame($rootScope.gameDifficulty);
							// disable start button
							$scope.disableStart = true;

						}

					},
					controllerAs : 'vm'
				})
