angular.module('appModule')
  .component('profile', {
    templateUrl: 'app/appModule/profile.component.html',

    controller: function(profileService, $location, $scope, authService, userService, $cookies) {
      var vm = this;

      var userId = $cookies.get("uid");

      vm.user = null;
      vm.editProfile = null;

      
      // Use authservice to get actual user object from API with data (profile)
      // store into vm.user
      if (!authService.getToken()) {
        $location.path("/")
      } else {
        // use service/$http to get actual user
        userService.show().then(function(response) {
            vm.user = response.data;
            vm.editProfile = angular.copy(vm.user.profile);
            //query DATABASE IF USER id exists in DATABASE!!!!!!!!!!!
          })
          .catch(function() {
          });
      }


      var emptyProfileMaldo = [];
      
      

      vm.profileExists = function(user) {

        if (vm.user != null) {
          //hide update button
          if (vm.user.profile != null) {
            //vm.profileExists == true;
            return true;
          }
        }
        return false;
      }


      vm.saveUserProfile = function(userProfile) {
        profileService.create(userProfile).then(function(res) {
            $location.path('/');
          })
          .catch(function() {
          });
      }


      vm.updateUserProfile = function() {
        profileService.update(vm.editProfile).then(function(res) {
            $location.path('/');
          })
          .catch(function() {
          });
      }
    },
    controllerAs: 'vm'
  })
