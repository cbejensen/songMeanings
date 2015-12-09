angular.module('TrackSuite')
.controller('MainController', function($http, $scope, mainService, Spotify, $firebaseArray) {
//  FOR testing purposes with chartlyrics API
//  $scope.getLyrics = function() {
//    $http.get('http://api.chartlyrics.com/apiv1.asmx/SearchLyric?artist=' + $scope.lyricTest + '&song=sorry')
//    .then(function(res, err) {
//      console.log(res);
//      console.log(err);
//    })
//  }
  
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