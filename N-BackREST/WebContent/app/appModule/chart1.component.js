angular.module('appModule')
	.controller("chart1", function ($location, $cookies, resultService, profileService, gameService, challengeService, userService, authService) {
  var vm = this;

  vm.title = "Number of games Played"

  vm.labels = [];
  vm.listOfGames = null;
  
  loadGameNames = function () {
	gameService.index().then(function(res){
		vm.listOfGames = res.data;
	})
}

  vm.data = [47.5, 5, 47.5];
});