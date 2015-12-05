angular.module('TrackSuite')
.service('trackService', function(Spotify, $firebaseObject, mainService) {
  
  var ref = new Firebase("https://song-meanings.firebaseio.com/");
  this.tracksRef = ref.child('tracks/')
  
  this.getTrack = function(id) {
    return Spotify.getTrack(id).then(function(data) {
      return data;
    });
  }
  
  this.rateTrack = function(trackRef, rating) {
    var auth = mainService.verifyAuth();
    if(auth) {
      var uid = auth.uid;
      trackRef.child('/ratings/').update({
        [uid]: rating
      })
    } else {
      alert('Please log in before rating a track');
    }
  }
  
  this.submitComment = function(trackRef, obj) {
    trackRef.child('/comments/').push(obj);
  }
  
});