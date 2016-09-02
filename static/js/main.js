angular.module('roster', [])

  /* Handle the concerns of the bio section */
  .controller('bioCtrl', function($scope, playersService) {
    $scope.currentPlayer = {
      name: "No Player Selected",
      photo: "https://placehold.it/150x150",
      battingAvg: "-",
      hr: "-",
      rbi: "-"
    };

    /* when currentPlayer has changed on the playerService, update our
    local scope */
    $scope.$watch(function() { return playersService.currentPlayerId; },
      function(newValue, oldValue) {
        $scope.currentPlayer = playersService.getPlayer(newValue);
      }
    );
  })

  /* Handle the concerns of the player table */
  .controller('tableCtrl', function($scope, playersService) {

    /* Get player data from the service and set $scope.players */
    playersService.getPlayers(function(data) { $scope.players = data; });

    /* Provide a function to select a given player making that player
       the active player in the playersService */
    $scope.selectPlayer = function(playerId) {
      playersService.currentPlayerId = playerId;
    };
  })

  /* Manage player data */
  .service('playersService', function($http) {
    s = this
    s.currentPlayerId = null;
    s.players = [];

    /* Return a promise that resolves with player data */
    s.getPlayers = function(cb) {
      $http.get('/players').then(
        function(response) {
          transformed_data = response.data.map(s.transformPlayerData);
          s.players = transformed_data;
          cb(s.players);
        },
        function(err) { console.error(err); }
      )
    };

    /* Return a player by ID */
    s.getPlayer = function(id) {
      return s.players.find(function(player) { return player.id === id; })
    };

    /* Given raw player data, transform it to something more
       digestible for our controllers - here we are also faking some
       of our data ... we don't have baseball specific attributes from
       our fake data resource! */
    s.transformPlayerData = function(orig) {
      return {
        battingAvg: (0.275 + (Math.random() - 0.5) / 10.0).toFixed(3), // looks weird, but should generate .275 +/- .100 which seems reasonable
        dob: orig.dob.split(' ')[0],
        email: orig.email,
        hr: Math.round(15 + (Math.random() - 0.5) * 10),
        id: orig.id,
        name: [orig.name.first, orig.name.last].join(' '),
        phone: orig.phone,
        photo: orig.picture.large,
        rbi: Math.round(50 + (Math.random() - 0.5) * 40)
      };
    }
  })
