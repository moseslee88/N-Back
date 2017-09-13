angular.module("appModule")
	.controller("BarCtrl", function($filter,$rootScope, $scope, $location, $cookies, resultService, profileService, gameService, challengeService, userService, authService) {


		var userResults = [];
		var communityResults = null;
		var communityData = [];
		var communityAvg = null;
		var gameName = "position";
		var user = null;
		var gameNames = [];

		buildData = function() {
			
			
			var userPromise = userService.show();
			 
			 if(userPromise != undefined){
				 userPromise.then(function(res) {
						user = res.data;
						$scope.series = [ user.profile.name, 'Community Average' ];
					});
			 } else {
				 $scope.series = ['', 'Community Average' ];
			 }

			// Takes the avarage score of a game based on the game name
			$scope.labels = [];
			$scope.data = [ [], [] ];

			
			
			gameService.index().then(function(res) {
				var games = {};
				/*
				 * {
				 * 	moTest : {},
				 *  otherGameName : {}
				 * }
				 */
				res.data.forEach(function(game, idx, array) {
					games[game.name] = {};

				});
				resultService.index(true)
					.then(function(res){
						
						res.data.forEach(function(result, idx, array) {
							if (games[result.game.name].points) {
								games[result.game.name].points += result.points;
								games[result.game.name].gamesPlayed += 1;
							} else {
								games[result.game.name].points = result.points;
								games[result.game.name].gamesPlayed = 1;
							}
							
						})
						for (var game in games) {
								var avg = 0;
								avg = $filter('number')(games[game].points / games[game].gamesPlayed, 2);
								$scope.data[0].push(avg)
							}
					})
					resultService.indexAll(true)
						.then(function(res) {
							var comTotal = 0;
							
							communityResults = res.data;
							communityResults.forEach(function(result, idx, arr) {
								if (games[result.game.name].points) {
									games[result.game.name].points += result.points;
									games[result.game.name].gamesPlayed += 1;
								} else {
									games[result.game.name].points = result.points;
									games[result.game.name].gamesPlayed = 1;
								}
							})
							
							for (var game in games) {
								var avg = 0;
								$scope.labels.push(game);
								avg = $filter('number')(games[game].points / games[game].gamesPlayed, 2);
								$scope.data[1].push(avg)
							}



						}).catch(console.error);
			});
		}
		buildData();




	});