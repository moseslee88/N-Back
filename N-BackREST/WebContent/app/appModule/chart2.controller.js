angular.module("appModule")
	.controller("BarCtrl", function($scope, $location, $cookies, resultService, profileService, gameService, challengeService, userService, authService) {


		var userResults = [];
		var communityResults = null;
		var communityData = [];
		var communityAvg = null;
		var gameName = "position";
		var user = null;

		buildData = function() {
			
			userService.show().then(function(res) {
				user = res.data;
				console.log(user)
				$scope.series = [ user.profile.name, 'Community Average' ];
			})
			
			// Takes the avarage score of a game based on the game name
			$scope.labels = [];
			$scope.data = [[],[]];
			
			resultService.show()
				.then(function(res){
					
				});
			resultService.index(true)
				.then(function(res) {
					communityResults = res.data;
					
					var comTotal = 0;					
					communityResults.forEach(function(result, idx, arr) {
						if (result.game.name == gameName) {
							communityData.push(result.points)
						}
					})
					for(var i = 0; i < communityData.length; i++) {
						comTotal += communityData[i];
						$scope.labels.push(i);
					}
					
					communityAvg = comTotal / communityData.length;

					profileService.show(user.profile.id).then(function(res) {
						userProfile = res.data;
					})
					
					
				});
		}
		buildData();
		
	
		
	
	});