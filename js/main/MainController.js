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

  $scope.searchSpotify = function() {
    console.log($scope.search)
    mainService.searchSpotify($scope.search).then(function(data) {
      $scope.mainData = data;
      console.log($scope.homeData)
    })
  }
  
  $scope.spotifyAuth = function() {
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
  
  $scope.getCommentCount = function(id) {
    return mainService.getCommentCount(id);
  }
  
  $scope.login = function(service) {
    mainService.login(service);
  }
  
  $scope.logout = function() {
    mainService.logout();
  }
  
})