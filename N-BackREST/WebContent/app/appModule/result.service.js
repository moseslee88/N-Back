angular.module('appModule')
	.factory('resultService', function($filter, $http, authService, $rootScope, $cookies) {
		var service = {};

		service.index = function() {
			var userId = $cookies.get("uid");
			return $http({
				method : 'GET',
				url : 'api/user/' + userId + '/result'
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

		return service;


	})