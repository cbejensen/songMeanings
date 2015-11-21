angular.module('TrackSuite')
.controller('TrackController', function($scope, $stateParams, trackService, $firebaseObject, Spotify) {
  
  $scope.getTrack = function(id) {
    trackService.getTrack(id).then(function(data) {
      $scope.track = data;
      console.log(data);
    });
  }
  $scope.getTrack($stateParams.id);
  
  var ref = new Firebase("https://song-meanings.firebaseio.com");
  $scope.trackData = $firebaseObject(ref);
  
})