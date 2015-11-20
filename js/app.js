angular.module('app', ['spotify', 'ui.router'])
.config(function (SpotifyProvider, $stateProvider, $urlRouterProvider) {
  SpotifyProvider.setClientId('456095fae6884551b223950e2a72f04a');
  SpotifyProvider.setRedirectUri('http://localhost:8080/auth');
  SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
  SpotifyProvider.setAuthToken(window.localStorage['spotify-token']);
  
  $urlRouterProvider.otherwise("/");
  
  $stateProvider
    .state('main', {
      url: "/",
      templateUrl: "main.html"
    })
    .state('sorry', {
      url: "/sorry",
      templateUrl: "sorry.html",
    })
    .state('track', {
      url: "/track/:id",
      template: '<h1>hey!</h1>'
    })
  
});