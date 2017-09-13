angular.module('appModule')
	.component('home', {
		templateUrl : 'app/appModule/home.component.html',
		controller : function($location, $cookies, resultService, profileService, gameService, challengeService, userService, authService, $rootScope, $scope) {
			var vm = this;
			vm.currentUserId = null;
			vm.currentUser = null;

			vm.currentUserId = authService.getToken().id;

			vm.goToRegister = function() {
				$location.path('/register');
			};
			vm.goToProfile = function() {
				console.log("in gotoprofile");
				$location.path('/profile');
			};
			vm.goToGame = function() {
				$location.path('/game');
			}

			var listenForLogin = function(e, user) {
				console.log(user.currentUser);
				vm.currentUser = user.currentUser;
				vm.currentUserId = user.currentUser.id;
				//				console.log(e)
//				console.log(user)
//				vm.getUser();
//				vm.getCurrentUserID();
			}
			
			vm.gameList = [];
			vm.getGameList = function() {
				localGameService.index()
					.then(function(res) {
						vm.gameList = (res.data);
					})
					.catch(console.error);
			}

			$scope.$on('userLogin', listenForLogin);
			$scope.$on('logout', function(e){
				vm.currentUser = null;
				vm.currentUserId = null;
				console.log(vm.currentUser)
				console.log(vm.currentUserId)

			});

		},
		controllerAs : 'vm'
	})