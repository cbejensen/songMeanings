angular.module('TrackSuite')
.service('mainService', function(Spotify) {
  
  this.getPlaylist = function() {
    return Spotify.getPlaylist('1263870506', '3qBffDvEZBj0m5RDhxY8XD').then(function (data) {
      return data;
    });
  }
  
  var ref = new Firebase("https://song-meanings.firebaseio.com");
  
  this.login = function(service) {
    ref.authWithOAuthPopup(service, function(error, authData) {
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
  
  this.verifyAuth = function(ref) {
    var authData = ref.getAuth();
    if (authData) {
      return authData;
    }
  }
  
})