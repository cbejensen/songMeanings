angular.module('TrackSuite')
.controller('MainController', function($http, $scope, $stateParams, mainService, Spotify, $firebaseArray) {
  
  window.onload = function () {
    var token = mainService.getToken();
    console.log('mainctrl token', token)
  }
  
  $scope.login = function() {
    mainService.login();
    var test = window.location;
    console.log(test);
  }

  $scope.searchSpotify = function() {
    mainService.searchSpotify($scope.search).then(function(data) {
      $scope.mainData = data;
    })
  }
  
  $scope.spotifyAuth = function() {
    console.log(Spotify.login())
    Spotify.login().then(function() {
      console.log('log in success')
      $scope.getPlaylist();
    }) 
  }
  
  $scope.getPlaylist = function() {
    mainService.getPlaylist().then(function(data) {
      $scope.playlist = data.tracks.items;
    });
  }
//  $scope.getPlaylist();
  
  $scope.getCommentCount = function(id) {
    return mainService.getCommentCount(id);
  }
  
  $scope.logout = function() {
    mainService.logout();
  }
  
})