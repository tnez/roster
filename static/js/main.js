angular.module('roster', [])

  /* Handle the concerns of the bio section */
  .controller('bioCtrl', function($scope, playersService) {
    $scope.currentPlayer = {
      name: "player one",
      photo: "https://placehold.it/250x250",
      battingAvg: ".324",
      hr: 24,
      rbi: 71
    }
  })

  /* Handle the concerns of the player table */
  .controller('tableCtrl', function($scope, playersService) {

    /* Get player data from the service  */
    playersService.getPlayers().then(
      function(response) { $scope.players = response.data; console.log($scope.players[0]); },
      function(err) { console.error(err); });
  })

  /* Manage player data */
  .service('playersService', function($http) {

    /* Return a promise that resolves with player data */
    this.getPlayers = function(onSuc, onErr) {
      return $http.get('/players');
    }
  });
