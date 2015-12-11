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
    Spotify.getCurrentUser().then(function (data) {
      var id = data.uri;
      trackRef.child('/ratings/').update({
        [id]: rating
      })
    }, function (error) {
      alert('Please log in before rating a track');
    });
  }
  
  this.submitComment = function(trackRef, obj) {
    trackRef.child('/comments/').push(obj);
  }
  
});