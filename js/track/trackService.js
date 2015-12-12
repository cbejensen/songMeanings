angular.module('TrackSuite')
.service('trackService', function(Spotify, $http, $firebaseObject, mainService) {
  
  var ref = new Firebase("https://song-meanings.firebaseio.com/");
  this.tracksRef = ref.child('tracks/')
  
  this.getTrack = function(id) {
    return Spotify.getTrack(id).then(function(data) {
      return data;
    });
  }
  
  this.rateTrack = function(trackRef, rating) {
    $http({
      method: 'GET',
      url: 'https://api.spotify.com/v1/me',
      headers: {
        'Authorization': 'Bearer ' + window.localStorage['spotify-token']
      }
    }).then(function(data) {
      console.log('rateTrack service', data);
      var id = data.data.uri;
      console.log('uri', id)
      trackRef.child('/ratings/').update({
        [id]: rating
      })
    })
  }
  
  this.submitComment = function(trackRef, obj) {
    trackRef.child('/comments/').push(obj);
  }
  
});