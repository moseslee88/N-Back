angular.module("appModule")
	.controller("LineCtrl", function($scope, $location, $cookies, resultService, profileService, gameService, challengeService, userService, authService) {


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
			resultService.index(true)
				.then(function(res) {
					communityResults = res.data;
					var comTotal = 0;
					communityResults.forEach(function(result, idx, arr) {
						if (result.game.name == gameName) {
							communityData.push(result.points)
						}
					})
					for (var i = 0; communityData.length; i++) {
						comTotal += communityData[i];
					}

					communityAvg = comTotal / communityData.length;

					profileService.show(user.profile.id).then(function(res) {
						userProfile = res.data;
					})
				});
		}
		buildData();
		
		$scope.labels = [ "January", "February", "March", "April", "May", "June", "July" ];
		$scope.data = [
			[ 65, 59, 80, 81, 56, 55, 40 ],
			[ 28, 48, 40, 19, 86, 27, 90 ]
			];
		$scope.onClick = function(points, evt) {
			console.log(points, evt);
		};
		$scope.datasetOverride = [ {
			yAxisID : 'y-axis-1'
		}, {
			yAxisID : 'y-axis-2'
		} ];
		$scope.options = {
			scales : {
				yAxes : [
					{
						id : 'y-axis-1',
						type : 'linear',
						display : true,
						position : 'left'
					},
					{
						id : 'y-axis-2',
						type : 'linear',
						display : true,
						position : 'right'
					}
				]
			}
		};
	});