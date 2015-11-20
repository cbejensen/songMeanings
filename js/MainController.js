angular.module('app')
.controller('MainController', function($scope, service, Spotify) {
  
  $scope.test = 'whatwhat';
  
  $scope.login = function() {
    Spotify.login().then(function() {
      $scope.getPlaylist();
    }) 
  }
  
  $scope.getPlaylist = function() {
    service.getPlaylist().then(function(data) {
      $scope.playlist = data.tracks.items;
      console.log($scope.playlist);
    });
  }
  
  /*remove ' from song title*/
  $scope.linkify= function(name) {
    var arr = name.split('');
    arr.forEach(function(elem, index) {
      if(elem === '\'') {
        arr.splice(index, 1);
      }
    })
    return arr.join('');
  }
  
  $scope.getPlaylist();
  
  
})