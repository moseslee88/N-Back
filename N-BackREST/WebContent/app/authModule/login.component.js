angular.module('authModule')
.component('login', {
	templateUrl : 'app/authModule/login.component.html',
	controller : function(authService, $location, $rootScope) {
		var vm = this;
		vm.login = function(user) {
			authService.login(user)
				.then(function(res) {
					console.log(res.data);
					$rootScope.$broadcast('userLogin', {
						currentUser : res.data
					});
					$location.path('/')
					
				})
				.catch(console.error);
		}
		
		
	},
	controllerAs : 'vm'
})