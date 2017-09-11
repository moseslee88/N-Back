angular.module('gameModule')
	.component('game', {
		templateUrl : 'app/gameModule/game.component.html',
		controller : function($location, localGameService, $cookies, $rootScope) {
			var vm = this;
			vm.activeGame = null;
			$rootScope.gameDifficulty = 1;

			vm.activateGame = function(thisGame) {
				console.log($rootScope.gameDifficulty);
				vm.activeGame = thisGame;
			}

			vm.deactivateGame = function() {
				vm.activeGame = null;
			}

			vm.gameList = [];
			vm.getGameList = function() {
				localGameService.index()
					.then(function(res) {
						vm.gameList = (res.data);
					})
					.catch(console.error);
			}
			vm.getGameList();

			vm.currentUserId = null;

			vm.getCurrentUser = function() {
				vm.currentUserId = $cookies.get("uid");
			}
			vm.getCurrentUser();

		},
		controllerAs : 'vm'
	})