angular.module('TrackSuite')
.service('mainService', function(Spotify) {
  
  this.getPlaylist = function() {
    return Spotify.getPlaylist('1263870506', '3qBffDvEZBj0m5RDhxY8XD').then(function (data) {
      return data;
    });
  }
  
  var ref = new Firebase("https://song-meanings.firebaseio.com");
  
  function register() {
    // we would probably save a profile when we register new users on our site
    // we could also read the profile to see if it's null
    // here we will just simulate this with an isNewUser boolean
    var isNewUser = true;
    console.log(isNewUser)
    
    ref.onAuth(function(authData) {
      if (authData && isNewUser) {
        // save the user's profile into the database so we can list users,
        // use them in Security and Firebase Rules, and show profiles
        ref.child("users").child(authData.uid).set({
          provider: authData.provider,
        });
      }
    });

    // find a suitable name based on the meta info given by each provider
    function getName(authData) {
      switch(authData.provider) {
         case 'password':
           return authData.password.email.replace(/@.*/, '');
         case 'twitter':
           return authData.twitter.displayName;
         case 'facebook':
           return authData.facebook.displayName;
      }
    }
  }
  
  this.login = function(service) {
    ref.authWithOAuthPopup(service, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
    register();
  }
  
  this.logout = function() {
    ref.unauth();
    console.log('logged out')
  }
  
})