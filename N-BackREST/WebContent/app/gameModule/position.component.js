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
			vm.gameStarted = false;
			vm.gameFinished = false;
			
			vm.initGame = function(){
				vm.diff = 0;
				vm.gridSize = 0;
				vm.grid = [];
				vm.randomNum = null;
				vm.points = 0;
				var turnCounter = 0;
				var tempGrid = [];
				var persistedArr = [];
				vm.hideNums = false;
				vm.gameStarted = false;
				vm.gameFinished = false;
				vm.correctCounter = 0;
				vm.incorrectCounter = 0;
			}
		
			
			genRandomNum = function(){
				vm.randomNum = Math.floor(Math.random() * ((vm.gridSize * vm.gridSize) -1 ));
			}
				
			vm.showResult = function() {
				if(vm.points <= 0){
                    vm.points = 1;
                }
                vm.points = Math.floor(Math.sqrt(vm.points / 100)
                        * 100 * $rootScope.gameDifficulty
                        * Math.sqrt($rootScope.gameDifficulty));
                vm.saveResult();
            } 
			
			
			vm.buildResult = function() {
				var newResult = {};
				newResult.gameString = persistedArr.toString();
				newResult.points = vm.points;
				newResult.difficulty = $rootScope.gameDifficulty;
				newResult.datetime = new Date();
				return newResult;
			}

			vm.saveResult = function() {
				vm.gameFinished = true;
				resultService.create(vm.buildResult(), 4);
				resetData();
			}
			

			vm.buildGrid = function() {
				vm.diff = $rootScope.gameDifficulty;
				vm.gridSize = 1 + parseInt(vm.diff);
				vm.gridSize *= parseInt(vm.gridSize);
				tempGrid = randomNumService.getUniqueNums(parseInt(vm.gridSize), parseInt(vm.gridSize));
				persistedArr = angular.copy(tempGrid);
				vm.gridSize = 1 + parseInt(vm.diff);
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
				vm.initGame();
				vm.gameStarted = true;
				vm.buildGrid();
			}

			vm.guessNumber = function(num) {
				if(num == vm.randomNum){
					 vm.correctCounter += 1;
					 vm.points += 14;
				}else {
					 vm.incorrectCounter += 1;

                    vm.points -= 6;
                }
				genRandomNum();
				turnCounter += 1;

				if(turnCounter >= 7){
					vm.showResult();
					resetData();
				}
				
			}
			
			resetData = function(){
				vm.diff = 0;
				vm.gridSize = 0;
				vm.grid = [];
				vm.randomNum = null;
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