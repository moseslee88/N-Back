angular.module('gameModule')
	.component('game', {
		templateUrl : 'app/gameModule/game.component.html',
		controller : function($location, gameService) {
			var vm = this;
			console.log("we are in the game component")

			vm.gameList = [];
			vm.getGameList = function() {
				gameService.index()
					.then(function(res) {
						vm.gameList = (res.data);
					})
					.catch(console.error);
			}
			vm.getGameList();
			console.log(vm.gameList);

		},
		controllerAs : 'vm'
	})