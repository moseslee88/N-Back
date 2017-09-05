angular.module('appModule',['ngRoute', 'ngCookies', 'authModule', 'chart.js'])
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
	    .otherwise({
	    template: '<not-found></not-found>'
             })
	        
	     
	
});