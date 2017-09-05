angular.module('appModule')
.factory('gameService', function($filter, $http, authService, $rootScope) {
  var service = {};
  
  var BASE_URL = 'http://localhost:8080/N-BackREST/api/';
  
  
	service.index = function() {
    return $http({
      method : 'GET',
      url : BASE_URL + 'games'           
    })
  };  
  

  

	service.show = function(gid)  {
	    return $http({
	        method : 'GET',
	        url : BASE_URL + 'games/{gid}'           
	      })
	};
  

	
	service.create = function(game)  {
	  var newGame = angular.copy(game);

	return $http ({
		method: 'POST',
		url: 'api/games',
		headers:  {
			'Content-Type': 'application/json'
		},
		data: newGame
		
	})
	.then(function(res)  {
		$rootScope.$broadcast('created', {
			todo: res.data
		})
		return res;
	})
	};
	
	
		service.update = function(game)  { 	
	
        
	    	return $http({
	    		method: 'PUT',
	    		url: 'api/games/' + game.id,
	    		headers: {
	    		'Content-Type': 'application/json'	
	    		},
	    		data: game
	    		})
	    	},

	
	

		  
		  service.destroy = function(gid) {
				 return $http({  
					method: 'DELETE',
				    url: `${BASE_URL}games/{gid}`
				 })
			  };

			  
			  //  var checkLogin = function()  {
			    	 //stub out code, use authService to check if user  is logged in
			  //  };
	

	
	return service;
	
	
})