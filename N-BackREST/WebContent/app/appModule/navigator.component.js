angular.module('appModule')
	.component('navigator', {
		templateUrl : 'app/appModule/navigator.component.html',

		controller : function(authService, $location, $cookies, $scope, $rootScope) {
			var vm = this;
//			vm.users = [];
//			vm.currentUserId = null;

			vm.logout = function() {
				authService.logout().then(function(response) {
					//rootScope to communicate between navigator and home component 
					$rootScope.$broadcast('logout',{});
					$rootScope.currentUser = null;
					$cookies.currentUser = null;
					$location.path('/');
				})
					.catch(function() {
					});
			}
			
//			$scope.$on('userLogin', function(e,user){
//				vm.currentUserId = user.currentUser.id;
//				console.log('broadcast that user LOGGEdd in')
//			})
		},
		controllerAs : 'vm'
	})