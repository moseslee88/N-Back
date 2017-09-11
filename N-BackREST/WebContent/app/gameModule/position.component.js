angular.module('gameModule')
	.component('position', {
		templateUrl : 'app/gameModule/position.component.html',
		controller : function(randomNumService, $timeout, $interval, $rootScope) {
			var vm = this;

			vm.diff = 0;
			vm.gridSize = 0;
			vm.grid = [];


			//Build the correct sized grid
			vm.buildGrid = function() {
				vm.diff = $rootScope.gameDifficulty;
				vm.gridSize = 1 + parseInt(vm.diff);
				vm.gridSize = parseInt(vm.gridSize) * 2;
				vm.grid = randomNumService.getUniqueNums(parseInt(vm.gridSize), parseInt(vm.gridSize))
				vm.gridSize = parseInt(vm.gridSize) / 2;
			};
			
			vm.startGame = function() {
				vm.buildGrid()
				for (var i = 0; i < vm.grid.length; i++) {
					console.log(vm.grid[i])
				}
			
			}



		},
		controllerAs : 'vm'
	})