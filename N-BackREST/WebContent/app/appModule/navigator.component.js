angular.module('appModule')
	.component('navigator', {
		templateUrl : 'app/appModule/navigator.component.html',

		controller : function(authService, $location) {
			var vm = this;
			vm.users = [];
			vm.currentUserId = null;

			vm.getCurrentUser = function() {
				vm.currentUserId = $cookies.get("uid");
			}
			vm.getCurrentUser();

			vm.logout = function() {
				authService.logout().then(function(response) {
					console.log("yup, user logged out");
					$location.path('/');
				})
					.catch(function() {
						console.log("can't logout of this particular session");
					});
			}
		},
		controllerAs : 'vm'
	})