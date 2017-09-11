angular.module('gameModule')
.component('motest', {
	templateUrl : 'app/gameModule/motest.component.html',
	controller : function($location, $timeout, $rootScope) {
		var vm = this;
		
		vm.ArrofNumbers = [];
		
		 $timeout(callAtTimeout, 3000);



	function callAtTimeout() {
	    console.log("Timeout occurred - just a time test");
	}
	
	
		
		
	},
	controllerAs  : 'vm'
})