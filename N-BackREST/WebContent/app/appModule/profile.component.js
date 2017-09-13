angular.module('appModule')
  .component('profile', {
    templateUrl: 'app/appModule/profile.component.html',

    controller: function(profileService, $location, $scope, authService, userService, $cookies) {
      var vm = this;

      var userId = $cookies.get("uid");

      console.log("In PROFILE, user profile");
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
            console.log(response.data.id + "hello Maldo");
            //query DATABASE IF USER id exists in DATABASE!!!!!!!!!!!
          })
          .catch(function() {
            console.log("error; no user exists in session");
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
        console.log("where in");
        profileService.create(userProfile).then(function(res) {
            console.log("in then ");
            $location.path('/');
          })
          .catch(function() {
            console.log("in error")
          });
      }


      vm.updateUserProfile = function() {
        console.log(vm.editProfile);
        profileService.update(vm.editProfile).then(function(res) {
            console.log("in updated Profile ");
            console.log(res.data.id);
            $location.path('/');
          })
          .catch(function() {
            console.log("in error")
          });
      }
    },
    controllerAs: 'vm'
  })
