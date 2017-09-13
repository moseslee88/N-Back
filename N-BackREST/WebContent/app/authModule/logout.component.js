angular.module('authModule')
.component('logout', {
	templateUrl : 'app/authModule/logout.component.html',
	controller : function(authService, $location, $cookies, $rootScope) {
		var vm = this;		
//		vm.logout = function() {
//			authService.logout()
//				.then(function(res){
//					$rootScope.$broadcast('logout',{});
//					$cookies.remove('uid');
//					$location.path("/")
//				})
//				.catch(console.error)
//		}
		
	},
	controllerAs  : 'vm'
})