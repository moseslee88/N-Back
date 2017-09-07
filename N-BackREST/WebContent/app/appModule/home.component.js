angular.module('appModule')
   .component('home', {   
	   templateUrl: 'app/appModule/home.component.html',
	  controller: function($location)  {
		   var vm = this;
		   
		   vm.goToRegister = function(){
			   $location.path('/register')
		   };
		   
	   },
	   controllerAs: 'vm'
   })