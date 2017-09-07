angular.module('appModule')
	.factory('challengeService', function($filter, $http, authService, $rootScope, $cookies) {
		var service = {};
		var userId = $cookies.get("uid");

		service.index = function() {
			return $http({
				method : 'GET',
				url : '/user/' + userId + '/challenge'
			})
		};

		service.show = function(cid) {
			return $http({
				method : 'GET',
				url : '/user/' + userId + '/challenge' + cid
			})
		};



		service.create = function(challenge) {
			var newChallenge = angular.copy(challenge);

			return $http({
				method : 'POST',
				url : '/user/' + userId + '/challenge',
				headers : {
					'Content-Type' : 'application/json'
				},
				data : newChallenge
			})
				.then(function(res) {
					$rootScope.$broadcast('created', {
						todo : res.data
					})
					return res;
				})
		};

		service.update = function(challenge) {
			return $http({
				method : 'PUT',
				url : '/api/user/' + userId + '/challenge/' + challenge.id,
				headers : {
					'Content-Type' : 'application/json'
				},
				data : challenge
			})
		},

		service.destroy = function(cid) {
			return $http({
				method : 'DELETE',
				url : '/api/user/' + userId + '/challenge/' + cid
			})
		};

		return service;


	})