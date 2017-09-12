angular.module('appModule')
.factory('profileService', function($filter, $http, authService, $rootScope, $cookies) {
  var service = {};

		service.index = function() {
			return $http({
				method : 'GET',
				url : 'api/profile'
			})
		};

		service.show = function(pid) {
			var userId = $cookies.get("uid");
			return $http({
				method : 'GET',
				url : 'api/user/' + userId+ '/profile/' + pid

			})
		};

		service.create = function(profile) {
			var newProfile = angular.copy(profile);
			var userId = $cookies.get("uid");

			return $http({
				method : 'POST',
				url : 'api/user/' + userId + '/profile',
				headers : {
					'Content-Type' : 'application/json'
				},
				data : newProfile
			})
				.then(function(res) {
					$rootScope.$broadcast('created', {
						profile : res.data
					})
					return res;
				})
		};

		service.update = function(profile) {
			var userId = $cookies.get("uid");
			return $http({
				method : 'PUT',
				url : 'api/user/' + userId + '/profile/' + profile.id,
				headers : {
					'Content-Type' : 'application/json'
				},
				data : profile
			})
		},

		service.destroy = function(pid) {
			var userId = $cookies.get("uid");
			return $http({
				method : 'DELETE',
				url : 'api/user/' + userId + '/profile/' + pid
			})
		};
		return service;


	})