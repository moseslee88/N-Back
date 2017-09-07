angular.module('gameModule')
	.component('game', {
		templateUrl : 'app/gameModule/game.component.html',
		controller : function($location, localGameService) {
			var vm = this;
			console.log("we are in the game component")

			vm.gameList = [];
			vm.getGameList = function() {
				localGameService.index()
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