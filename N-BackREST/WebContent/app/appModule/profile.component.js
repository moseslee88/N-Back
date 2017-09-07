angular.module('appModule')   
    .component('profile', {
    	templateUrl: 'app/appModule/profile.component.html',
    	
    		controller : function($location) {
    			var vm = this;
    			
    			console.log("In PROFILE, user profile");
    			$location.path('/profile');
    		},
    
    controllerAs : 'vm'

    })
    
    
