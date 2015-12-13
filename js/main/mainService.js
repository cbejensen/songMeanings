angular.module('TrackSuite')
.service('mainService', function(Spotify, $firebaseObject, $firebaseArray, $http) {
  
  var ref = new Firebase("https://song-meanings.firebaseio.com/");
  this.tracksRef = ref.child('tracks/')
  
  this.getToken = function() {
    var hash = window.location.hash;
    if (window.location.search.substring(1).indexOf("error") !== -1) {
      // login failure
      window.close();
    } else if (hash) {
      // login success
      var token = window.location.hash.split('&')[0].split('=')[1];
      window.location.replace('https://song-meanings.firebaseapp.com/#/');
      return token;
    }
  }
  
  this.login = function() {
    var windowObjectReference;
    var strWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
    windowObjectReference = window.open("https://accounts.spotify.com/authorize/?client_id=456095fae6884551b223950e2a72f04a&response_type=token&redirect_uri=https%3A%2F%2Fsong-meanings.firebaseapp.com&scope=user-read-private%20user-read-email", "_self", strWindowFeatures);
  }
  
  this.searchSpotify = function(searchTerm) {
    return Spotify.search(searchTerm, 'track', {limit: 50}).then(function(data) {
      return data
    })
  }
  
  this.getPlaylist = function(token) {
    console.log('getPlaylist received', token)
    return $http({
      method: 'GET',
      url: 'https://api.spotify.com/v1/users/1263870506/playlists/3qBffDvEZBj0m5RDhxY8XD/tracks',
      headers: {
        'Authorization': 'Bearer ' + token
      }
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