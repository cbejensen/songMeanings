angular.module('app')
.controller('MainController', function($scope, service, Spotify) {
  $scope.test = 'test';
  
  $scope.getPlaylist = function() {
    service.getPlaylist().then(function(data) {
      console.log(data);
      $scope.playlist = data.tracks.items;
    });
  }
  $scope.getPlaylist();
  
  
  //    Spotify.login().then(function(res) {
//      console.log(res)
//      
//    });
  
})