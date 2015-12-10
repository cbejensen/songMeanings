angular.module('TrackSuite')
.service('mainService', function(Spotify, $firebaseObject, $firebaseArray) {
  
  var ref = new Firebase("https://song-meanings.firebaseio.com/");
  this.tracksRef = ref.child('tracks/')
  
  this.searchSpotify = function(searchTerm) {
    return Spotify.search(searchTerm, 'artist,album,track', {limit: 50}).then(function(data) {
      return data
    })
  }
  
  this.getPlaylist = function() {
    return Spotify.getPlaylist('1263870506', '3qBffDvEZBj0m5RDhxY8XD').then(function (data) {
      return data;
    });
  }
  
  this.getCommentCount = function(id) {
    var commentCount = $firebaseArray(ref.child('tracks/' + id + '/comments'));
    if(commentCount) {
      return commentCount.length + 1;
    } else {
      return 0;
    }
  }
  
  this.login = function(service) {
    ref.authWithOAuthPopup(service, function(error, authData, sessionOnly) {
      if (error) {
        console.log('Login Failed!', error);
        alert('Log in failed - please try again');
      } else {
        console.log('Authenticated successfully:', authData);
      }
    });
  }
  
  this.logout = function() {
    ref.unauth();
    console.log('logged out')
  }
  
  function authDataCallback(authData) {
    if (authData) {
      console.log(authData);
    } else {
      console.log("User is logged out");
    }
  }
  
  this.verifyAuth = function() {
    var authData = ref.getAuth();
    if (authData) {
      return authData;
    }
  }
  
})