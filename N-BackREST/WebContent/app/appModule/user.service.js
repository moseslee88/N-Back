angular.module('appModule')
	.factory('userService', function($filter, $http, authService, $rootScope, $cookies) {
		var service = {};
		

		service.index = function() {
			return $http({
				method : 'GET',
				url : 'api/user'
			})
		};

		service.show = function() {
			var userId = $cookies.get("uid");
			if (userId) {
				return $http({
					method : 'GET',
					url : 'api/user/' + userId
				})
			}
		};

		service.create = function(user) {
			var newUser = angular.copy(user);

			return $http({
				method : 'POST',
				url : 'api/user',
				headers : {
					'Content-Type' : 'application/json'
				},
				data : newUser
			})
				.then(function(res) {
					$rootScope.$broadcast('created', {
						profile : res.data
					})
					return res;
				})
		};

		service.update = function(user) {
			var userId = $cookies.get("uid");
			return $http({
				method : 'PUT',
				url : 'api/user/' + userId,
				headers : {
					'Content-Type' : 'application/json'
				},
				data : user
			})
		},

		service.destroy = function() {
			var userId = $cookies.get("uid");
			return $http({
				method : 'DELETE',
				url : 'api/user/' + userId
			})
		};
		return service;
	})