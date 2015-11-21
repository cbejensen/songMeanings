angular.module('TrackSuite')
.controller('MainController', function($scope, mainService, Spotify) {
  
  $scope.login = function() {
    Spotify.login().then(function() {
      $scope.getPlaylist();
    }) 
  }
  
  $scope.getPlaylist = function() {
    mainService.getPlaylist().then(function(data) {
      $scope.playlist = data.tracks.items;
    });
  }
  $scope.getPlaylist();
  
})