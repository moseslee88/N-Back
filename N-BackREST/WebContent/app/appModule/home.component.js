angular.module('appModule')
	.component('home', {
		templateUrl : 'app/appModule/home.component.html',
		controller : function($location, $cookies, resultService, profileService, gameService, challengeService, userService, authService, $rootScope, $scope) {
			var vm = this;
			vm.currentUser = $rootScope.currentUser;
			
			var checkForCurrentUser = function(){
				if ( $rootScope.currentUser == undefined || !($rootScope.currentUser >= 1) ){
					 var userPromise = userService.show();
					 
					 if(userPromise != undefined){
						 userPromise.then(function(res) {
								$rootScope.currentUser = res.data;
								vm.currentUser = $rootScope.currentUser;
							});
					 } else {
						 $rootScope.currentUser = null;
					 }
					 
				}
			}
			checkForCurrentUser();
			
			vm.goToRegister = function() {
				$location.path('/register');
			};
			vm.goToProfile = function() {
				$location.path('/profile');
			};
			vm.goToGame = function() {
				$location.path('/game');
			}


			
			vm.gameList = [];
			vm.getGameList = function() {
				localGameService.index()
					.then(function(res) {
						vm.gameList = (res.data);
					})
					.catch(console.error);
			}

		},
		controllerAs : 'vm'
	})