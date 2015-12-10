angular.module('TrackSuite', ['ui.router', 'firebase', 'spotify'])
.config(function (SpotifyProvider, $stateProvider, $urlRouterProvider) {
  SpotifyProvider.setClientId('456095fae6884551b223950e2a72f04a');
  SpotifyProvider.setRedirectUri('http://localhost:8080/auth');
  SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
  SpotifyProvider.setAuthToken(window.localStorage['spotify-token']);
  
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'js/login/login.html'
    })
    .state('sampleTracks', {
      url: '/sampleTracks',
      templateUrl: 'js/sampleTracks/sampleMain.html',
      controller: 'MainController'
    })
    .state('sampleTrack', {
      url: '/sampleTracks/:id',
      templateUrl: 'js/sampleTracks/sampleTrack.html',
      controller: 'SampleTrackController'
    })
    .state('main', {
      url: '/',
      templateUrl: 'js/main/main.html',
      controller: 'MainController'
    })
    .state('tracks', {
      url: '/tracks/:id',
      templateUrl: 'js/track/track.html',
      controller: 'TrackController',
    })
});