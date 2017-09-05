angular.module('appModule', [])
	.component('navigator', {
		templateUrl : 'app/appModule/navigator.component.html',

		controller : function(authService, $location) {
			var vm = this;
			vm.users = [];

			vm.logout = function() {
				authService.logout().then(function(response) {
					console.log("yay, user logggggggged out");
					$location.path('/');
				})
					.catch(function() {
						console.log("can't logout of this particular session");
					});
			}


		},
		controllerAs : 'vm'
	})