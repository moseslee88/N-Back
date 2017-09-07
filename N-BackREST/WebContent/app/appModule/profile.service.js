angular.module('appModule')
.factory('profileService', function($filter, $http, authService, $rootScope, $cookies) {
  var service = {};
  var userId = $cookies.get("uid");

		service.index = function() {
			return $http({
				method : 'GET',
				url : 'api/profile'
			})
		};

		service.show = function(pid) {
			return $http({
				method : 'GET',
				//url : '/api/user/' + userId + '/profile' + pid
				url : 'api/user/' + authService.getToken().id + '/profile' + pid

			})
		};

		service.create = function(profile) {
			var newProfile = angular.copy(profile);

			return $http({
				method : 'POST',
				url : 'api/user/' + authService.getToken().id + '/profile',
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
			return $http({
				method : 'PUT',
				url : 'api/user/' + authService.getToken().id + '/profile/' + profile.id,
				headers : {
					'Content-Type' : 'application/json'
				},
				data : profile
			})
		},

		service.destroy = function(pid) {
			return $http({
				method : 'DELETE',
				url : 'api/user/' + authService.getToken().id + '/profile/' + pid
			})
		};
		return service;


	})