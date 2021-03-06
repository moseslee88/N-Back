angular.module('appModule')
	.factory('gameService', function($filter, $http, authService, $rootScope) {
		var service = {};

		var BASE_URL = 'api/';


		service.index = function() {
			return $http({
				method : 'GET',
				url : BASE_URL + 'game'
			})
		};

		service.show = function(gid) {
			return $http({
				method : 'GET',
				url : BASE_URL + 'game/{gid}'
			})
		};
		return service;


	})