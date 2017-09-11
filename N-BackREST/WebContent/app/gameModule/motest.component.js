angular.module('gameModule')
.component('motest', {
	templateUrl : 'app/gameModule/motest.component.html',
	controller : function($location, $timeout, $rootScope) {
		var vm = this;
		
		vm.ArrofNumbers = [];
		vm.randomNums = [];
		vm.getPracticeNums = [2, 4, 6, 8, 10, 12, 14, 1];
		
		 $timeout(callAtTimeout, 3000);
		 
		 vm.getDisplayNums = function() {
				vm.randomNums = Math.floor(Math.sqrt(vm.points / 100) * 100 * $rootScope.gameDifficulty * Math.sqrt($rootScope.gameDifficulty));
				console.log("points: " + vm.randomNums);
			}



	function callAtTimeout() {
	    console.log("Timeout occurred - just a time test");
	}
	
	
		
		
	},
	controllerAs  : 'vm'
})