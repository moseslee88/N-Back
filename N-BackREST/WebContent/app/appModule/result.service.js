angular.module('appModule')
	.factory('resultService', function($filter, $http, authService, $rootScope, $cookies) {
		var service = {};
		var userId = $cookies.get("uid");


		service.index = function() {
			return $http({
				method : 'GET',
				url : 'api/user/' + userId + '/result'
			})
		};




		service.show = function(rid) {
			return $http({
				method : 'GET',
				url : 'api/user/' + userId + '/result' + rid
			})
		};



		service.create = function(result) {
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