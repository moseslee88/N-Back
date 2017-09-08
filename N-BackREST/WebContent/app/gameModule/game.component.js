angular.module('gameModule')
	.component('game', {
		templateUrl : 'app/gameModule/game.component.html',
		controller : function($location, localGameService, $cookies) {
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
			
			vm.currentUserId = null;
	          
	           vm.getCurrentUser = function(){
	               vm.currentUserId = $cookies.get("uid");
	           }
	           vm.getCurrentUser();

		},
		controllerAs : 'vm'
	})