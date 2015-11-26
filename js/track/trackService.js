angular.module('TrackSuite')
.service('trackService', function(Spotify, $firebaseObject) {
  
  this.getTrack = function(id) {
    return Spotify.getTrack(id).then(function(data) {
      return data;
    });
  }
  
});