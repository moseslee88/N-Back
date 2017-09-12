angular.module('appModule')
	.component('home', {
		templateUrl : 'app/appModule/home.component.html',
		controller : function($location, $cookies, resultService, profileService, gameService, challengeService, userService, authService, $rootScope, $scope) {
			var vm = this;
			vm.currentUserId = null;
			vm.currentUser = null;

			vm.getUser = function() {
				if (authService.getToken().id) {
					userService.show()
						.then(function(res) {
							vm.currentUser = res.data;
							console.log(vm.currentUser);
						});
				}
			}

			vm.getCurrentUserID = function() {
				vm.currentUserId = $cookies.get("uid");
				vm.getUser();
			}
			vm.getCurrentUserID();

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

			var listenForLogin = function() {
				vm.getUser();
				vm.getCurrentUserID();
			}
			
			vm.gameList = [];
			vm.getGameList = function() {
				localGameService.index()
					.then(function(res) {
						vm.gameList = (res.data);
					})
					.catch(console.error);
			}

			$scope.$on('login', listenForLogin);

		},
		controllerAs : 'vm'
	})