angular.module('roster', [])

  /* Handle the concerns of the player table */
  .controller('tableCtrl', function($scope, playersService) {

    /* Get player data from the service  */
    playersService.getPlayers().then(
      function(response) { $scope.players = response.data; console.log($scope.players[0]); },
      function(err) { console.error(err); });
  })

  /* Handle data layer for players - in this case this service is
  extremely minimal, simply returning promises for any endpoints, but
  I still like to keep the controller decoupled from the actual API */
  .service('playersService', function($http) {

    /* Return a promise that resolves with player data */
    this.getPlayers = function(onSuc, onErr) {
      return $http.get('/players');
    }
  });
