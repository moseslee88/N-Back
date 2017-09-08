angular.module('appModule',['ngRoute', 'ngCookies', 'authModule', 'gameModule','chart.js'])
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
	        .when('/game', { 
		template: '<game></game>'  
	        })
	        .when('/profile', { 
	        	template: '<profile></profile>'  
	        })
	    .otherwise({
	    template: '<not-found></not-found>'
             })

});