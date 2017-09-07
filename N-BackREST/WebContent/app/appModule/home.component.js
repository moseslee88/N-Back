angular.module('appModule')
   .component('home', {   
	   templateUrl: 'app/appModule/home.component.html',
	  controller: function($location, $cookies, resultService, profileService, gameService, challengeService)  {
		   var vm = this;
		   vm.currentUserId = null;
		   
		   vm.getCurrentUser = function(){
			   vm.currentUserId = $cookies.get("uid");
		   }
		   vm.getCurrentUser();
		   
		   console.log(vm.currentUserId);
		   
		   vm.goToRegister = function(){
			   $location.path('/register')
		   };
		   
	   },
	   controllerAs: 'vm'
   })