angular.module('TrackSuite')
.service('trackService', function(Spotify, $firebaseObject) {
  
  var ref = new Firebase("https://song-meanings.firebaseio.com/");
  
  this.getTrack = function(id) {
    return Spotify.getTrack(id).then(function(data) {
      return data;
    });
  }
  
  this.setTrackRef = function(track) {
    console.log(ref.child('tracks/' + track))
    return ref.child('tracks/' + track)
  }
  
});