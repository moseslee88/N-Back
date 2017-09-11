angular.module('gameModule')
	.component('position', {
		templateUrl : 'app/gameModule/position.component.html',
		controller : function(randomNumService, $timeout, $interval, $rootScope) {
			var vm = this;

			vm.diff = 0;
			vm.gridSize = 0;
			vm.grid = [], [];
			vm.tempGrid = [];

			//Build the correct sized grid
			vm.buildGrid = function() {
				vm.diff = $rootScope.gameDifficulty;
				vm.gridSize = 1 + parseInt(vm.diff);
				vm.gridSize *= parseInt(vm.gridSize) * 2;
				vm.tempGrid = randomNumService.getUniqueNums(parseInt(vm.gridSize), parseInt(vm.gridSize));
				for (var i = 0; i < vm.gridSize; i++) {
					for (var j = 0; j < vm.gridSize; j++) {
						vm.grid[i][j].push(vm.tempGrid.pop());
						console.log(vm.grid[i][j]);
					}
				}
				vm.gridSize = parseInt(vm.gridSize) / 2;
			};

			vm.startGame = function() {
				vm.buildGrid()
				var j = 0;
				for (var i = 0; i < vm.gridSize; i++) {
					for (j = 0; j < vm.grid.length; j++) {
						console.log(vm.grid[i][j])
					}
				}
			}



		},
		controllerAs : 'vm'
	})