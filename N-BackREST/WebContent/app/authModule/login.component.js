angular.module('authModule')
.component('login', {
	templateUrl : 'app/authModule/login.component.html',
	controller : function(authService, $location, $rootScope) {
		var vm = this;
		vm.login = function(user) {
			authService.login(user)
				.then(function(res) {
					$rootScope.$broadcast('userLogin', {
						currentUser : res.data
					});
					$location.path('/')
					$rootScope.currentUser = res.data;
				})
				.catch(console.error);
		}
		
		
		
	},
	controllerAs : 'vm'
})