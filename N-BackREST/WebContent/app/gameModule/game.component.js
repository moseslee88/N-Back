angular.module('gameModule')
.component('game', {
	templateUrl : 'app/gameModule/game.component.html',
	controller : function( $location) {
		var vm = this;
		console.log("we are in the game component")
		
		
	},
	controllerAs  : 'vm'
})