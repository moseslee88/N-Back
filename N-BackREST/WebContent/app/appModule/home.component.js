angular.module('appModule')
   .component('home', {   
	   templateUrl: 'app/appModule/home.component.html',
	  controller: function($location, $cookies, resultService, profileService, gameService, challengeService, userService)  {
		   var vm = this;
		   vm.currentUserId = null;
		   vm.currentUser = null; 
		   
		   vm.getUser = function(){
			   userService.show()
			   	.then(function(res){
			   		vm.currentUser = res;
			   });
		   }
		   
		   vm.getCurrentUserID = function(){
			   vm.currentUserId = $cookies.get("uid");
			   vm.getUser();
		   }
		   vm.getCurrentUserID();
		   
		   
		   
		   
		   vm.goToRegister = function(){
			   $location.path('/register')
		   };
		   
	   },
	   controllerAs: 'vm'
   })