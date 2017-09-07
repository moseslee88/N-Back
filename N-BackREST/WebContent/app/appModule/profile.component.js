angular.module('appModule')   
    .component('profile', {
    	templateUrl: 'app/appModule/profile.component.html',
    	
    		controller : function(profileService, $location) {
    			var vm = this;
    			
    			console.log("In PROFILE, user profile");
    			$location.path('/profile');
    	
    		
    		vm.saveUserProfile = function(userProfile){
    			console.log("where in");
    			profileService.create(userProfile).then(function(res){
    				console.log("in then ");
        			$location.path('/login')	;
    			})
    			.catch(function(){
    				console.log("in error")
    			});    			
    		}
    			
    	},
  
    controllerAs : 'vm'

    })
    
    
