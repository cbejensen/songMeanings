angular.module('app')
.service('service', function(Spotify) {
  
  this.getPlaylist = function() {
    return Spotify.getPlaylist('1263870506', '3qBffDvEZBj0m5RDhxY8XD').then(function (data) {
      return data;
    });
    
  }
})