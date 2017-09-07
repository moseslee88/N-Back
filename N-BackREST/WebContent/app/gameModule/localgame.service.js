//this is broken!

angular.module('gameModule')
  .factory('localGameService', function($filter, $http, $rootScope) {
    var service = {};

    var BASE_URL = 'api/';

    service.index = function() {
      return $http({
        method: 'GET',
        url: BASE_URL + 'games'
      })
    };

    service.show = function(gid) {
      return $http({
        method: 'GET',
        url: BASE_URL + 'games/{gid}'
      })
    };

    service.create = function(game) {
      var newGame = angular.copy(game);

      return $http({
          method: 'POST',
          url: 'api/games',
          headers: {
            'Content-Type': 'application/json'
          },
          data: newGame
        })
        .then(function(res) {
          $rootScope.$broadcast('created', {
            todo: res.data
          })
          return res;
        })
    };

    service.update = function(game) {
      return $http({
        method: 'PUT',
        url: 'api/games/' + game.id,
        headers: {
          'Content-Type': 'application/json'
        },
        data: game
      })
    };

    service.destroy = function(gid) {
      return $http({
        method: 'DELETE',
        url: `${BASE_URL}games/{gid}`
      })
    };

    return service;
  })
