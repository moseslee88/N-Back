angular.module('appModule')
	.component('profile', {
		templateUrl : 'app/appModule/profile.component.html',

		controller : function(profileService, $location, $scope, authService, userService, $cookies) {
			var vm = this;
			
			var userId = $cookies.get("uid");

			console.log("In PROFILE, user profile");
			$location.path('/profile');
			
			vm.user = null;
			
			// Use authservice to get actual user object from API with data (profile)
			// store into vm.user
			if(!authService.getToken()) {
				$location.path("/login")
			} else {       
				// use service/$http to get actual user
				userService.show().then(function(response) {   
					vm.user = response.data;   
					console.log(response.data.id  + "hello Maldo");  
					 //query DATABASE IF USER id exists in DATABASE!!!!!!!!!!!
				})   
				.catch(function()  {
					console.log("error; no user exists in session");
				});
			}       
			


			//vm.profileExists = false;
			
			var emptyProfileMaldo = [];
			
			vm.profileExists = function(user) {
				console.log("profile button hide");
				
				
				if(vm.user != null){
					//hide update button
					if(vm.user.profile !=null)  {
					console.log("this is where i hide button and vm.user is not null");
					      //vm.profileExists == true;
					return true;
					}
				}
				return false;	
			}


			vm.saveUserProfile = function(userProfile) {
				console.log("where in");
				profileService.create(userProfile).then(function(res) {
					console.log("in then ");
					$location.path('/login')	;
				})
					.catch(function() {
						console.log("in error")
					});
			}


			vm.updateUserProfile = function(userProfile) {
				console.log("in UpDate Button");
				profileService.update(userProfile).then(function(res) {
					console.log("in updated Profile ");
					$location.path('/game')	;
				})
					.catch(function() {
						console.log("in error")
					});
			}

		},

		controllerAs : 'vm'
	})