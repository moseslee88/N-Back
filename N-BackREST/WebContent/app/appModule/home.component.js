angular.module('appModule')
	.component('home', {
		templateUrl : 'app/appModule/home.component.html',
		controller : function($location, $cookies, resultService, profileService, gameService, challengeService, userService, authService, $rootScope, $scope) {
			var vm = this;
			vm.currentUser = $rootScope.currentUser;
			
			console.log($rootScope.currentUser)
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
			
			console.log($rootScope.currentUser);

// $rootScope.currentUserId = authService.getToken().uid;

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

// var listenForLogin = function(e, user) {
// console.log(user.currentUser);
// $rootScope.currentUser = user.currentUser;
// $rootScope.currentUserId = user.currentUser.id;
// }
			
			vm.gameList = [];
			vm.getGameList = function() {
				localGameService.index()
					.then(function(res) {
						vm.gameList = (res.data);
					})
					.catch(console.error);
			}

// $scope.$on('userLogin', listenForLogin);
// $scope.$on('logout', function(e){
// $rootScope.currentUser = null;
// $rootScope.currentUserId = null;
// console.log($rootScope.currentUser)
// console.log($rootScope.currentUserId)
//
// });

		},
		controllerAs : 'vm'
	})