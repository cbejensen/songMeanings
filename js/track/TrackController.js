angular.module('TrackSuite')
.controller('TrackController', function($scope, $stateParams, trackService, $firebaseObject, Spotify) {
  
  var ref = new Firebase("https://song-meanings.firebaseio.com");
  $scope.trackData = $firebaseObject(ref);
  
  $scope.getTrack = function(id) {
    trackService.getTrack(id).then(function(data) {
      $scope.track = data;
      console.log(data);
    });
  }
  $scope.getTrack($stateParams.id);
  
  /* alerts user if no preview of track is available*/
  $scope.previewTrack = function(track) {
    if(!$scope.track.preview_url) {
      alert('Sorry - there\'s no preview available for this song!')
    }
  }
  
})