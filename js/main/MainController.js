angular.module('TrackSuite')
.controller('MainController', function($http, $scope, $stateParams, mainService, Spotify, $firebaseArray) {
  
  window.onload = function () {
    var token = mainService.getToken();
    localStorage.setItem('spotify-token', token);
    mainService.getPlaylist(token)
    .then(function(data) {
      $scope.playlist = data.data.items;
      $scope.commentCounts = [];
      data.data.items.forEach(function(e, i) {
        $scope.commentCounts.push(mainService.getCommentCount(e.track.id));
      });
    })
  }
  
  $scope.login = function() {
    mainService.login();
    var test = window.location;
  }
  
  $scope.previewTrack = function(url) {
    if(url) {
      window.open(url);
    } else {
      alert('Sorry - there\'s no preview available for this track!')
    }
  }
  
  $scope.searchSpotify = function() {
    mainService.searchSpotify($scope.search).then(function(data) {
      $scope.searchData = data;
    })
  }
  
  $scope.spotifyAuth = function() {
    Spotify.login().then(function() {
      console.log('log in success')
      $scope.getPlaylist();
    }) 
  }
  
  $scope.logout = function() {
    mainService.logout();
  }
  
})