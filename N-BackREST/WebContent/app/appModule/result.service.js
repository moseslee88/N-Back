angular.module('appModule')
	.factory('resultService', function($filter, $http, authService, $rootScope, $cookies, gameService) {
		var service = {};

		service.index = function(includeGames) {
			if (!includeGames) includeGames = false;
			var userId = $cookies.get("uid");
			return $http({
				method : 'GET',
				url : 'api/user/' + userId + '/result?games=' + includeGames
			})
		};




		service.show = function(rid) {
			var userId = $cookies.get("uid");
			return $http({
				method : 'GET',
				url : 'api/user/' + userId + '/result' + rid
			})
		};



		service.create = function(result) {
			var userId = $cookies.get("uid");
			var newResult = angular.copy(result);

			return $http({
				method : 'POST',
				url : 'api/user/' + userId + '/result',
				headers : {
					'Content-Type' : 'application/json'
				},
				data : newResult
			})
				.then(function(res) {
					$rootScope.$broadcast('created', {
						todo : res.data
					})
					return res;
				})
		};
//
//		service.getUsersGamePlayTotal = function() {			
//			
//	    
//			
//			
//			
//			return gamePlayTotal;
//			
//		}

		return service;


	})