angular.module('appModule',['ngRoute', 'ngCookies', 'authModule'])
.config(function($routeProvider){ 
	  $routeProvider  
	  .when('/', { 
		template: '<home></home>'  
	        })
	  .when('/logout', { 
		template: '<logout></logout>'  
	        })
        	.when('/login', { 
		template: '<login></login>'  
	        })
	     .when('/register', { 
		template: '<register></register>'  
	        })
	        .when('/games', { 
		template: '<games></games>'  
	        })
	    .otherwise({
	    template: '<not-found></not-found>'
             })

});