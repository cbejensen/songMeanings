angular.module('TrackSuite')
.service('trackService', function(Spotify, $firebaseObject) {
  
  var ref = new Firebase("https://song-meanings.firebaseio.com/");
  this.tracksRef = ref.child('tracks/')
  
  this.getTrack = function(id) {
    return Spotify.getTrack(id).then(function(data) {
      return data;
    });
  }
  
  this.rateTrack = function(auth, trackRef, rating) {
    if(auth) {
      var uid = auth.uid;
      trackRef.child('/ratings/').update({
        [uid]: rating
      })
    } else {
      alert('Please log in before rating a track')
    }
  }
  
  this.submitComment = function(auth, trackRef, obj) {
    if(auth) {
      trackRef.child('/comments/').push(obj);
    } else {
      alert('Please log in before commenting on a track')
    }
  }
  
});