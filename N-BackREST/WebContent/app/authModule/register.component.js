angular.module('authModule')
.component('register', {
	templateUrl : 'app/authModule/register.component.html',
	controller : function(authService, $location) {
		var vm = this;
		
		vm.errors = [];
		
		vm.invalid = function(user) {
			if (!user) return true;
			if (!user.email || !user.password || !user.confirm) return true;
			return false;
		}
		
		vm.register = function(user) {
			vm.errors = [];
			
			var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
			
			if (!re.test(user.email)) {
				vm.errors.push("Your email is not an email");
			}
			if (!user.password || user.password.length < 6) {
				vm.errors.push("You must include a password, of at least 6 characters etc etc")
			}
			if (user.password !== user.confirm) {
				vm.errors.push("Your passwords do not match");
			}
			
			if (vm.errors.length > 0) {
				return;
			}
			
			delete user.confirm;
			
			authService.register(user)
				.then(function(res) {
					$location.path('/todo');
				})
				.catch(console.error)
		}
		
		
	},
	controllerAs : 'vm'
})