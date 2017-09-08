angular.module('appModule')
	.controller("chart1", function($location, $cookies, resultService, profileService, gameService, challengeService, userService, authService) {
		var vm = this;

		vm.title = "Number of games Played"

		vm.labels = [];
		vm.data = [];
		
		resultService.index(true)
			.then(function(res) {
				
				var results = res.data;
				var gamesWithResults = {};
				
				results.forEach(function(result, idx, arr) {
					console.log(result)
					if (!gamesWithResults[result.game.name]) {
						gamesWithResults[result.game.name] = 1;
					} else {
						gamesWithResults[result.game.name]++;
					}
					
				})
				for (var game in gamesWithResults) {
					vm.labels.push(game);
					vm.data.push(gamesWithResults[game]);
				}
				
				console.log("vm.labels")
				console.log(vm.labels)
				console.log("vm.data")
				console.log(vm.data)
				
			});
		
	});