angular.module('TrackSuite')
.controller('MainController', function($scope, mainService, Spotify) {
  
  $scope.spotifyAuth = function() {
    Spotify.login().then(function() {
      $scope.getPlaylist();
    }) 
  }
  
  $scope.login = function(service) {
     mainService.login(service);
  }
  
  $scope.logout = function() {
    mainService.logout();
  }
  
  $scope.fbookLogin = function() {
    console.log('before');
    mainService.fbookLogin();
    console.log('after')
  }
  
  $scope.getPlaylist = function() {
    mainService.getPlaylist().then(function(data) {
      $scope.playlist = data.tracks.items;
    });
  }
  $scope.getPlaylist();
  
  function authDataCallback(authData) {
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } else {
      console.log("User is logged out");
    }
  }
  
})