angular.module('appModule')
.component('n-b-nav', {
	templateUrl : 'app/appModule/n-b-nav.component.html',
	controller : function(authService) {
		var vm = this;
		
		vm.checkLogin = function() {
			if (authService.getToken().id) {
				return false;
			}
			return true;
		}
	},
	controllerAs : 'vm'
})