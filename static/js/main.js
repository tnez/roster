angular.module('roster', [])

  /* Handle the concerns of the bio section */
  .controller('bioCtrl', function($scope, playersService) {
    $scope.currentPlayer = {
      name: "No Player Selected",
      photo: "https://placehold.it/150x150",
      battingAvg: "-",
      hr: "-",
      rbi: "-"
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
