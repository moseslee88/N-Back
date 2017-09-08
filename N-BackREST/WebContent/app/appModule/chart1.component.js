angular.module('appModule')
	.controller("chart1", function ($location, $cookies, resultService, profileService, gameService, challengeService, userService, authService) {
  var vm = this;

  vm.title = "The Battle:"

  vm.labels = ["Blue Lasers", "Knowledge", "Red Lasers", ];

  vm.data = [47.5, 5, 47.5];
});