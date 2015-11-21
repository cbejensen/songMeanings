angular.module('TrackSuite')
.controller('TrackController', function($scope, $stateParams, trackService, Spotify) {
  
  $scope.getTrack = function(id) {
    trackService.getTrack(id).then(function(data) {
      $scope.track = data;
      console.log(data);
    });
  }
  $scope.getTrack($stateParams.id);
  
  
})