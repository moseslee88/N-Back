angular.module('authModule')
  .factory('authService', function($http, $cookies, $rootScope) {
    var service = {};

    var saveToken = function(user, profile) {
    		$cookies.put('uid', user.id)
    		$cookies.put('email', user.email)
    		//$cookies.put('pid', profile.id)
    }

    service.getToken = function() {
    		return {
    			uid : $cookies.get("uid"),
    			email : $cookies.get("email"),
    			//pid : $cookies.get("pid")
    		}
    }

    var removeToken = function() {
    		$cookies.remove('uid');
		$cookies.remove('email');
		//$cookies.remove('pid');

    }

    service.login = function(user) {
    		return $http({
    			method : 'POST',
    			url : 'api/login',
    			headers : {
    				'Content-Type' : 'application/json'
    			},
    			data : user
    		})
    		.then(function(res) {
    			saveToken(res.data);
    			$rootScope.$broadcast('loggedIn', {
    				user : res.data
    			})
    			return res;
    		})
    		.catch(console.error);
    }

    service.register = function(user) {
		return $http({
			method : 'POST',
			url : 'api/register',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : user
		})
		.then(function(res) {
			saveToken(res.data);
			return res;
		})
		.catch(console.error);
    }

    service.logout = function() {
    		return $http({
    			method : 'POST',
    			url : 'api/logout'
    		})
    		.then(function(res) {
    			removeToken();
    			return res;
    		})
    		.catch(console.error);
    }

    return service;
  })