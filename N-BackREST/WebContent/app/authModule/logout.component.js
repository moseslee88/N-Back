angular.module('authModule')
.component('logout', {
	templateUrl : 'app/authModule/logout.component.html',
	controller : function(authService, $location, $cookies) {
		var vm = this;
		
		vm.logout = function() {
			authService.logout()
				.then(function(res){
					$cookies.remove('uid');
					$location.path("/")
				})
				.catch(console.error)
		}
		
	},
	controllerAs  : 'vm'
})