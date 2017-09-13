angular.module('gameModule')
	.component('position', {
		templateUrl : 'app/gameModule/position.component.html',
		controller : function(randomNumService, $timeout, $interval, $rootScope, $scope, resultService) {
			var vm = this;

			vm.diff = 0;
			vm.gridSize = 0;
			vm.grid = [];
			vm.randomNum = null;
			vm.points = 0;
			var turnCounter = 0;
			var tempGrid = [];
			var persistedArr = [];
			vm.hideNums = false;
		
			
			genRandomNum = function(){
				vm.randomNum = Math.floor(Math.random() * ((vm.gridSize * vm.gridSize) -1 ));
			}
				
			vm.showResult = function() {
                vm.points = Math.floor(Math.sqrt(vm.points / 100)
                        * 100 * $rootScope.gameDifficulty
                        * Math.sqrt($rootScope.gameDifficulty));
                console.log("points: " + vm.points);
                vm.saveResult();
            } 
			
			
			vm.buildResult = function() {
				var newResult = {};
				console.log(persistedArr.toString())
				newResult.gameString = persistedArr.toString();
				newResult.points = vm.points;
				newResult.difficulty = $rootScope.gameDifficulty;
				newResult.datetime = new Date();
				console.log("bulding result with date: ");
				console.log(newResult.datetime);
				return newResult;
			}

			vm.saveResult = function() {
				console.log("saving result");
				resultService.create(vm.buildResult(), $rootScope.gameId);
				resetData();
			}
			
			//Build the correct sized grid
			vm.buildGrid = function() {
				vm.diff = $rootScope.gameDifficulty;
				vm.gridSize = 1 + parseInt(vm.diff);
				vm.gridSize *= parseInt(vm.gridSize);
				tempGrid = randomNumService.getUniqueNums(parseInt(vm.gridSize), parseInt(vm.gridSize));
				persistedArr = angular.copy(tempGrid);
				vm.gridSize = 1 + parseInt(vm.diff);
				console.log(vm.gridSize + "Grid Size");
				for (var i = 0; i < vm.gridSize; i++) {
					vm.grid[i] = [];
					for (var j = 0; j < vm.gridSize; j++) {
						vm.grid[i][j] = tempGrid.pop();
						
					}
					genRandomNum();
					timer();
				}
			};

			vm.startGame = function() {
				vm.buildGrid()
			}

			vm.guessNumber = function(num) {
				if(num == vm.randomNum){
					 console.log("correct");
					 vm.points += 14.28;
				}else {
					 console.log("not correct");

                    vm.points -= 6;
                }
				genRandomNum();
				turnCounter += 1;
				 console.log(turnCounter);

				if(turnCounter == 7){
					vm.showResult();
					resetData();
				}
				
			}
			
			resetData = function(){
				vm.diff = 0;
				vm.gridSize = 0;
				vm.grid = [];
				vm.randomNum = null;
				vm.points = 0;
				turnCounter = 0;
				tempGrid = [];
				persistedArr = [];
				vm.hideNums = false;
			}
				
			
			var timer = function() {
				$interval(function(){}, 10000, 1).then(function(){
					vm.hideNums = true;
				})
			};
			


		},
		controllerAs : 'vm'
	})