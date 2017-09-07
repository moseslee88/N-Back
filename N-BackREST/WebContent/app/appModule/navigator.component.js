angular.module('appModule')
	.component('navigator', {
		templateUrl : 'app/appModule/navigator.component.html',

		controller : function(authService, $location, $cookies) {
			var vm = this;
			vm.users = [];
			vm.currentUserId = null;

			vm.getCurrentUser = function() {
				vm.currentUserId = $cookies.get("uid");
			}
			vm.getCurrentUser();
			console.log(vm.currentUserId);
			

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