angular.module('appModule')
	.component('profile', {
		templateUrl : 'app/appModule/profile.component.html',

		controller : function(profileService, $location, $scope) {
			var vm = this;

			console.log("In PROFILE, user profile");
			$location.path('/profile');


			vm.profileExists = false;
			
			var emptyProfileMaldo = [];
			
			vm.checkProfileStatus = function(profiles, profileExists) {
				profileService.index().then(function(res) {
					console.log("in index, then check for profileID");
					profiles.forEach(function(profile) {
						
						
				})
					
				})
					.catch(function() {
						console.log("in error")
					});
				
						//				if (profileExists) {				
			//	}				
//			    var count = vm.getNumTodos ();
//			    if (count >=10) return 'danger';
//			    if (count < 10 && count >=5) return 'warning';
//			    if (count < 5) return 'safe';
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