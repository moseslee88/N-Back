angular.module('authModule')
.component('logout', {
	templateUrl : 'app/authModule/logout.component.html',
	controller : function(authService, $location, $cookies, $rootScope) {
		var vm = this;		
		
	},
	controllerAs  : 'vm'
})