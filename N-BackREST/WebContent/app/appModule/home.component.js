angular.module('appModule')
   .component('home', {   
	   templateUrl: 'app/appModule/home.component.html',
	  controller: function($location, $cookies, resultService, profileService, gameService, challengeService, userService)  {
		   var vm = this;
		   vm.currentUserId = null;
		   vm.currentUser = null; 
		   
		   vm.getCurrentUserID = function(){
			   vm.currentUserId = $cookies.get("uid");
		   }
		   vm.getCurrentUserID();
		   
		   vm.getUser = function(){
			  vm.currentUser = userService.show();
		   }
		   vm.getUser();
		   console.log(vm.currentUser.id);
		   
		   vm.goToRegister = function(){
			   $location.path('/register')
		   };
		   
	   },
	   controllerAs: 'vm'
   })