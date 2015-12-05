angular.module('TrackSuite')
.controller('MainController', function($scope, mainService, Spotify, $firebaseArray) {
  
  $scope.spotifyAuth = function() {
    Spotify.login().then(function() {
      $scope.getPlaylist();
    }) 
  }
  
  $scope.getPlaylist = function() {
    mainService.getPlaylist().then(function(data) {
      $scope.playlist = data.tracks.items;
      $scope.comments = mainService.getComments($scope.playlist);
    });
  }
  $scope.getPlaylist();
  
  $scope.login = function(service) {
    mainService.login(service);
  }
  
  $scope.logout = function() {
    mainService.logout();
  }
  
})